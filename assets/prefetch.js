// Fetch a same-site page when its link is hovered or touched, so the click finds it
// in the cache. Browsers with speculation rules prerender it instead (see base.shtml).
{
    const seen = new Set([location.pathname]);
    const prefetch = (event) => {
        const a = event.target.closest && event.target.closest('a[href]');
        if (!a || a.origin !== location.origin || seen.has(a.pathname) || a.pathname.endsWith('.xml')) return;
        seen.add(a.pathname);
        const link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
            link.rel = 'prefetch';
            link.href = a.href;
            document.head.append(link);
        } else {
            fetch(a.href); // Safari has no rel=prefetch
        }
    };
    if (!(HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules'))) {
        addEventListener('pointerover', prefetch, { passive: true });
        addEventListener('touchstart', prefetch, { passive: true });
    }
}
