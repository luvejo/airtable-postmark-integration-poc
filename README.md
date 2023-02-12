## Setup

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
{
  "To": "receiver@example.com",
  "SubmittedAt": "2023-12-11T04:16:22.3461509Z",
  "MessageID": "1d01314b-ae4e-4gdc-a217-e4e1c3afd356",
  "ErrorCode": 0,
  "Message": "OK"
}
```
