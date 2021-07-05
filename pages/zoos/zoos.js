
const btnsOpenInfo=document.querySelectorAll('.animal__info-item__button');
const sidebarButton=document.querySelector('.sidebar-btn');
const iframe=document.querySelector('iframe');
const littleImg= document.querySelectorAll('.animal__preview-item');
const payButton=document.querySelector('.pay-btn');
// console.log(payButton);
// const visualBlock=document.querySelector('.animal__preview-list');




// function changeIframeLink(){
//        let newSrc=this.getAttribute('data-video');
//     console.log(newSrc)
//        let prevSrc=iframe.src;
//        iframe.src=newSrc;
//     console.log(iframe.src);
//        this.setAttribute('data-video',newSrc);
//     };





let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("animal__preview-item-video");
let  slideIndex = 1;
let currentImgSrc;

showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);

}

function showSlides(n) {
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}


document.addEventListener('click', function (e) {
        let item = e.target;
        let id = item.getAttribute('id');
// console.log(id);
         currentImgSrc=item.getAttribute('src');
        console.log(currentImgSrc);
             currentSlide(id);

    }
);

const videoList = document.querySelectorAll('.animal__preview-item');
let slideInterval = setInterval(changeVideos, 4000);

// videoList.forEach(video => {
//     video.addEventListener('click', () => {
//         clearInterval(slideInterval);
//         const currentPos = video.getAttribute('data-pos');
//         updatePos(currentPos, video);
//         slideInterval = setInterval(changeVideos, 4000);
//     });
// });
//
// function updatePos(currentPos, targetVideo) {
//     const activeVideo = document.querySelector('[data-pos="0"]');
//     activeVideo.setAttribute('data-pos', currentPos);
//     targetVideo.setAttribute('data-pos', 0);
// };

function changeVideos() {
    let sliderList = [...videoList].filter(video => video.getAttribute('data-pos') != 0);
    sliderList.forEach(video => {
        const currentPos = video.getAttribute('data-pos');
        console.log(currentPos)
        if (currentPos > 1) {
            video.setAttribute('data-pos', currentPos - 1);
        } else {
            video.setAttribute('data-pos', sliderList.length);
        }
    });
};

/*======block open information==========*/


btnsOpenInfo.forEach(function (btn) {
    btn.addEventListener('click',function(e){
        let button=e.target;
        button.classList.toggle('up')
         let item=e.target.closest('.animal__info-item');
         item.classList.toggle('active');
    })
});

sidebarButton.addEventListener('click', function (e) {
    let toolbar=document.querySelector('.toolbar');
    toolbar.classList.toggle('is-open');

});


/*========modal donat===*/
const closeDonateModalBtn=document.querySelector('.close-donate');
payButton.addEventListener('click',()=>{
    modalDonate.classList.add('is-open');
});
closeDonateModalBtn.addEventListener("click", toggleModalDonate);

function toggleModalDonate() {
    modalDonate.classList.toggle('is-open');
    //убираем скролл при открытом модельном окне
    toggleScroll();
};




