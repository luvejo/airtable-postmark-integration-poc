import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ServerClient } from 'postmark'

export default async function handler(
  _request: VercelRequest,
  response: VercelResponse,
) {
  const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN || '')

  const postmarkResponse = await client.sendEmail({
    From: process.env.POSTMARK_SENDER_EMAIL || '',
    To: process.env.POSTMARK_RECEIVER || '',
    Subject: 'Test',
    TextBody: 'Postmark works!',
  })

  response.status(200).json(postmarkResponse)
}
