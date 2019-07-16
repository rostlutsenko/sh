'use strict';

const categories = document.querySelector('.categories');

categories.addEventListener('click', function(e){

    if (e.target.classList.contains('name') || 
        e.target.classList.contains('price') ||
        e.target.classList.contains('category__img'))

        window.location.href = 'product-details-' + e.target.getAttribute('data-name') + '.html';

});

// simulate object-fit: contain in IE

checkIfIE();

function checkIfIE() {

    let ua   = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        simulateObFit();
        window.addEventListener('resize', simulateObFit);
    }
    return false;
}

function simulateObFit() {
    const categorires = document.querySelector('.categories');
    const img         = categorires.querySelectorAll('img');
    const imgWrapper  = categorires.querySelectorAll('.category__img--wrapper');

    for (let i = 0; i < img.length; i++) {

        let wrapperWidth = imgWrapper[i].getBoundingClientRect().width;
        let wrapperHeight = imgWrapper[i].getBoundingClientRect().height;
        
        let imgWidth  = img[i].getBoundingClientRect().width;
        let imgHeight = img[i].getBoundingClientRect().height;

        if ((imgWidth / imgHeight) > (wrapperWidth / wrapperHeight)) {

            img[i].style.width  = imgWrapper[i].getBoundingClientRect().width - 2 + 'px';
            img[i].style.height = 'auto';
            img[i].classList.add('category__img--vertical')
        
        } else {

            img[i].style.height  = imgWrapper[i].getBoundingClientRect().height - 2 + 'px';
            img[i].style.width = 'auto';
            img[i].classList.add('category__img--horizontal')

        }
    }
}