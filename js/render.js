/* ═══════════════════════════════════
   js/render.js — Render + Animations
   Techniques applied:
   - Scroll-triggered stagger card reveal (IntersectionObserver)
   - Hero title split animation (GSAP, on load)
   - Parallax grid background (mousemove / scroll)
   - Card hover 3D tilt (pointer events)
   - Progress tracking via localStorage checkboxes
   ═══════════════════════════════════ */

// ── Level maps ──────────────────────────────────────
const levelMap = {
    'Foundation': 'lv-foundation',
    'Core': 'lv-core',
    'Advanced': 'lv-advanced',
    'Expert': 'lv-expert'
};

// ── Card backdrop (spotlight overlay) ───────────────
const cardBackdrop = document.createElement('div');
cardBackdrop.className = 'card-backdrop';
cardBackdrop.setAttribute('aria-hidden', 'true');
document.body.appendChild(cardBackdrop);

function closeAllConceptCards() {
    document.querySelectorAll('.concept-card.open').forEach(c => {
        c.classList.remove('open');
        c.setAttribute('aria-expanded', 'false');
    });
    cardBackdrop.classList.remove('active');
}

// Close on Escape key globally
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllConceptCards();
});

// ── IntersectionObserver for scroll-triggered reveals ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // fire once
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

function observeForReveal(el) {
    // Skip animation if prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('revealed');
    } else {
        revealObserver.observe(el);
    }
}

// ── Stagger helper: assign CSS transition delay ──────
function applyStagger(elements, baseDelay = 0, step = 60) {
    elements.forEach((el, i) => {
        el.style.transitionDelay = `${baseDelay + i * step}ms`;
    });
}

// ── Card hover tilt (3D perspective) ────────────────
function attachTilt(card) {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('open')) return; // no tilt when expanded
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-3px) scale(1.01) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
        card.style.perspective = '600px';
    });

    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('open')) return;
        card.style.transform = '';
        card.style.perspective = '';
    });
}

// ── Progress tracking: load/save checkbox states ────
function getCheckboxKey(phaseName, conceptName) {
    return `bm-check-${phaseName}-${conceptName}`.replace(/\s+/g, '-').toLowerCase();
}

function saveCheckbox(key, checked) {
    try { localStorage.setItem(key, checked ? '1' : '0'); } catch (e) { }
}

function loadCheckbox(key) {
    try { return localStorage.getItem(key) === '1'; } catch (e) { return false; }
}

// ── GSAP hero title split animation ─────────────────
function animateHeroTitle() {
    if (!window.gsap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const h1 = document.querySelector('h1');
    if (!h1) return;

    // Split into chars by wrapping each letter
    const text = h1.innerHTML;
    const words = text.split(/(<[^>]*>.*?<\/[^>]*>|<[^>]*>|\s+)/g);
    let wrapped = '';
    words.forEach(part => {
        if (!part) return;
        if (part.startsWith('<')) {
            // Preserve HTML tags (like <span>)
            wrapped += part;
        } else if (/^\s+$/.test(part)) {
            wrapped += part;
        } else {
            wrapped += [...part].map(ch =>
                `<span class="split-char" style="display:inline-block;will-change:transform,opacity">${ch === ' ' ? '&nbsp;' : ch}</span>`
            ).join('');
        }
    });
    h1.innerHTML = wrapped;

    gsap.from('.split-char', {
        y: 40,
        opacity: 0,
        rotationX: -90,
        stagger: 0.025,
        duration: 0.7,
        ease: 'back.out(1.5)',
        delay: 0.1,
        onComplete: () => {
            // Remove will-change after animation
            document.querySelectorAll('.split-char').forEach(el => {
                el.style.willChange = 'auto';
            });
        }
    });
}

// ── Parallax grid background on scroll ───────────────
function initParallax() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on mobile

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                document.body.style.setProperty('--parallax-y', `${y * 0.15}px`);
                // Apply to ::before via a CSS custom property trick
                document.documentElement.style.setProperty('--parallax-offset', `${y * 0.08}px`);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ── Scroll progress bar ───────────────────────────────
function initProgressBar() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                bar.style.width = pct + '%';
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ── GSAP ScrollTrigger card reveals (enhancement layer) ──
function initGSAPScrollTrigger() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Phase labels fly in from left
    gsap.utils.toArray('.phase-label').forEach(el => {
        gsap.fromTo(el,
            { x: -30, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
            }
        );
    });
}

