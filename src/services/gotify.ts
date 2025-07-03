// src/services/gotify.ts
'use server'

export async function sendNotification(title: string, message: string, priority = 5) {
  const gotifyUrl = process.env.GOTIFY_URL;
  const gotifyToken = process.env.GOTIFY_TOKEN;

  if (!gotifyUrl || !gotifyToken) {
    console.warn('Gotify URL or Token is not set in .env. Skipping notification.');
    return;
  }

  try {
    const response = await fetch(`${gotifyUrl}/message?token=${gotifyToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        message,
        priority,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Failed to send Gotify notification: ${response.status} ${response.statusText}`, errorBody);
    } else {
      console.log('Gotify notification sent successfully.');
    }
  } catch (error) {
    console.error('Error sending Gotify notification:', error);
  }
}
