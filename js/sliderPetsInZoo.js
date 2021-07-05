let slides = document.querySelectorAll('.pets__slider .pets__slider-list');
let currentSlide = 0;
let isEnabled = true;
console.log(slides)

function changeCurrentItem(n) {
    currentSlide = (n + slides.length) % slides.length;
}

function hideItem(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('activeSlide', direction);
    });
}

function showItem(direction) {
    slides[currentSlide].classList.add('nextSlide', direction);
    slides[currentSlide].addEventListener('animationend', function() {
        this.classList.remove('nextSlide', direction);
        this.classList.add('activeSlide');
        isEnabled = true;
    });
}

function nextItem(n) {
    hideItem('to-right');
    changeCurrentItem(n + 1);
    showItem('from-left');
}

function previousItem(n) {
    hideItem('to-left');
    changeCurrentItem(n - 1);
    showItem('from-right');
}

document.querySelector('.pets__slider-left__btn').addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentSlide);
    }
});

document.querySelector('.pets__slider-right__btn').addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentSlide);
    }
});

