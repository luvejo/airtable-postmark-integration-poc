import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ServerClient } from 'postmark'

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || '')
  const receivers = (process.env.POSTMARK_RECEIVERS || '').split(',')

  const postmarkResponse = await client.sendEmailBatch(
    receivers.map((receiver) => ({
      From: process.env.POSTMARK_SENDER_EMAIL || '',
      To: receiver,
      Subject: 'Test',
      TextBody: JSON.stringify(request.body) || 'Postmark works!',
      MessageStream: process.env.POSTMARK_MESSAGE_STREAM || '',
    })),
  )

  response.status(200).json(postmarkResponse)
}
