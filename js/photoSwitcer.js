'use strict';

const imgWrapper = document.querySelector('.product__img--wrapper')
const thumbnails = document.querySelector('.thumbnails');
const ul         = thumbnails.querySelector('ul');

thumbnails.addEventListener('click', function(e){
    
    if(e.target.classList.contains('thumbnail__img')) {

        let clickedImg   = e.target.getAttribute('data');
        let folder       = e.target.getAttribute('data-folder');
        let currentImg   = imgWrapper.firstChild.getAttribute('data');
        let productImg   = document.createElement('img');
        let thumbnail    = document.createElement('li');
        let thumbnailImg = document.createElement('img');

        imgWrapper.removeChild(imgWrapper.firstChild);
        ul.removeChild(e.target.parentNode);

        productImg.classList.add('product__img');
        productImg.setAttribute('src', '../img/' + folder + '/' + clickedImg + '.png');
        productImg.setAttribute('data', clickedImg);
        productImg.setAttribute('data-folder', folder);
        productImg.setAttribute('alt', 'converse');

        imgWrapper.appendChild(productImg);

        thumbnail.classList.add('thumbnail');
        thumbnailImg.classList.add('thumbnail__img');
        thumbnailImg.setAttribute('src', '../img/' + folder + '/' + currentImg + '.png');
        thumbnailImg.setAttribute('data', currentImg);
        thumbnailImg.setAttribute('data-folder', folder);
        thumbnailImg.setAttribute('alt', 'converse');

        thumbnail.appendChild(thumbnailImg);
        ul.appendChild(thumbnail);

        checkIfIE();
    }
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
    const img        = document.querySelector('.product__img');
    const imgWrapper = document.querySelector('.product__img--wrapper');

    let wrapperWidth = imgWrapper.getBoundingClientRect().width;
    let wrapperHeight = imgWrapper.getBoundingClientRect().height;
    
    let imgWidth  = img.getBoundingClientRect().width;
    let imgHeight = img.getBoundingClientRect().height;

    imgWrapper.classList.add('product__img--wrapper--horizontal');

    if ((imgWidth / imgHeight) > (wrapperWidth / wrapperHeight)) {

        img.style.width  = imgWrapper.getBoundingClientRect().width - 2 + 'px';
        img.style.height = 'auto';
    
    } else {

        img.style.height = imgWrapper.getBoundingClientRect().height - 2 + 'px';
        img.style.width  = 'auto';

    }
}