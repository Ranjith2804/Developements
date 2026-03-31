/* ═══════════════════════════════════
   js/search.js — Search & filter logic
   ═══════════════════════════════════ */

let searchVal = '';
let roadmapFilter = 'all';
let mapFilter = 'all';

// Debounce helper — waits until user stops typing
function debounce(fn, delay = 250) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

const handleSearch = debounce(function (val) {
    searchVal = val.toLowerCase().trim();
    if (window.currentView === 'roadmap') renderRoadmap(roadmapFilter, searchVal);
    else renderMap(mapFilter, searchVal);
});

function filterRoadmap(f, btn) {
    roadmapFilter = f;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderRoadmap(f, searchVal);
}

function filterMap(f, btn) {
    mapFilter = f;
    document.querySelectorAll('[data-filter2]').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderMap(f, searchVal);
}

function scrollTo2(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // In the knowledge map, sidebar clicks are more useful as "open this card"
    // actions because the collapsed cards already fit on screen.
    if (el.classList.contains('topic-card')) {
        const isOpen = el.classList.contains('open');

        if (typeof toggleCard === 'function') {
            toggleCard(id);
        }

        if (!isOpen) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const header = el.querySelector('.topic-header');
            if (header) header.focus({ preventScroll: true });
        }

        return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