// ── Stat counter animation ──────────────────────────
function animateStatTo(el, target) {
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = target;
        return;
    }
    const start = parseInt(el.textContent) || 0;
    const duration = 400;
    const startTime = performance.now();

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + (target - start) * eased);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ── Render roadmap ───────────────────────────────────
function renderRoadmap(filter = 'all', search = '') {
    const container = document.getElementById('roadmap-container');
    container.innerHTML = '';

    let t = 0, b = 0, m = 0, a = 0;

    roadmapPhases.forEach(phase => {
        const filtered = phase.concepts.filter(c => {
            const levelMatch = filter === 'all' || c.level === filter;
            const sq = !search || [c.name, c.desc, c.why].some(s => s.toLowerCase().includes(search));
            return levelMatch && sq;
        });

        if (!filtered.length) return;

        t += filtered.length;
        filtered.forEach(c => {
            if (c.level === 'basic') b++;
            else if (c.level === 'medium') m++;
            else if (c.level === 'advanced') a++;
        });

        // Phase heading
        const phaseEl = document.createElement('div');
        phaseEl.className = 'phase-label';
        phaseEl.innerHTML = `
            <span class="phase-num">${phase.num}</span>
            <span class="phase-title">${phase.title}</span>
            <span class="phase-timeline">${phase.timeline}</span>
        `;
        container.appendChild(phaseEl);
        observeForReveal(phaseEl);

        // Cards grid
        const grid = document.createElement('div');
        grid.className = 'phase-grid';
        grid.id = phase.id;

        filtered.forEach((c, cardIdx) => {
            const card = document.createElement('div');
            card.className = `concept-card ${c.level}`;
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-expanded', 'false');
            card.setAttribute('aria-label', `${c.name} — ${c.level} level. Click to expand.`);

            const checkKey = getCheckboxKey(phase.title, c.name);
            const isChecked = loadCheckbox(checkKey);
            if (isChecked) card.style.opacity = '0.65';

            card.innerHTML = `
                <div class="card-checkbox-wrap">
                    <input type="checkbox" class="card-checkbox" aria-label="Mark '${c.name}' as complete"
                        ${isChecked ? 'checked' : ''} tabindex="0">
                </div>
                <div class="card-level-badge">${c.level}</div>
                <div class="card-name">${c.name}</div>
                <div class="card-desc">${c.desc}</div>
                <div class="card-why"><strong style="color:var(--accent)">Why it matters:</strong> ${c.why}</div>
            `;

            // Toggle expand — spotlight mode (only one card open at a time)
            const toggle = (e) => {
                if (e.target.classList.contains('card-checkbox')) return;

                const isOpen = card.classList.contains('open');

                // Close any currently open card first
                closeAllConceptCards();

                if (!isOpen) {
                    // Open this card
                    card.classList.add('open');
                    card.setAttribute('aria-expanded', 'true');
                    card.style.transitionDelay = '0ms';
                    cardBackdrop.classList.add('active');

                    // Backdrop click closes the card
                    cardBackdrop._closeHandler = () => closeAllConceptCards();
                    cardBackdrop.addEventListener('click', cardBackdrop._closeHandler, { once: true });
                }
            };

            card.addEventListener('click', toggle);
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); }
                if (e.key === 'Escape') closeAllConceptCards();
            });

            // Checkpoint progress tracking
            const checkbox = card.querySelector('.card-checkbox');
            checkbox.addEventListener('change', (e) => {
                e.stopPropagation();
                saveCheckbox(checkKey, checkbox.checked);
                card.style.opacity = checkbox.checked ? '0.65' : '1';
            });

            // Stagger delay
            card.style.transitionDelay = `${cardIdx * 50}ms`;

            grid.appendChild(card);
            observeForReveal(card);
            attachTilt(card);
        });

        container.appendChild(grid);
    });

    if (!container.children.length) {
        container.innerHTML = '<div class="no-results">No topics match your search. Try different keywords.</div>';
    }

    // Update stats with animation
    animateStatTo(document.getElementById('stat-total'), t);
    animateStatTo(document.getElementById('stat-b'), b);
    animateStatTo(document.getElementById('stat-m'), m);
    animateStatTo(document.getElementById('stat-a'), a);

    // GSAP enhancements after DOM is built
    setTimeout(initGSAPScrollTrigger, 50);
}

