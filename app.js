const CONFIG_URL = './config.json';

// === Tweaks state ===
const TWEAKS = /*EDITMODE-BEGIN*/{
    "mood": "studio",
    "scale": "ruhig",
    "rotator": "plain"
}/*EDITMODE-END*/;

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setLink(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href;
}

function renderHeroMeta(items) {
    const container = document.querySelector('.hero-meta');
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map(item => `
        <div>
          <span class="hero-meta-num">${item.value}</span>
          <span class="hero-meta-lab">${item.label}</span>
        </div>
    `).join('');
}

function renderServices(services) {
    const container = document.getElementById('services-list');
    if (!container || !Array.isArray(services)) return;
    container.innerHTML = services.map((service, index) => `
      <div class="service">
        <div class="service-top"><span class="service-tag">${String(index + 1).padStart(2, '0')}</span></div>
        <div class="service-name">${service}</div>
      </div>
    `).join('');
}

function renderWork(items) {
    const container = document.getElementById('work-grid');
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map(item => `
      <a class="work-card" href="${item.href}">
        <div class="work-thumb ${item.thumbClass}"></div>
        <div class="work-info"><span class="name">${item.name}</span><span class="meta">${item.meta}</span></div>
      </a>
    `).join('');
}

function renderAboutMeta(items) {
    const container = document.getElementById('about-meta');
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map(item => `<span>${item}</span>`).join('');
}

function renderFooterLinks(links) {
    const container = document.getElementById('footer-links');
    if (!container || !Array.isArray(links)) return;
    container.innerHTML = links.map(link => `<a href="${link.href}">${link.text}</a>`).join('');
}

function populatePage(config) {
    document.title = config.title || document.title;

    if (config.brand) {
        const brandEl = document.querySelector('.brand');
        if (brandEl) {
            brandEl.innerHTML = `${config.brand.name} <small>· ${config.brand.subtitle}</small>`;
        }
    }

    if (config.nav) {
        setText('nav-cta-text', config.nav.ctaText);
        setLink('nav-cta-link', config.nav.ctaHref);
    }

    if (config.contact) {
        setLink('wa', config.contact.whatsappHref);
        setHtml('cta-banner-note', `Oder per E-Mail: ${config.contact.email}`);
    }

    if (config.hero) {
        setText('hero-tag-text', config.hero.tagText);
        setText('hero-tag-location', config.hero.tagLocation);
        setText('hero-pre', config.hero.pre);
        if (Array.isArray(config.hero.rotatorWords) && config.hero.rotatorWords.length) {
            const el = document.getElementById('rot');
            if (el) el.textContent = config.hero.rotatorWords[0];
            const words = config.hero.rotatorWords;
            let index = 0;
            function rotate() {
                index = (index + 1) % words.length;
                if (!el) return;
                el.classList.add('is-out');
                setTimeout(() => {
                    el.textContent = words[index];
                    el.classList.remove('is-out');
                    el.classList.add('is-pre');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => el.classList.remove('is-pre'));
                    });
                }, 480);
            }
            setInterval(rotate, 2600);
        }
        setText('hero-post', config.hero.post);
        setText('wa-text', config.hero.actions.primary);
        setText('secondary-action-text', config.hero.actions.secondary);
        setText('hero-note', config.hero.note);
        renderHeroMeta(config.hero.meta);
    }

    if (config.services) {
        setText('services-title', config.services.title);
        setText('services-label', config.services.label);
        renderServices(config.services.items);
    }

    if (config.work) {
        setText('work-title', config.work.title);
        setText('work-label', config.work.label);
        renderWork(config.work.items);
    }

    if (config.about) {
        setText('about-title', config.about.title);
        setText('about-label', config.about.label);
        setText('about-text', config.about.text);
        renderAboutMeta(config.about.meta);
    }

    if (config.ctaBanner) {
        setHtml('cta-banner-headline', config.ctaBanner.headline);
        setText('cta-banner-button-text', config.ctaBanner.buttonText);
        setLink('cta-banner-button', config.ctaBanner.buttonHref);
        setText('cta-banner-note', config.ctaBanner.note);
    }

    if (config.footer) {
        setText('footer-copy', config.footer.copy);
        renderFooterLinks(config.footer.links);
    }

    if (config.appearance) {
        Object.assign(TWEAKS, config.appearance);
    }
}

