(function() {
    'use strict';
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 0 : 1400;

    function render(el, value) {
        const raw = el.dataset.value;
        const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
        const parts = Number(value).toFixed(decimals).split('.');
        el.textContent = parts[0];
        if (decimals) {
            const span = document.createElement('span');
            span.className = 'data_decimal';
            span.textContent = `.${parts[1]}`;
            el.appendChild(span);
        }
    }

    function count(el) {
        const target = Number(el.dataset.value);
        if (!duration) return render(el, target);
        const start = performance.now();
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            render(el, target * (1 - Math.pow(1 - progress, 3)));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    function animateDonut(el) {
        const target = Number(el.dataset.value);
        if (!duration) return;
        const start = performance.now();
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const reveal = 360 * (1 - Math.pow(1 - progress, 3));
            if (target < 100) {
                const green = Math.min(target * 3.6, reveal);
                el.style.background = `conic-gradient(#58a13e 0 ${green}deg, #ffe653 ${green}deg ${reveal}deg, #fff ${reveal}deg 360deg)`;
            } else {
                el.style.background = `conic-gradient(#ffe653 0 ${reveal}deg, #fff ${reveal}deg 360deg)`;
            }
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else if (target === 100) {
                el.style.background = '#ffe653';
            }
        };
        requestAnimationFrame(tick);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.classList.add('data-animation-ready');
        document.querySelectorAll('.data_number[data-value]').forEach(el => render(el, 0));
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const target = entry.target;
            target.querySelectorAll('.data_number[data-value]').forEach(count);
            target.querySelectorAll('.chart_bar').forEach((bar, i) => {
                bar.style.transitionDelay = `${i * 100}ms`;
                bar.classList.add('is-animated');
            });
            target.querySelectorAll('.donut_chart[data-value]').forEach(animateDonut);
            if (target.classList.contains('shop_map')) {
                Array.from(target.querySelectorAll('.map_pin')).sort(() => Math.random() - 0.5).forEach((pin, i) => {
                    pin.style.transitionDelay = `${250 + i * 70}ms`;
                    pin.classList.add('is-animated');
                });
            }
            observer.unobserve(target);
        }), { threshold: 0.25 });
        document.querySelectorAll('.data_card, .shop_map').forEach(el => observer.observe(el));
    });
})();
