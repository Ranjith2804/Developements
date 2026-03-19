/* ═══════════════════════════════════
   js/tracker.js — Side scroll tracker
   ═══════════════════════════════════ */

function buildTracker(items, prefix = null, isMap = false) {
    const tracker = document.getElementById('tracker');
    tracker.innerHTML = '';

    const targets = items.map(item => {
        const id = prefix ? prefix + (item.num || item.id?.replace(prefix, '')) : '' + item.id;
        return document.getElementById(id);
    }).filter(Boolean);

    targets.forEach((el, i) => {
        const dot = document.createElement('button');
        dot.className = 'tracker-dot';
        dot.setAttribute('aria-label', `Jump to: ${items[i]?.title || ''}`);
        dot.title = items[i]?.title || '';
        dot.addEventListener('click', () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        tracker.appendChild(dot);
    });

    const dots = tracker.querySelectorAll('.tracker-dot');
    if (!dots.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const idx = targets.indexOf(e.target);
                dots.forEach((d, j) => d.classList.toggle('active', idx === j));
            }
        });
    }, { threshold: 0.2 });

    targets.forEach(e => { if (e) obs.observe(e); });
}
