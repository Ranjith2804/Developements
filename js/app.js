/* ═══════════════════════════════════
   js/app.js — App orchestration
   Initialises all modules after DOM ready
   ═══════════════════════════════════ */

window.currentView = 'roadmap';

// Detect if we are on the dotnet roadmap page
const isDotnetPage = typeof dotnetMapSections !== 'undefined';

function updateDotnetStatLabels(view) {
    if (!isDotnetPage) return;

    const totalItem = document.getElementById('stat-item-total');
    const bItem = document.getElementById('stat-item-b');
    const mItem = document.getElementById('stat-item-m');
    const aItem = document.getElementById('stat-item-a');
    const note = document.getElementById('dotnet-map-stat-note');
    const labels = document.querySelectorAll('.stats-row .stat-label');

    if (labels.length < 4 || !totalItem || !bItem || !mItem || !aItem) return;

    if (view === 'map') {
        labels[0].textContent = 'Phases';
        labels[1].textContent = 'Subtopics';
        totalItem.classList.remove('hidden');
        bItem.classList.remove('hidden');
        mItem.classList.add('hidden');
        aItem.classList.add('hidden');
        if (note) note.classList.remove('hidden');
    } else {
        labels[0].textContent = 'Modules';
        labels[1].textContent = 'Foundation';
        labels[2].textContent = 'Core / Medium';
        labels[3].textContent = 'Advanced';
        totalItem.classList.remove('hidden');
        bItem.classList.remove('hidden');
        mItem.classList.remove('hidden');
        aItem.classList.remove('hidden');
        if (note) note.classList.add('hidden');
    }
}

// ── View switching ───────────────────────────────────
function switchView(view, btn) {
    window.currentView = view;

    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const roadmapNav = document.getElementById('roadmap-nav');
    const mapNav     = document.getElementById('map-nav');
    const roadmapView = document.getElementById('roadmap-view');
    const mapView    = document.getElementById('map-view');

    if (view === 'roadmap') {
        roadmapView.classList.remove('hidden');
        mapView.classList.add('hidden');
        roadmapNav.classList.remove('hidden');
        mapNav.classList.add('hidden');
        updateDotnetStatLabels('roadmap');
        renderRoadmap(roadmapFilter, searchVal);
        buildTracker(roadmapPhases, 'rp');
    } else {
        mapView.classList.remove('hidden');
        roadmapView.classList.add('hidden');
        mapNav.classList.remove('hidden');
        roadmapNav.classList.add('hidden');
        updateDotnetStatLabels('map');

        // Render the appropriate map view
        if (isDotnetPage) {
            renderDotnetMap(searchVal);
            buildTracker(dotnetMapSections.map(s => ({ id: 'sc-' + s.id, title: s.label })), null, true);
        } else {
            renderMap(mapFilter, searchVal);
            buildTracker(mapTopics.map(t => ({ id: 't' + t.num, title: t.title })), null, true);
        }
    }
}

// ── Mobile hamburger menu ────────────────────────────
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar   = document.getElementById('sidebar');
    const overlay   = document.getElementById('sidebar-overlay');

    if (!hamburger || !sidebar || !overlay) return;

    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        sidebar.setAttribute('aria-hidden', 'false');
        // Trap focus — first focusable element
        const firstFocusable = sidebar.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        sidebar.setAttribute('aria-hidden', 'true');
        hamburger.focus();
    }

    hamburger.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav item click (mobile UX)
    sidebar.querySelectorAll('.nav-item, .view-btn').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
    });
}

// ── GSAP: hero title + ScrollTrigger load ────────────
function initGSAP() {
    if (!window.gsap) return;

    // Hero title split animation
    animateHeroTitle();

    // Load ScrollTrigger plugin dynamically
    if (!window.ScrollTrigger) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js';
        script.onload = () => {
            gsap.registerPlugin(ScrollTrigger);
            // Re-init scroll animations now that plugin is loaded
            initGSAPScrollTrigger && initGSAPScrollTrigger();
        };
        document.head.appendChild(script);
    }
}

// ── DOM Ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Render roadmap view
    updateDotnetStatLabels('roadmap');
    renderRoadmap(roadmapFilter, searchVal);

    // Render the appropriate map view (lazy — only built when switched to)

    // Build tracker for default (roadmap) view
    buildTracker(roadmapPhases, 'rp');

    // Wire search input
    const searchEl = document.getElementById('search');
    if (searchEl) {
        searchEl.addEventListener('input', e => {
            const query = e.target.value;
            handleSearch(query);
            // Also filter the dotnet map view if active
            if (isDotnetPage && window.currentView === 'map') {
                renderDotnetMap(query);
            }
        });
    }

    // Init modules
    initProgressBar();
    initParallax();
    initMobileMenu();

    // GSAP (after a frame, so split-text doesn't flash)
    requestAnimationFrame(() => setTimeout(initGSAP, 50));
});

// ── Exports (global for inline handlers in HTML) ─────
window.switchView  = switchView;
window.toggleTheme = toggleTheme;
window.filterRoadmap = filterRoadmap;
window.filterMap   = filterMap;
window.scrollTo2   = scrollTo2;
