'use client';

import { useEffect } from 'react';

export function ContactEntrance() {
  useEffect(() => {
    const contact = document.getElementById('contact');
    const heading = document.getElementById('contact-title');
    if (!contact || !heading) return;

    let pending = false;
    let timer = 0;

    function animateWhenSettled() {
      if (!pending) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const bounds = heading!.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
        pending = false;
        contact!.classList.remove('contact-entering');
        // Restart the existing CSS entrance even when the hash hasn't changed.
        void contact!.offsetWidth;
        contact!.classList.add('contact-entering');
      }, 120);
    }

    function requestEntrance() {
      pending = true;
      animateWhenSettled();
    }

    function onHashChange() {
      if (window.location.hash === '#contact') requestEntrance();
      else {
        pending = false;
        window.clearTimeout(timer);
      }
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
      const url = new URL(link.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash === '#contact') {
        requestEntrance();
      }
    }

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', animateWhenSettled, { passive: true });
    document.addEventListener('click', onClick);
    onHashChange();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', animateWhenSettled);
      document.removeEventListener('click', onClick);
      contact.classList.remove('contact-entering');
    };
  }, []);

  return null;
}
