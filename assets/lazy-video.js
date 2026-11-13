// The build sets preload="none" on videos so they cost nothing at page load. Fetch the
// metadata and first frame once a video is within a screen of the viewport.
{
    const near = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            near.unobserve(entry.target);
            entry.target.preload = 'metadata';
            entry.target.load(); // restart loading with the new preload value
        }
    }, { rootMargin: '100% 0px' });
    document.querySelectorAll('video[preload="none"]').forEach((video) => near.observe(video));
}
