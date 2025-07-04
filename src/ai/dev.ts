import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-issue-report.ts';
import '@/ai/flows/curhat-warga-flow.ts';
import '@/ai/flows/review-ad-flow.ts';
import '@/ai/flows/payment-reminder-flow.ts';
import '@/ai/flows/generate-ipl-reminder-flow.ts';
