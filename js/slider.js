'use strict';

const stripWrapper = document.querySelector('.strip--wrapper');
const strip        = document.querySelector('.strip');
const leftBtn      = document.querySelector('.btn-left');
const rightBtn     = document.querySelector('.btn-right');
let moveValue      = 0;
   
leftBtn.addEventListener('click', function(){moveStrip('left')})
rightBtn.addEventListener('click', function(){moveStrip('right')})

function moveStrip(toggle) {

    let rightStop = strip.childElementCount * 200 - stripWrapper.getBoundingClientRect().width;
    let lastMove = stripWrapper.getBoundingClientRect().width % 200;
    
    if (toggle === 'left' && moveValue !== 0) {
        moveValue += 200;
        strip.style.transform = 'translateX(' + moveValue + 'px)';

    }
    else if(toggle === 'right') {
        moveValue -= 200;
        if (moveValue < -(rightStop - lastMove)) {
            strip.style.transform = 'translateX(' + -rightStop + 'px)';
            moveValue += 200;
            return   
        }
        strip.style.transform = 'translateX(' + moveValue + 'px)';
    }
}