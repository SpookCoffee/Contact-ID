import { CONTACT } from './contact-data.js';
import { normalizeContact, createVCard } from './vcard.js';

const $ = (id) => document.getElementById(id);
const c = normalizeContact(CONTACT);
const isDemo = c.fullName.toLowerCase() === 'your name';

$('contact-name').textContent = c.fullName;
$('contact-role').textContent = c.role;
$('contact-description').textContent = c.description;
$('avatar').textContent = `${c.firstName.charAt(0)}${c.lastName.charAt(0)}`.toUpperCase();
$('demo-label').hidden = !isDemo;
document.title = `${c.fullName} · Contact / ID`;

if (c.phone) {
  $('phone-row').hidden = false;
  $('phone-value').textContent = c.phone;
  $('call-link').href = `tel:${c.phone}`;
  $('text-link').href = `sms:${c.phone}`;
}
if (c.email) {
  $('email-row').hidden = false;
  $('email-value').textContent = c.email;
  $('email-link').href = `mailto:${c.email}`;
}

const nav = $('social-links');
for (const { label, url } of c.links) {
  const link = document.createElement('a');
  link.className = 'social-link';
  link.textContent = `${label} ↗`;
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.referrerPolicy = 'no-referrer';
  nav.appendChild(link);
}
if (c.links.length) {
  nav.hidden = false;
  nav.dataset.count = String(c.links.length);
  nav.style.setProperty('--columns', String(c.links.length));
}
$('empty-message').hidden = Boolean(c.phone || c.email || c.links.length);

$('save-contact').addEventListener('click', () => {
  const vcard = createVCard(CONTACT);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const filename = c.fullName.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '') || 'contact';
  anchor.href = objectUrl;
  anchor.download = `${filename}.vcf`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  $('status').textContent = 'Contact file prepared. Open the .vcf download to import it.';
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
});
