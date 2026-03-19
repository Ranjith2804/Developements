/* ═══════════════════════════════════
   js/theme.js — Theme management
   ═══════════════════════════════════ */

// Immediately apply saved theme (runs before DOM paint to avoid flash)
(function () {
    const saved = localStorage.getItem('bm-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
})();

function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bm-theme', next);
}
