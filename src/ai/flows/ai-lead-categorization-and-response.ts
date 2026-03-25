'use server';
/**
 * @fileOverview This file implements a Genkit flow for categorizing lead inquiries,
 * generating draft responses, and simulating the "send to email" process.
 *
 * - aiLeadCategorizationAndResponse - The main function to call this flow.
 * - AILeadCategorizationAndResponseInput - The input type for the flow.
 * - AILeadCategorizationAndResponseOutput - The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AILeadCategorizationAndResponseInputSchema = z.object({
  name: z.string().describe('The name of the lead submitting the contact form.'),
  email: z.string().email().describe('The email address of the lead.'),
  phone: z.string().optional().describe('The phone number of the lead.'),
  service: z.string().describe('The service the lead is interested in.'),
  message: z.string().describe('The message content from the lead inquiry.'),
});
export type AILeadCategorizationAndResponseInput = z.infer<typeof AILeadCategorizationAndResponseInputSchema>;

const AILeadCategorizationAndResponseOutputSchema = z.object({
  category: z
    .enum([
      'AI Agent Development',
      'AI Chatbot Services',
      'LLM Solutions',
      'E-commerce Websites & Applications',
      'Data Analytics Dashboards',
      'Data Management Systems',
      'Website Development',
      'Data Automation Applications',
      'Partnership Inquiry',
      'General Inquiry',
      'Other',
    ])
    .describe('The categorized type of the lead inquiry.'),
  draftResponse: z
    .string()
    .describe('A draft AI-generated response tailored to the lead inquiry.'),
  sentToEmail: z.boolean().describe('Whether the notification was successfully processed for sending.'),
  adminNotification: z.string().describe('A summary for the admin email notification.'),
});
export type AILeadCategorizationAndResponseOutput = z.infer<typeof AILeadCategorizationAndResponseOutputSchema>;

export async function aiLeadCategorizationAndResponse(
  input: AILeadCategorizationAndResponseInput
): Promise<AILeadCategorizationAndResponseOutput> {
  return aiLeadCategorizationAndResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeLeadAndRespondPrompt',
  input: { schema: AILeadCategorizationAndResponseInputSchema },
  output: { schema: AILeadCategorizationAndResponseOutputSchema },
  prompt: `You are an AI assistant for WELLDROPP (welldropp.tech@gmail.com).
Your task is to process a new lead inquiry.

1. Categorize the message into one of the following:
   'AI Agent Development', 'AI Chatbot Services', 'LLM Solutions', 'E-commerce Websites & Applications', 
   'Data Analytics Dashboards', 'Data Management Systems', 'Website Development', 
   'Data Automation Applications', 'Partnership Inquiry', 'General Inquiry', 'Other'.

2. Generate a professional draft response to the lead.

3. Create a concise "Admin Notification" summary that includes the lead's contact details and the core request.

Lead Info:
Name: {{{name}}}
Email: {{{email}}}
Phone: {{{phone}}}
Service Selected: {{{service}}}
Message: {{{message}}}

---

Provide the JSON output.`,
});

const aiLeadCategorizationAndResponseFlow = ai.defineFlow(
  {
    name: 'aiLeadCategorizationAndResponseFlow',
    inputSchema: AILeadCategorizationAndResponseInputSchema,
    outputSchema: AILeadCategorizationAndResponseOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to process lead.');
    }

    // SIMULATION: Sending email to welldropp.tech@gmail.com
    // In a real production app, you would use a library like 'resend' or 'nodemailer' here.
    console.log('--- EMAIL NOTIFICATION SENT ---');
    console.log('To: welldropp.tech@gmail.com');
    console.log('Subject: New Lead from WELLDROPP Website');
    console.log('Content:', output.adminNotification);
    console.log('-------------------------------');

    return {
      ...output,
      sentToEmail: true,
    };
  }
);
