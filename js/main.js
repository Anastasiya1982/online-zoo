/*== all elems fot modal==*/
const modal=document.querySelector('.modal');
const modalFeedback=document.querySelector('.modal-feedback');
const modalDonate=document.querySelector('.modal-donate');
const btnFeedback=document.querySelector('.feedback__btn');
const btnSubmitFeedback= document.querySelector('.feedback__btn-submit')
const closeModalBtn=document.querySelector('.close-feedback');
const closeDonateModalBtn=document.querySelector('.close-donate');
const btnDonate=document.querySelector('.footer__donate-btn');
const nextButton=document.querySelector('.footer__next-btn');
const modalPay=document.querySelector('.modal-pay');
const closePayBtn=document.querySelector('.close-pay');

const amountField = document.querySelector('input[id="amount"]');
const nameField=document.getElementById("name");
const emailField=document.getElementById("email");
const textField= document.getElementById("text");


/*burger*/
document.querySelector('.burger').addEventListener('click', function(){
    document.querySelector('.burger span').classList.toggle('active');
    document.querySelector('.header__nav').classList.toggle('clearfix');
});

/*для всех модалок*/
// function toggleModal() {
//     modal.classList.toggle("is-open");
//     console.log("click on button Feedback");
// }

function toggleScroll() {
    if (modal.classList.contains('is-open')) {
        disableScroll();// в файле отдельном функция
    } else {
        enableScroll();
    }
}


/* validation of the empty input*/
function validate(){
    if(nameField.validity.valid &&
        emailField.validity.valid &&
        textField.validity.valid
    ){
        btnSubmitFeedback.classList.remove('invalid');
    } else{
        btnSubmitFeedback.classList.add('invalid');
    }
}


/*close  modal by click on the empty area*/
document.addEventListener('click',function (e) {
    if(e.target.classList.contains("is-open")){
        e.target.classList.remove('is-open');
    }
});


/*modal feedback*/
function toggleModalFeedback() {
    modalFeedback.classList.toggle('is-open');
    toggleScroll();
}

btnFeedback.addEventListener('click',toggleModalFeedback);
closeModalBtn.addEventListener('click', toggleModalFeedback);

btnSubmitFeedback.addEventListener('click',()=>{
   if( btnSubmitFeedback.classList.contains('invalid')){
        return;
    };
    toggleModalFeedback();
});


/*validation*/
nameField.addEventListener('input',()=>{
    validate();
    console.log("valid input" )
} );

emailField.addEventListener('input',()=>{
    validate();
});
textField.addEventListener('input',()=>{
    validate();
});

/*modal donate*/
const amount = document.getElementById('amount'),
    animalsName= document.querySelector('.animals-name'),
    currency = document.querySelector('.currency'),
    donateText = document.querySelector('.donate-text'),
    donateFormButton=document.querySelector('.modal-footer__donate-btn');


btnDonate.addEventListener('click',()=>{
    modalDonate.classList.add('is-open');
});
closeDonateModalBtn.addEventListener("click", toggleModalDonate);

function toggleModalDonate() {
    modalDonate.classList.toggle('is-open');
    //убираем скролл при открытом модельном окне
   toggleScroll();
}

function validateDonateForm(){
    if(animalsName.validity.valid &&
        amount.validity.valid &&
        currency.validity.valid &&
        donateText.validity.valid
    ){
        nextButton.classList.remove('invalid');
    } else{
        nextButton.classList.add('invalid');
    }
}
amount.oninput = function () {
    if (this.value.length > 4) this.value = this.value.substr(0, 4);
    validateDonateForm();
}

currency.addEventListener('input',()=>{
    validateDonateForm();
    console.log("valid input" )
} );

donateText.addEventListener('input',()=>{
    console.log("donate text click")
    validateDonateForm();
});

animalsName.addEventListener('input',()=>{
    console.log('animals selected')
    validateDonateForm();
});

nextButton.addEventListener('click',()=>{
    if(nextButton.classList.contains('invalid')){
        return;
    } else{
        modalDonate.classList.remove('is-open');
        modalPay.classList.add('is-open');
    }
})

/*modal pay cards*/
const cardNumber = document.getElementById('cardNumber'),
    cardMM = document.getElementById('mm'),
    cardYY = document.getElementById('yy'),
    cardCvc = document.getElementById('cvc'),
    cardHolder=document.getElementById('cardholder');


 function validateCardForm(e) {
     if(cardNumber.value.length === 19 &&
        cardMM.value.length ===2 &&
        cardYY.value.length===2 &&
        cardCvc.value.length===3 &&
        cardHolder.value.length >4
     ){

         donateFormButton.classList.remove('invalid')
     }
        else {
            donateFormButton.classList.add("invalid")
        }
    }