// ── Render knowledge map ─────────────────────────────
function renderMap(filterLevel = 'all', search = '') {
    const container = document.getElementById('map-container');
    container.innerHTML = '';

    let t = 0, b = 0, m = 0, a = 0;

    // Create grid wrapper
    const grid = document.createElement('div');
    grid.className = 'map-grid';
    container.appendChild(grid);

    mapTopics.forEach(topic => {
        const levelMatch = filterLevel === 'all' || topic.level === filterLevel;
        const sq = !search || [topic.title, ...(topic.concepts || []), ...(topic.usecases || [])].some(s =>
            typeof s === 'string' && s.toLowerCase().includes(search)
        );
        if (!levelMatch || !sq) return;

        t++;
        if (topic.level === 'Foundation') b++;
        else if (topic.level === 'Core') m++;
        else if (topic.level === 'Advanced') a++;

        const lvClass = levelMap[topic.level] || 'lv-core';
        const slvMap = { b: 'slv-b', i: 'slv-i', a: 'slv-a' };
        const slvLabel = { b: 'B', i: 'I', a: 'A' };

        const el = document.createElement('div');
        el.className = 'topic-card';
        el.id = 't' + topic.num;
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', `Topic ${topic.num}: ${topic.title}`);

        el.innerHTML = `
            <button class="topic-header" onclick="toggleCard('t${topic.num}')"
                    aria-expanded="false" aria-controls="topic-body-${topic.num}">
                <span class="topic-num">${String(topic.num).padStart(2, '0')}</span>
                
                <span class="topic-title">${topic.title}</span>
                <span class="level-badge ${lvClass}">${topic.level}</span>
                <span class="chevron" aria-hidden="true">▼</span>
            </button>
            <div class="topic-body" id="topic-body-${topic.num}" role="region">
                <div class="sections-grid">
                    <div class="section">
                        <div class="section-label sl-concepts">◆ Core Concepts</div>
                        <ul>${(topic.concepts || []).map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                    <div class="section">
                        <div class="section-label sl-subtopics">▶ Subtopics (B→A)</div>
                        <ul>${(topic.subtopics || []).map(([l, s]) => `<li><span class="slv ${slvMap[l]}">${slvLabel[l]}</span>${s}</li>`).join('')}</ul>
                    </div>
                    <div class="section">
                        <div class="section-label sl-usecases">◈ Real-World Use Cases</div>
                        <ul>${(topic.usecases || []).map(u => `<li>${u}</li>`).join('')}</ul>
                    </div>
                    <div class="section">
                        <div class="section-label sl-principles">◉ Key Principles</div>
                        <ul>${(topic.principles || []).map(p => `<li>${p}</li>`).join('')}</ul>
                    </div>
                    <div class="section">
                        <div class="section-label sl-pitfalls">✗ Common Pitfalls</div>
                        <ul>${(topic.pitfalls || []).map(p => `<li class="pitfall-item">${p}</li>`).join('')}</ul>
                    </div>
                    <div class="section">
                        <div class="section-label sl-connections">⟳ Connects To</div>
                        <div>${(topic.connections || []).map(c => `<button class="conn-tag" onclick="jumpToTopic('${c}')" aria-label="Jump to topic: ${c}">${c}</button>`).join('')}</div>
                    </div>
                </div>
            </div>
        `;

        grid.appendChild(el);
        observeForReveal(el);
    });

    if (!grid.children.length) {
        const msg = document.createElement('div');
        msg.className = 'no-results';
        msg.textContent = 'No topics match your search.';
        container.appendChild(msg);
    }

    animateStatTo(document.getElementById('stat-total'), t);
    animateStatTo(document.getElementById('stat-b'), b);
    animateStatTo(document.getElementById('stat-m'), m);
    animateStatTo(document.getElementById('stat-a'), a);
}

// ── Toggle knowledge map card ────────────────────────
function toggleCard(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const open = el.classList.toggle('open');
    const header = el.querySelector('.topic-header');
    if (header) header.setAttribute('aria-expanded', open ? 'true' : 'false');
    updateProgress();
}

// ── Jump to topic via connection tag ─────────────────
function jumpToTopic(tag) {
    const match = tag.match(/#(\d+)/);
    if (!match) return;
    const id = 't' + match[1];

    // Switch to map view if needed
    if (window.currentView !== 'map') {
        const mapBtn = document.querySelector('[data-view="map"]');
        if (mapBtn) switchView('map', mapBtn);
    }

    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
            if (!el.classList.contains('open')) toggleCard(id);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// ── Update scroll progress indicator ─────────────────
function updateProgress() {
    const cards = document.querySelectorAll('.topic-card');
    const open = document.querySelectorAll('.topic-card.open').length;
    const total = cards.length;
    const bar = document.getElementById('progress-bar');
    if (bar && total > 0) {
        bar.style.width = ((open / total) * 100) + '%';
    }
}

// ── Exports (global for inline event handlers) ───────
window.toggleCard = toggleCard;
window.jumpToTopic = jumpToTopic;
window.renderRoadmap = renderRoadmap;
window.renderMap = renderMap;
window.animateHeroTitle = animateHeroTitle;
window.initParallax = initParallax;
window.initProgressBar = initProgressBar;
