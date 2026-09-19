'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const recipient = 'khalfellah@outlook.fr';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim() || 'Project enquiry';
    const message = String(data.get('message') ?? '').trim();
    const body = [`From: ${name}`, `Email: ${email}`, '', message].join('\n');

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-topbar" aria-hidden="true">
        <span />
      </div>
      <div className="contact-form-heading">
        <p>New message</p>
        <button className="contact-send" type="submit" aria-label="Open your email app to send this message">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
          </svg>
        </button>
      </div>
      <div className="contact-form-row">
        <span>To:</span>
        <strong>{recipient}</strong>
      </div>
      <div className="contact-form-row">
        <label htmlFor="contact-name">From:</label>
        <input id="contact-name" name="name" type="text" placeholder="Your name" required />
        <span className="contact-form-separator">·</span>
        <label className="sr-only" htmlFor="contact-email">Your email</label>
        <input id="contact-email" name="email" type="email" placeholder="your@email.com" required />
      </div>
      <div className="contact-form-row">
        <label htmlFor="contact-subject">Subject:</label>
        <input id="contact-subject" name="subject" type="text" placeholder="A project we could build together" />
      </div>
      <label className="sr-only" htmlFor="contact-message">Message</label>
      <textarea id="contact-message" name="message" placeholder="Tell me a little about your project..." required />
      {sent ? <p className="contact-form-status" role="status">Your email app should open with the message ready to send.</p> : null}
    </form>
  );
}
