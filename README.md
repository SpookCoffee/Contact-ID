# Contact-ID — Graphite + Wine (v2)

A self-contained personal contact website for NFC tags, hosted free on **GitHub Pages**.
No frameworks, analytics, third-party scripts, or API keys are needed.

## Project structure

```text
Contact-ID/
├── index.html                Website structure
├── assets/
│   ├── css/styles.css        Graphite + Wine colors, sizing, responsive layout
│   ├── js/contact-data.js    EDIT THIS for your public contact information
│   ├── js/app.js             Displays your details and sets up buttons
│   ├── js/vcard.js           Generates the downloaded .vcf file
│   └── icons/favicon.svg     Local icon
├── contact-template.vcf      Example only; NOT used by Save Contact
├── tests/vcard.test.js       Optional Node tests
├── package.json              Optional test command
├── .nojekyll                 GitHub Pages: no Jekyll processing
└── README.md
```

## Edit your contact details in ONE place

Open `assets/js/contact-data.js` and edit the `CONTACT` object. Leave phone/email blank to hide those rows. Public GitHub and LinkedIn links have been carried over from the previous site.

```js
export const CONTACT = {
  firstName: "Your",
  lastName: "Name",
  role: "Personal contact card",
  description: "One simple place to stay in touch.",
  phone: "",   // Example: "+14125550123"
  email: "",   // Example: "hello@example.com"
  links: [
    { label: "GitHub", url: "https://github.com/SpookCoffee" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/marko-wg" },
    // { label: "Portfolio", url: "https://example.com" },
  ],
  note: "",
};
```

The Save Contact button creates a fresh `.vcf` file **in the visitor's browser** using these details; the separate `contact-template.vcf` is only a format example. Do not edit it to update the website.

**Mobile behavior:** 1 link = full width; 2 = equal halves; 3 = equal thirds; 4 = four equal columns on wider screens, two-by-two on small phones. The link section itself always aligns with the contact rows and Save Contact button.

## Use in VS Code

1. Install [Visual Studio Code](https://code.visualstudio.com/) and Git (if needed).
2. In VS Code choose **Source Control → Clone Repository**, then enter `https://github.com/SpookCoffee/Contact-ID.git` and open the folder.
3. Replace the repo's old `index.html` and add the `assets`, `tests`, `package.json`, `.nojekyll`, etc. from this ZIP. Keep any other files you want, but don't duplicate the old styles.
4. To preview, run a local static server in the project directory:
   ```sh
   python3 -m http.server 8000
   ```
   Open `http://localhost:8000/`. You can instead use VS Code's Live Server extension. Because JavaScript files use ES modules, **do not open index.html as a `file://` URL**.
5. Optional: with Node.js installed, run `npm test` (no dependency installation required).
6. In Source Control, review changes, commit, and **Push / Sync Changes** to `main`.

## GitHub Pages (mobile or desktop)

In the GitHub repository go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **main**, choose **/(root)**, and **Save**. Your site URL will normally be:

`https://spookcoffee.github.io/Contact-ID/`

If Pages is already enabled, new commits redeploy it automatically. If the old design persists, check the **Actions** tab for the latest Pages deployment and refresh the site after deployment completes. Folder names and case must match.

To program your NFC tag in NFC Tools: **Write → Add a record → URL / URI**, use the full GitHub Pages HTTPS URL, write, and test before locking the tag.

## Privacy

**Anything placed in a public GitHub repo or GitHub Pages is public**, including future phone/email details. Git history can preserve deleted values. `noindex` asks search engines not to index a page; it is NOT access control. Use a contact email alias if desired; avoid home address and other sensitive details.

There are no trackers included in this project, though GitHub's web hosting may keep normal server logs. vCard downloads are generated on the visitor's device rather than sent to another service. Some iPhones may download the `.vcf` into Files; open it from Downloads to import it into Contacts.
