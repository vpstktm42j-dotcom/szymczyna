/**
 * Client-side interactions recreated from the Framer site:
 *  - phone deck that switches screens while the Mountain Guide cards scroll past
 *  - laptop lid that opens as the Test Execute section scrolls into view
 *  - "Get in touch" cards that expand into a contact panel
 *  - copy-to-clipboard email, contact form submit, back-to-top button
 */

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/* ---------- Phone deck (Mountain Guide) ---------- */
function setupPhoneDecks() {
  document.querySelectorAll<HTMLElement>('[data-phone-scrolly]').forEach((root) => {
    const phones = [...root.querySelectorAll<HTMLElement>('[data-phone]')];
    const steps = [...root.querySelectorAll<HTMLElement>('[data-step]')];
    let active = -1;

    const apply = (next: number) => {
      if (next === active) return;
      active = next;
      phones.forEach((phone, i) => {
        const k = i - active;
        phone.dataset.k = k === 0 || k === 1 || k === -1 ? String(k) : k > 1 ? 'far' : 'past';
      });
    };

    const update = () => {
      const trigger = window.innerHeight * 0.5;
      const vh = window.innerHeight;
      let next = 0;
      for (const step of steps) {
        const top = step.getBoundingClientRect().top;
        if (top > trigger) break;
        const start = Number(step.dataset.start);
        const count = Number(step.dataset.count);
        if (count === 0) continue;
        next = start + clamp(Math.floor((trigger - top) / vh), 0, count - 1);
      }
      apply(next);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  });
}

/* ---------- Laptop lid (Test Execute) ---------- */
function setupLaptops() {
  document.querySelectorAll<HTMLElement>('[data-laptop-scrolly]').forEach((root) => {
    const lid = root.querySelector<HTMLElement>('[data-lid]');
    if (!lid) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const top = root.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const progress = clamp((vh - top) / vh, 0, 1);
      lid.style.setProperty('--lid', `${-(1 - progress) * 88}deg`);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  });
}

/* ---------- Expanding "Get in touch" cards ---------- */
function setupCtas() {
  document.querySelectorAll<HTMLElement>('[data-cta]').forEach((cta) => {
    const openBtn = cta.querySelector<HTMLButtonElement>('[data-cta-open]');
    const closeBtn = cta.querySelector<HTMLButtonElement>('[data-cta-close]');

    const layout = () => {
      if (!cta.classList.contains('is-open')) return;
      const vw = document.documentElement.clientWidth;
      if (vw < 810) {
        cta.style.removeProperty('--open-w');
        cta.style.removeProperty('--dx');
        return;
      }
      const width = Math.min(960, vw - 48);
      cta.style.setProperty('--open-w', `${width}px`);
      // Centre the expanded panel on the page, whichever column the card sits in.
      cta.style.setProperty('--dx', '0px');
      const left = cta.parentElement!.getBoundingClientRect().left;
      cta.style.setProperty('--dx', `${(vw - width) / 2 - left}px`);
    };

    openBtn?.addEventListener('click', () => {
      cta.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
      layout();
      cta.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    });
    closeBtn?.addEventListener('click', () => {
      cta.classList.remove('is-open');
      openBtn?.setAttribute('aria-expanded', 'false');
      cta.style.removeProperty('--dx');
      cta.style.removeProperty('--open-w');
      openBtn?.focus({ preventScroll: true });
    });
    window.addEventListener('resize', layout);
  });
}

/* ---------- Copy email ---------- */
function setupCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy ?? '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        window.location.href = `mailto:${value}`;
        return;
      }
      const def = btn.querySelector<HTMLElement>('[data-copy-default]');
      const done = btn.querySelector<HTMLElement>('[data-copy-done]');
      if (def && done) {
        def.hidden = true;
        done.hidden = false;
        setTimeout(() => {
          def.hidden = false;
          done.hidden = true;
        }, 2000);
      }
    });
  });
}

/* ---------- Contact form ---------- */
function setupForms() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const setStatus = (text: string, state: 'ok' | 'error' | '' = '') => {
      if (!status) return;
      status.textContent = text;
      status.dataset.state = state;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const endpoint = form.dataset.endpoint;

      if (!endpoint) {
        // No form service configured: open the visitor's email app with the message filled in.
        const subject = String(data.get('subject') || 'Portfolio enquiry');
        const body = `${data.get('message') ?? ''}\n\n${data.get('name') ?? ''}\n${data.get('email') ?? ''}`;
        window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus('Your email app should open with the message ready to send.');
        return;
      }

      if (submit) submit.disabled = true;
      setStatus('Sending…');
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus('Thank you! Your message has been sent.', 'ok');
      } catch {
        setStatus(`Something went wrong. Please email me at ${form.dataset.email}.`, 'error');
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  });
}

/* ---------- Back to top ---------- */
function setupScrollTop() {
  const btn = document.querySelector<HTMLElement>('[data-scroll-top]');
  if (!btn) return;
  const update = () => btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
  update();
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

setupPhoneDecks();
setupLaptops();
setupCtas();
setupCopy();
setupForms();
setupScrollTop();
