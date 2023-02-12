# Airtable-Postmark Integration PoC

A serverless function that sends email notifications (via Postmark) every time an Airtable form is submitted. This is a proposal for an Animal Advocacy Careers volunteer request.

## ⚡ Development

First, make sure you have:

- A free [Vercel](https://vercel.com/) account.
- A free [Postmark](https://postmarkapp.com/) account.
- A free [Airtable](https://airtable.com/) account.

Set the required env variables:

```sh
cp .env.example .env
```

Then just install the project and run the development server:

```sh
yarn && npx vercel dev
```

Go to http://localhost:3000/api/handler.

If everything was properly setup, you should see a JSON response from Postmark:

```json
[
  {
    "To": "receiver@example.com",
    "SubmittedAt": "2023-12-11T04:16:22.3461509Z",
    "MessageID": "1d01314b-ae4e-4gdc-a217-e4e1c3afd356",
    "ErrorCode": 0,
    "Message": "OK"
  },
  {
    "To": "receiver2@example.com",
    "SubmittedAt": "2023-12-11T04:16:22.3461509Z",
    "MessageID": "22bdabc-7c84-4ad2-bed8-107f2f637b31",
    "ErrorCode": 0,
    "Message": "OK"
  }
]
```

## ⚡ Production

### 1. Vercel Setup

Set the required env variables. It would be easier to just fill this file locally and then import it as a whole from Vercel:

```sh
cp .env.example .env
```

### 2. Airtable Webhook Setup

Create a new webhook:

```sh
curl -X POST "https://api.airtable.com/v0/bases/{baseId}/webhooks" \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
--data '{
    "notificationUrl": "YOUR_NOTIFICATION_URL",
    "specification": {
      "options": {
        "filters": {
          "dataTypes": [
            "tableData"
          ],
          "fromSources": [
            "formSubmission"
          ],
          "recordChangeScope": "YOUR_TABLE_ID",
          "changeTypes": ["add"]
        }
      }
    }
  }'
```

Make sure you change the value of `{baseId}`, `YOUR_TOKEN`, `YOUR_NOTIFICATION_URL` and `YOUR_TABLE_ID`.
