fetch('../config.json')
  .then(r => r.json())
  .then(config => {
    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };

    // Nav brand
    const brand = document.querySelector('.brand');
    if (brand && config.brand) {
      brand.innerHTML = `${config.brand.name} <small>· ${config.brand.subtitle}</small>`;
    }

    // Footer
    set('footer-copy', config.footer?.copy);
    const footerLinks = document.getElementById('footer-links');
    if (footerLinks && config.footer?.links) {
      footerLinks.innerHTML = config.footer.links
        .map(l => `<a href="${l.href}">${l.text}</a>`)
        .join('');
    }

    // Owner info
    const o = config.owner;
    if (o) {
      set('legal-owner-name', o.name);
      set('legal-owner-street', o.address?.street);
      set('legal-owner-city', o.address?.city);

      const phoneLink = document.getElementById('legal-owner-phone');
      if (phoneLink) { phoneLink.href = o.phoneHref; phoneLink.textContent = o.phone; }

      document.querySelectorAll('[data-legal-email]').forEach(el => {
        el.href = `mailto:${o.email}`;
        el.textContent = o.email;
      });
    }

    // Appearance
    if (config.appearance) {
      const b = document.body;
      if (config.appearance.mood) b.dataset.mood = config.appearance.mood;
      if (config.appearance.scale) b.dataset.scale = config.appearance.scale;
    }
  });
