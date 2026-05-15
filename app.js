const TWEAKS = {
    mood: "studio",
    scale: "ruhig",
    rotator: "plain"
};

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

function calculateYears(startYear) {
    return new Date().getFullYear() - startYear;
}

function getNextMonthText() {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const monthName = months[nextMonth.getMonth()];
    const year = nextMonth.getFullYear();
    return `Frei ab ${monthName} ${year}`;
}

function renderHeroMeta(items, config) {
    const container = document.querySelector('.hero-meta');
    if (!container || !Array.isArray(items)) return;
    container.innerHTML = items.map(item => {
        let value = item.value;
        if (item.valueKey === 'yearsOfExperience' && config && config.careerStart) {
            const years = calculateYears(config.careerStart);
            value = `${years} ${years === 1 ? 'Jahr' : 'Jahre'}`;
        }
        return `
        <div>
          <span class="hero-meta-num">${value}</span>
          <span class="hero-meta-lab">${item.label}</span>
        </div>
    `;
    }).join('');
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
        <div class="work-thumb ${item.thumbClass}"${item.image ? ` style="background-image:url('${item.image}');background-size:cover;background-position:center;"` : ''}></div>
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
        setLink('nav-cta-link', config.contact?.whatsappHref || config.nav.ctaHref);
    }

    if (config.contact) {
        setLink('wa', config.contact.whatsappHref);
        setHtml('cta-banner-note', `Oder per E-Mail: ${config.contact.email}`);
    }

    if (config.hero) {
        const tagText = config.hero.tagText === 'auto' ? getNextMonthText() : config.hero.tagText;
        setText('hero-tag-text', tagText);
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
        renderHeroMeta(config.hero.meta, config);
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
        setLink('cta-banner-button', config.contact?.whatsappHref || config.ctaBanner.buttonHref);
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

function applyTweaks() {
    const b = document.body;
    b.dataset.mood = TWEAKS.mood;
    b.dataset.scale = TWEAKS.scale;
    b.dataset.rotator = TWEAKS.rotator;
}

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

fetch('config.json')
    .then(r => r.json())
    .then(config => {
        populatePage(config);
        applyTweaks();
        attachCtaFeedback();
    });
