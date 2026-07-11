document.addEventListener('DOMContentLoaded', function() {
    const tabs = Array.from(document.querySelectorAll('.tab_list [role="tab"]'));
    const panels = Array.from(document.querySelectorAll('.tab_panel'));

    function activateTab(tab) {
        tabs.forEach(function(item) {
            const selected = item === tab;
            item.setAttribute('aria-selected', selected ? 'true' : 'false');
            item.tabIndex = selected ? 0 : -1;
        });

        panels.forEach(function(panel) {
            const selected = panel.id === tab.getAttribute('aria-controls');
            panel.hidden = !selected;
            panel.classList.remove('is-fading-in');
            if (selected) {
                void panel.offsetWidth;
                panel.classList.add('is-fading-in');
            }
        });
    }

    tabs.forEach(function(tab, index) {
        tab.addEventListener('click', function() {
            activateTab(tab);
        });

        tab.addEventListener('keydown', function(event) {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextTab = tabs[(index + direction + tabs.length) % tabs.length];
            activateTab(nextTab);
            nextTab.focus();
        });
    });

    document.querySelectorAll('.faq_answer').forEach(function(answer) {
        const inner = document.createElement('div');
        const content = document.createElement('div');
        inner.className = 'faq_answer_inner';
        content.className = 'faq_answer_content';
        while (answer.firstChild) content.appendChild(answer.firstChild);
        inner.appendChild(content);
        answer.appendChild(inner);
        answer.hidden = false;
        answer.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.faq_item button').forEach(function(button) {
        button.addEventListener('click', function() {
            const answer = document.getElementById(button.getAttribute('aria-controls'));
            const expanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            answer.classList.toggle('is-open', !expanded);
            answer.setAttribute('aria-hidden', expanded ? 'true' : 'false');
        });
    });
});
