// Highlight the section being read in the right pane's contents list.
const toc = document.querySelector('.toc');
const pane = toc.closest('.pane-inner');
const links = [...toc.querySelectorAll('a[href^="#"]')];
const headings = links.map(a => document.getElementById(decodeURIComponent(a.hash.slice(1))));

let active = null;
function highlight() {
    // the current section is the last heading above the top quarter of the viewport
    let current = null;
    const line = window.innerHeight / 4;
    headings.forEach((h, i) => {
        if (h && h.getBoundingClientRect().top <= line) current = links[i];
    });
    if (current === active) return;
    if (active) active.classList.remove('active');
    active = current;
    if (!active) return;
    active.classList.add('active');
    // when the pane itself scrolls, keep the active link in its middle
    const r = active.getBoundingClientRect(), t = pane.getBoundingClientRect();
    pane.scrollTop += (r.top + r.bottom) / 2 - (t.top + t.bottom) / 2;
}

let queued = false;
window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; highlight(); });
}, { passive: true });
highlight();