function getConfig() {
    return fetch(CONFIG_URL)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load config');
            return response.json();
        })
        .catch(() => {
            return {
                title: document.title,
                appearance: TWEAKS,
                brand: { name: 'meyert', subtitle: 'webdesign' },
                nav: { ctaText: 'WhatsApp', ctaHref: '#cta' },
                contact: { whatsappHref: '#', email: 'hallo@meyert.de' },
                hero: {
                    tagText: 'Frei ab Juli 2026',
                    tagLocation: 'Köln',
                    pre: 'Ich kümmere mich um',
                    rotatorWords: ['Websites', 'Domains', 'SEO', 'Google-Profile'],
                    post: 'für kleine Geschäfte in Köln.',
                    actions: { primary: 'Auf WhatsApp schreiben', secondary: 'Arbeiten ansehen' },
                    note: 'Festpreis ab 700 € · Antwort innerhalb 24 h',
                    meta: [
                        { value: '5 Jahre', label: 'Erfahrung' },
                        { value: '30+', label: 'Geschäfte online' },
                        { value: 'ab 700 €', label: 'Festpreis' },
                        { value: '~3 Wo.', label: 'Bis online' }
                    ]
                },
                services: {
                    title: 'Was ich mache',
                    label: 'Komplett oder einzeln',
                    items: ['Website', 'Domain einrichten', 'E-Mail-Adresse', 'Google-Profil', 'SEO Grundlagen', 'Hosting & Wartung']
                },
                work: {
                    title: 'Bisher gemacht',
                    label: 'Vier von dreißig',
                    items: [
                        { name: 'annaschnitt.de', meta: 'Salon · Köln', href: '#', thumbClass: 'work-thumb-1' },
                        { name: 'hoffmann-brot.de', meta: 'Bäcker · Bonn', href: '#', thumbClass: 'work-thumb-2' },
                        { name: 'praxis-weiss.de', meta: 'Praxis · D\'dorf', href: '#', thumbClass: 'work-thumb-3' },
                        { name: 'lenz-holz.de', meta: 'Werkstatt · LEV', href: '#', thumbClass: 'work-thumb-4' }
                    ]
                },
                about: {
                    title: 'Über mich',
                    label: 'Eine Person, keine Agentur',
                    text: 'Ich heiße Meyert, wohne in Köln und mache seit fünf Jahren Websites für kleine Geschäfte. Du schreibst mir direkt — keine Zwischenebene, kein Account-Manager.',
                    meta: ['📍 Köln', '⌚ Seit 2021', '🗣 Deutsch · per Du', '⏱ Antwort < 24h']
                },
                ctaBanner: {
                    headline: 'Schreib mir kurz.<br />Den Rest mache ich.',
                    buttonText: 'WhatsApp öffnen',
                    buttonHref: '#',
                    note: 'Oder per E-Mail: hallo@meyert.de'
                },
                footer: {
                    copy: '© 2026 meyert · Köln',
                    links: [{ text: 'Impressum', href: '#' }, { text: 'Datenschutz', href: '#' }]
                }
            };
        });
}

function applyTweaks() {
    const b = document.body;
    b.dataset.mood = TWEAKS.mood;
    b.dataset.scale = TWEAKS.scale;
    b.dataset.rotator = TWEAKS.rotator;
    document.querySelectorAll('#tp .tp-radio').forEach(r => {
        const key = r.dataset.key;
        r.querySelectorAll('.tp-opt').forEach(o => {
            o.classList.toggle('is-active', o.dataset.val === TWEAKS[key]);
        });
    });
}

function setTweak(key, val) {
    TWEAKS[key] = val;
    applyTweaks();
    try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
    } catch (e) { }
}

// Wire panel
const panel = document.getElementById('tp');
document.getElementById('tp-close').addEventListener('click', () => {
    panel.classList.remove('is-visible');
    setTimeout(() => panel.classList.remove('is-open'), 250);
    try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) { }
});
document.querySelectorAll('#tp .tp-opt').forEach(o => {
    o.addEventListener('click', () => {
        const key = o.parentElement.dataset.key;
        setTweak(key, o.dataset.val);
    });
});

// Edit mode protocol — register listener FIRST, then announce
window.addEventListener('message', (e) => {
    const msg = e.data;
    if (!msg || !msg.type) return;
    if (msg.type === '__activate_edit_mode') {
        panel.classList.add('is-open');
        requestAnimationFrame(() => panel.classList.add('is-visible'));
    }
    if (msg.type === '__deactivate_edit_mode') {
        panel.classList.remove('is-visible');
        setTimeout(() => panel.classList.remove('is-open'), 250);
    }
});
try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) { }

getConfig().then(populatePage).finally(applyTweaks);

// CTA tap feedback
function attachCtaFeedback() {
    document.querySelectorAll('.cta-primary').forEach(b => {
        b.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                setTimeout(() => { this.style.transform = ''; }, 160);
            }
        });
    });
}

attachCtaFeedback();
