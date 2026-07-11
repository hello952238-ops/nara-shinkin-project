document.addEventListener('DOMContentLoaded', function() {
    const popup = document.querySelector('.gallery_popup');
    const popupImage = popup.querySelector('figure img');
    const closeButton = popup.querySelector('.gallery_popup_close');
    const photoButtons = document.querySelectorAll('.photo_gallery_list button');
    let activeButton = null;

    function openPopup(button) {
        activeButton = button;
        popupImage.src = button.dataset.photo;
        popupImage.alt = button.querySelector('img').alt + 'の拡大写真';
        popup.hidden = false;
        document.body.classList.add('is-gallery-popup-open');
        closeButton.focus();
    }

    function closePopup() {
        popup.hidden = true;
        document.body.classList.remove('is-gallery-popup-open');
        if (activeButton) activeButton.focus();
    }

    photoButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            openPopup(button);
        });
    });

    closeButton.addEventListener('click', closePopup);

    popup.addEventListener('click', function(event) {
        if (event.target === popup) closePopup();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !popup.hidden) closePopup();
    });
});
