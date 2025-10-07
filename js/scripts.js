function smoothScrollTo(targetElement, duration = 2000) { // 2 секунды по умолчанию
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // easing function - делает начало и конец плавнее
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const run = startPosition + distance * easeInOutCubic(progress);
        
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Использование
document.addEventListener('DOMContentLoaded', function() {
    const link = document.querySelector('button.general-button');
    
    if (link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const formSection = document.getElementById('form');
            if (formSection) {
                smoothScrollTo(formSection, 2000); // 2.5 секунды
            }
        });
    }
});