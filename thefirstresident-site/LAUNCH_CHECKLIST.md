# TheFirstResident.com Launch Checklist

## Local setup
1. Copy `.env.local.example` to `.env.local`.
2. Add Stripe test keys.
3. Run `npm install`.
4. Run `npm run dev`.
5. Test the homepage at `http://localhost:3000`.
6. Test checkout using Stripe test card `4242 4242 4242 4242`.

## Assets to replace
- `public/images/book-cover.jpg`
- `public/images/briar-glen-house.jpg`
- `public/images/video-poster.jpg`
- `public/samples/first-resident-sample.pdf`

## Before live launch
- Replace placeholder cover with final Larry Lowe cover.
- Add real video synopsis URL.
- Add final sample PDF.
- Decide whether the full PDF is delivered manually, via Stripe email, or through protected storage.
- Set live Stripe keys in Vercel.
- Add domain `thefirstresident.com` in Vercel.
- Update GoDaddy DNS records.
