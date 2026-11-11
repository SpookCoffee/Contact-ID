/** Helpers for displaying and exporting a vCard. No external dependencies. */
export const trimmed = (value) => typeof value === 'string' ? value.trim() : '';

export function cleanPhone(value) {
  const phone = trimmed(value).replace(/[\s().-]/g, '');
  return /^\+?[0-9]{7,15}$/.test(phone) ? phone : '';
}
export function cleanEmail(value) {
  const email = trimmed(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '';
}
export function safeHttps(value) {
  try {
    const url = new URL(trimmed(value));
    if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) return '';
    return url.href;
  } catch { return ''; }
}
export function normalizeContact(contact) {
  const firstName = trimmed(contact.firstName) || 'Your';
  const lastName = trimmed(contact.lastName) || 'Name';
  const links = Array.isArray(contact.links) ? contact.links : [];
  return {
    firstName, lastName, fullName: `${firstName} ${lastName}`.trim(),
    role: trimmed(contact.role) || 'Personal contact card',
    description: trimmed(contact.description) || 'One simple place to stay in touch.',
    phone: cleanPhone(contact.phone),
    email: cleanEmail(contact.email),
    note: trimmed(contact.note),
    links: links.map(({label,url}) => ({label: trimmed(label), url: safeHttps(url)}))
      .filter(link => link.label && link.url).slice(0, 4),
  };
}

export function escapeVCardText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;').replace(/,/g, '\\,');
}

// vCard 3.0 lines must be folded at 75 octets, not merely 75 characters.
export function foldVCardLine(input) {
  const encoder = new TextEncoder();
  let width = 0;
  let result = '';
  for (const char of String(input)) {
    const count = encoder.encode(char).length;
    if (width + count > 75) {
      result += '\r\n ';
      width = 1; // continuation space counts as one byte
    }
    result += char;
    width += count;
  }
  return result;
}

export function createVCard(rawContact) {
  const c = normalizeContact(rawContact);
  const lines = [
    'BEGIN:VCARD', 'VERSION:3.0',
    `N:${escapeVCardText(c.lastName)};${escapeVCardText(c.firstName)};;;`,
    `FN:${escapeVCardText(c.fullName)}`,
  ];
  if (c.role !== 'Personal contact card') lines.push(`TITLE:${escapeVCardText(c.role)}`);
  if (c.phone) lines.push(`TEL;TYPE=CELL:${c.phone}`);
  if (c.email) lines.push(`EMAIL;TYPE=INTERNET:${escapeVCardText(c.email)}`);
  // Contacts apps differ in how many URLs they display. We add valid HTTPS URLs.
  for (const link of c.links) lines.push(`URL:${link.url}`);
  if (c.note) lines.push(`NOTE:${escapeVCardText(c.note)}`);
  lines.push('END:VCARD');
  return lines.map(foldVCardLine).join('\r\n') + '\r\n';
}
