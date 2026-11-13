// Highlight the section being read in the right pane's contents list.
const toc = document.querySelector('.toc');
const list = toc.querySelector(':scope > ul');
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
    // when the contents list scrolls, keep the active link in its middle
    const r = active.getBoundingClientRect(), t = list.getBoundingClientRect();
    list.scrollTop += (r.top + r.bottom) / 2 - (t.top + t.bottom) / 2;
}

// Reading progress above the contents: how much of the post has been read,
// and an estimate of the reading time at about 230 words per minute.
const post = document.querySelector('.post');
const progress = document.querySelector('.read-progress');
const fill = progress.querySelector('.read-progress-fill');
const pct = progress.querySelector('.read-progress-pct');
const words = post.textContent.trim().split(/\s+/).length;
progress.querySelector('.read-progress-time').textContent =
    `${Math.max(1, Math.round(words / 230))} min read`;
progress.hidden = false;

function updateProgress() {
    // 0% when the post's top reaches the top of the viewport,
    // 100% when its bottom reaches the bottom
    const r = post.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    const f = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
    const n = Math.round(f * 100);
    fill.style.setProperty('--progress', `${n}%`);
    pct.textContent = `${String(n).padStart(2, '0')}%`;
}

let queued = false;
function update() {
    queued = false;
    highlight();
    updateProgress();
}
function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
}
window.addEventListener('scroll', queue, { passive: true });
window.addEventListener('resize', queue);
update();