cardNumber.addEventListener("input",function () {
    let cardCode = this.value.replace(/\D/g, '').substring(0,16);
    if(cardCode) cardCode = cardCode.match(/.{1,4}/g).join(' ')
    this.value = cardCode;
    validateCardForm();

});
cardMM.addEventListener("input",function () {
    let cardCode = this.value.replace(/\D/g, '').substring(0,2);
    this.value = cardCode;
    validateCardForm();
});
cardYY.addEventListener("input",function () {
    let cardCode = this.value.replace(/\D/g, '').substring(0,2);
    this.value = cardCode;
});
cardCvc.addEventListener("input",function () {
    let cardCode = this.value.replace(/\D/g, '').substring(0,3);
    this.value = cardCode;
    validateCardForm();
});

cardHolder.addEventListener('input',function () {
        this.value = this.value.toUpperCase ()
        this.value = this.value.replace(/^ +|[^A-Z ]/g, '').replace(/ +(\w*).*/, ' $1');
  validateCardForm();
});


function toggleModalPay() {
    modalDonate.classList.remove('is-open');
    modalPay.classList.add("is-open");
    //убираем скролл при открытом модельном окне
    toggleScroll();
}


closePayBtn.addEventListener('click',()=>{
    modalPay.classList.remove('is-open');
});


donateFormButton.addEventListener('click',()=>{
    if(donateFormButton.classList.contains('invalid')){
        return;
    } else {
        alert("Thanks for your donation!");
        modalPay.classList.remove('is-open');

    }

});

/*how-it-works carusel*/

const state = {};
const carouselList = document.querySelector('.about__slider-list');
const carouselItems = document.querySelectorAll('.about__slider-item');
const elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
    let newActive = event.target;
    console.log(newActive)
    let isItem = newActive.closest('.about__slider-item');

    if (!isItem || newActive.classList.contains('about__slider-item_active')) {
        return;
    };

    update(newActive);
});

const update = function(newActive) {
    const newActivePos = newActive.dataset.pos;
    const current = elems.find((elem) => elem.dataset.pos == 0);
    const prev = elems.find((elem) => elem.dataset.pos == -1);
    const next = elems.find((elem) => elem.dataset.pos == 1);
    const first = elems.find((elem) => elem.dataset.pos == -2);
    const last = elems.find((elem) => elem.dataset.pos == 2);

    current.classList.remove('about__slider-item_active');

    [current, prev, next, first, last].forEach(item => {
        let itemPos = item.dataset.pos;
        item.dataset.pos = getPos(itemPos, newActivePos)
    });
};

const getPos = function(current, active) {
    const diff = current - active;

    if (diff < -2) {
        return 5 + diff;
    }
    else if (diff > 2) {
        return -5 + diff;
    }

    return diff;
}




/*slider  review testimonials*/

const gap = 20;

const carousel = document.getElementById("reviews__slider"),
    content = document.querySelector(".reviews__slider-list"),
    next = document.querySelector(".reviews__slider-right"),
    prev = document.querySelector(".reviews__slider-left"),
    switchButton=document.getElementById('switch-type'),
    items=document.querySelectorAll('.reviews__slider-item');


let slideType ='all'; //all or one
let slideIndex=0;
let numberOfItems=Array.from(items).length;
console.log(numberOfItems)


// switchButton.addEventListener('click',()=>{
//     if(slideType==='all'){
//         slideType='one'
//     } else{
//         slideType="all"
//     }
// });

let width = carousel.offsetWidth;
let imageWidth=document.querySelector('.reviews__slider-item').offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));


next.addEventListener("click", e => {
    delayAutoSlice();
    slideIndex += slideType === "all" ? 4 : 1;
    //todo заменить на бесконечный слайдер

    if(slideIndex>6)slideIndex=0;
    carousel.scrollTo((imageWidth + gap)*slideIndex, 0);
  });


prev.addEventListener("click", e => {
    delayAutoSlice();
    slideIndex -=slideIndex==="all" ? 4 :1;
    // todo при замене на бесконечный соайдер- удалить
    // if(slideIndex<0)slideIndex=0;
    carousel.scrollTo((imageWidth + gap)*slideIndex, 0);
});



const sliceSlideFunc=()=>{
    slideIndex +=slideIndex==="all" ? 4 :1;
    if(slideIndex>6){
       slideIndex=0;
    }
    carousel.scrollTo((imageWidth+gap)*slideIndex,0);
}

let autoSlideInterval=setInterval(sliceSlideFunc,3000);
let autoSlideTimeout=null;

// /* по нажатию на карусель происходит задержка таймера на 3  и сброс на 0, запустится тамер заново*/
 const delayAutoSlice=()=>{
         clearTimeout(autoSlideTimeout);
         clearInterval(autoSlideInterval);
         autoSlideInterval=null;
         autoSlideTimeout=setTimeout(()=>{
             clearInterval(autoSlideInterval);
             autoSlideInterval=setInterval(sliceSlideFunc,3000);
         },3000)
 }

carousel.addEventListener('click', delayAutoSlice);




/*======= slider pets in zoo========*/

