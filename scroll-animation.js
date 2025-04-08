document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.pop-up-element');

    function checkPosition() {
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('pop-up');
            }
        });
    }

    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Initial check
});