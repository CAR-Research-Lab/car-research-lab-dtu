# AI Assistant Guidelines for CAR Lab Website

This repository represents the official website for the Computing Automation and Research (CAR) Laboratory at Delhi Technological University.
It is built with **Next.js (App Router, React 19)**, **Tailwind CSS v4**, and **Framer Motion**.

When the Lab Manager asks you (Claude / ChatGPT) to make updates, strictly follow these guidelines:

## 1. Tech Stack & Styling Rules

- **Framework:** Next.js with App Router (`app/` directory). Do not use the older `pages/` directory.
- **Styling:** Tailwind CSS. Do NOT write custom CSS unless absolutely necessary (e.g., custom animations in `globals.css`).
- **Aesthetics:** The CAR Lab website relies on a high-tech, premium aesthetic. Use the defined theme colors (`primary`, `accent`, `charcoal`) from Tailwind configuration.
- **Micro-animations:** We use Framer Motion (`<motion.div>`) for smooth entry animations and hover states. Maintain these smooth interactive effects.

## 2. Dynamic Content (DatoCMS)

- The website is integrated with DatoCMS. If the user asks to "update the text of an announcement" or "add a new team member", first remind them that this can be done **directly in the DatoCMS dashboard** without writing code.
- If they need to change _how_ the data is fetched or displayed, you will need to edit the `lib/datocms.ts` (GraphQL fetch queries) or the relevant React Component in `app/`.

## 3. Deployment (Vercel / Netlify)

- This site is designed for zero-config deployment on Vercel or Netlify.
- When you push to the `main` branch on GitHub, Vercel/Netlify will automatically build and deploy.
- **DatoCMS Webhooks:** Ensure that in DatoCMS, a Webhook is configured to ping the Vercel/Netlify deploy hook whenever content is published or deleted. This ensures the static pages are regenerated (`ISR` or Static Build).

## 4. Modifying Components

- Most reusable UI blocks are in `components/`.
- If you add a new page (e.g., `/events`), create `app/events/page.tsx` and ensure it uses `<Header />`, `<Preloader />`, and `<Footer />` components for consistency.

## 5. Contact Form

- The contact form in `components/ContactSection.tsx` submits via `no-cors` POST request to a Google Apps Script Web App. If you need to add new fields, make sure the Google Apps Script (`doPost` function) is also updated to parse the new fields.
