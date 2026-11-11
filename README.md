# Contact-ID — Graphite + Wine

A small, mobile-first personal NFC contact website. Color theme **8B: Graphite + Wine**.

## What's included

- `index.html` — the entire contact site in **one editable file**. It automatically makes a downloadable vCard (`.vcf`) with JavaScript when a visitor taps **Save contact**.
- `contact-template.vcf` — an optional *sample* standalone `.vcf` format file. **The website does not load this file**; its Save button builds a fresh `.vcf` from the contact details inside `index.html` so you only update your information in one place.
- `.nojekyll` — makes GitHub Pages treat these files as ordinary static files.

## Make your changes later

Open `index.html` on GitHub and find **EDIT YOUR PUBLIC DETAILS HERE** near the start. Edit just this block:

```js
const CONTACT = {
  firstName: "Your",
  lastName: "Name",
  role: "Personal contact card",
  description: "One simple place to stay in touch.",
  phone: "",            // Example: "+14125550123"
  email: "",            // Example: "contact@example.com"
  website: "",          // Optional HTTPS link
  github: "",           // Optional HTTPS GitHub profile
  linkedin: "",         // Optional HTTPS LinkedIn profile
  note: ""              // Optional vCard note
};
```

Leave values blank to hide optional website/social links. Phone and email rows remain visibly marked "Not set" until you add valid data. Only HTTPS web/social URLs are displayed. There is no external data service. The .vcf file is generated on the visitor's device from the details in the site.

If Safari downloads the file rather than opening Contacts, open the `.vcf` from the **Files > Downloads** folder and choose to add/import the contact. Exact system prompts may vary.

## Publish from a phone using GitHub

1. Sign in to `github.com` using Safari/Chrome. The GitHub mobile app may not expose all file-upload and Pages settings.
2. Open your existing `Contact-ID` repo. On the `main` branch, **replace** the existing `index.html` with the one in this package. Add `contact-template.vcf` and `.nojekyll`, and optionally replace `README.md`. **Do not upload the ZIP as a single file**: GitHub Pages needs `index.html` at the repository root.
3. In your repository, open **Settings > Pages** (in a mobile browser, try **Request Desktop Website** if Settings is hidden).
4. Under **Build and deployment**, choose **Deploy from a branch**; branch **main**; folder **/(root)**; then **Save**.
5. After publication, GitHub Pages will show a **Visit site** link. Test it using your phone's normal browser and cellular data.
6. In NFC Tools, choose **Write > Add a record > URL / URI**, paste that exact **HTTPS** URL, and write your NFC tag. Do not permanently lock the tag until you finish testing.

## Privacy & security

- This version intentionally contains **no real name, email, phone number, or personal address**.
- A public GitHub repository and a published GitHub Pages site are readable by everyone, not only someone holding your NFC tag. `noindex` is only a request to search engines, **not privacy**.
- Do **not** add your home address, birthday, or main private contact details unless you want them public.
- Use a separate public-facing email alias and, if desired, a phone number specifically for sharing.
- Git commit history can retain values you later remove; do not commit secrets or private data even temporarily.
- No third-party libraries, tracking scripts, fonts, or analytics scripts were added to the website. GitHub's hosting may still have normal server logs.
- GitHub Pages hosts this page; it is **not hosted on your home Debian server**.
- The site is not configured to collect form submissions, passwords, or personal data from visitors.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
