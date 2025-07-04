'use server';
/**
 * @fileOverview A flow to send payment reminders for IPL dues.
 *
 * - sendPaymentReminder - Sends notifications to residents about upcoming or overdue payments.
 * - PaymentReminderInput - The input type for the sendPaymentReminder function.
 * - PaymentReminderOutput - The return type for the sendPaymentReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { i18n } from '@/lib/i18n';
import { sendNotification } from '@/services/gotify';
import { residents, iplManagement } from '@/lib/data';

export const PaymentReminderInputSchema = z.object({
  reminderType: z.enum(['due_soon', 'overdue']).describe("The type of reminder to send: 'due_soon' for upcoming payments or 'overdue' for late payments."),
});
export type PaymentReminderInput = z.infer<typeof PaymentReminderInputSchema>;

export const PaymentReminderOutputSchema = z.object({
  notificationsSent: z.number().describe('The total number of notifications sent.'),
  details: z.array(z.string()).describe('A log of which residents were notified.'),
});
export type PaymentReminderOutput = z.infer<typeof PaymentReminderOutputSchema>;

export async function sendPaymentReminder(input: PaymentReminderInput): Promise<PaymentReminderOutput> {
  return paymentReminderFlow(input);
}

const paymentReminderFlow = ai.defineFlow(
  {
    name: 'paymentReminderFlow',
    inputSchema: PaymentReminderInputSchema,
    outputSchema: PaymentReminderOutputSchema,
  },
  async ({ reminderType }) => {
    const { t } = i18n('id'); // Use Indonesian for notifications
    let notificationsSent = 0;
    const details: string[] = [];

    if (reminderType === 'due_soon') {
        const title = t('notifications.ipl.dueSoon.title');
        const message = t('notifications.ipl.dueSoon.message');
        
        // Send to all residents
        for (const resident of residents) {
            // In a real app, you would target the specific user. Here we send a general notification.
            await sendNotification(title, `${message} (Untuk: ${resident.name})`);
            notificationsSent++;
            details.push(`Sent 'due_soon' reminder to ${resident.name}.`);
        }

    } else if (reminderType === 'overdue') {
        const title = t('notifications.ipl.overdue.title');
        
        const unpaidResidents = iplManagement
            .filter(p => p.status === 'unpaid')
            .map(p => p.residentName);
        
        const uniqueUnpaidResidents = [...new Set(unpaidResidents)];

        for (const residentName of uniqueUnpaidResidents) {
            const resident = residents.find(r => r.name === residentName);
            if (resident) {
                const message = t('notifications.ipl.overdue.message', { name: resident.name });
                await sendNotification(title, message, 8); // Higher priority for overdue notices
                notificationsSent++;
                details.push(`Sent 'overdue' reminder to ${resident.name}.`);
            }
        }
    }

    return { notificationsSent, details };
  }
);
