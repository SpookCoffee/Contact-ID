import test from 'node:test';
import assert from 'node:assert/strict';
import { createVCard, normalizeContact, foldVCardLine, safeHttps } from '../assets/js/vcard.js';

test('sanitizes links and phone numbers', () => {
  const c = normalizeContact({
    firstName: 'Example', lastName: 'Person', phone: '(412) 555-0199', email: 'hello@example.com',
    links: [
      {label: 'GitHub', url: 'https://github.com/example'},
      {label: 'Unsafe', url: 'javascript:alert(1)'},
    ],
  });
  assert.equal(c.phone, '4125550199');
  assert.equal(c.links.length, 1);
  assert.equal(c.links[0].label, 'GitHub');
});

test('exports a valid vCard with social URLs and escaped text', () => {
  const text = createVCard({
    firstName: 'Jane', lastName: 'Doe', role: 'Engineer', phone: '+14125550199',
    email: 'jane@example.com', note: 'Hello, world; and goodbye',
    links: [{label:'GitHub',url:'https://github.com/example'}],
  });
  assert.match(text, /^BEGIN:VCARD\r\nVERSION:3.0\r\n/);
  assert.match(text, /N:Doe;Jane;;;/);
  assert.match(text, /TEL;TYPE=CELL:\+14125550199/);
  assert.match(text, /URL:https:\/\/github.com\/example/);
  assert.match(text, /NOTE:Hello\\, world\\; and goodbye/);
  assert.ok(text.endsWith('END:VCARD\r\n'));
});

test('never allows non-HTTPS URLs', () => {
  assert.equal(safeHttps('http://example.com'), '');
  assert.equal(safeHttps('javascript:alert(1)'), '');
  assert.equal(safeHttps('https://user:pass@example.com'), '');
});

test('wraps long unicode vCard lines at max 75 UTF-8 bytes', () => {
  const lines = foldVCardLine('NOTE:' + 'é'.repeat(110)).split('\r\n');
  for (const line of lines) assert.ok(new TextEncoder().encode(line).length <= 75);
  assert.ok(lines[1].startsWith(' '));
});
