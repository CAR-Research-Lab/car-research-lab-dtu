# CAR Lab Website - Manager Guide

Welcome to the CAR Lab website management guide. This document explains how you can maintain the website, update content without touching code, and how to use AI (like Claude or ChatGPT) to add new features effortlessly.

## 1. Updating Content (DatoCMS)
You wanted a system with low maintenance overhead where content can be updated dynamically. We are setting up **DatoCMS**.
- **How it works:** DatoCMS provides an easy-to-use admin dashboard. When you log in, you will see sections for "People", "Publications", and "Updates".
- **Making Changes:** Simply click "Create New Record", fill in the text fields (e.g., Name, Research Focus), upload an image, and click "Publish".
- **No Coding Required:** The website automatically pulls this data. You do not need to edit any files or code to add a new PhD scholar or post a new announcement.

## 2. Automatic Deployments (Vercel or Netlify)
To ensure the website stays fast and updates automatically when you change content in DatoCMS, we strongly recommend deploying on **Vercel** (or Netlify).
- **GitHub Integration:** You connect your GitHub repository to Vercel. Whenever code is updated, Vercel automatically deploys the site.
- **DatoCMS Webhooks:** Inside DatoCMS settings, you can add a "Build Trigger" (Webhook). You paste a special URL provided by Vercel. 
- **The Result:** Whenever you hit "Publish" in DatoCMS, DatoCMS pings Vercel. Vercel automatically rebuilds the specific page that changed in the background (Incremental Static Regeneration). Within seconds, the main website reflects your new content without any developer intervention.

## 3. How to Use AI (Claude Code / ChatGPT) for Code Changes
If you need to make structural changes (e.g., adding a completely new page layout, changing the color theme, or adding a new form), you can easily teach AI to do it for you.

We have included a `CLAUDE.md` file in the repository. This file acts as "instructions" for any AI agent that looks at your codebase.

**How to ask the AI for changes:**
1. Open your repository in an AI-powered editor (like Cursor, Windsurf, or give the GitHub repo link to Claude).
2. Because `CLAUDE.md` is present, the AI immediately knows this is a Next.js App Router project using Tailwind CSS and Framer Motion.
3. Simply state your request in plain English. 
   - *Example:* "Add a new page at `/gallery` that displays a grid of lab photos."
   - *Example:* "Add a dropdown field for 'Country' in the Contact Us form."
4. The AI will read the `CLAUDE.md` guidelines, understand the styling constraints, and generate the exact code needed. You just review and accept it.

By keeping the code in GitHub and connecting it to Vercel, any code change made by you (or an AI assistant) will be instantly pushed to the live website.
