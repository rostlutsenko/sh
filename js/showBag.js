'use strict';

let products = [];

if (localStorage['poltavarost']) {
    if (JSON.parse(localStorage['poltavarost']).length > 0) {
        products = JSON.parse(localStorage['poltavarost']);
        showOrders(products);
    }
}

function showOrders(array) {
    const orderItemsList = document.querySelector('.order-items__list');
    const subtotal       = document.querySelector('.subtotal');
    const amount         = document.querySelector('.amount');
    let amountValue      = 0;
    let subtotalValue    = 0;

    while (orderItemsList.firstChild)
        orderItemsList.removeChild(orderItemsList.firstChild);

    array.forEach(function(elem, index){

        const orderCard    = document.createElement('li');
        const orderDetails = document.createElement('div');
        const orderPrice   = document.createElement('p');
        const orderImgWrapper = document.createElement('div');
        const orderLink    = document.createElement('a');
        const orderImg     = document.createElement('img');
        const orderText    = document.createElement('div');
        const description  = document.createElement('div');
        const h4           = document.createElement('h4');
        const ref          = document.createElement('p');
        const orderColor   = document.createElement('p');
        const orderSize    = document.createElement('p');
        const input        = document.createElement('input');
        const remove       = document.createElement('span');

        orderCard.classList.add('order-card');
        orderDetails.classList.add('order__details');
        orderImgWrapper.classList.add('order__img--wrapper');
        orderImg.classList.add('order__img');
        orderImg.setAttribute('src', '../img/' + elem.productName + '/shot1.png');
        orderLink.setAttribute('href', 'product-details-' + elem.productName.replace(/_/g, '-') + '.html');
        orderText.classList.add('order__text');
        description.classList.add('description');
        ref.classList.add('ref');
        orderColor.classList.add('order__color');
        orderSize.classList.add('order__size');
        input.setAttribute('type', 'number');
        input.setAttribute('value', elem.amount);
        input.setAttribute('data-price', elem.productPrice);
        input.setAttribute('data-index', index);
        input.setAttribute('min', 1);
        input.setAttribute('max', 50);
        remove.classList.add('remove');
        remove.setAttribute('data-index', index);
        remove.addEventListener('click', showPopup);

        orderPrice.classList.add('order__price');
        orderPrice.setAttribute('data-index', index);

        input.addEventListener('change', changeAmount);

        if(elem.productName.replace(/_/g, ' ').toUpperCase() === 'NULL')
            h4.innerText = 'TheSololist';
        else
            h4.innerText = elem.productName.replace(/_/g, ' ').toUpperCase();
        
        ref.innerText = 'Ref 13515/234';
        orderColor.innerText = elem.productColor;
        orderSize.innerText  = elem.productSize.toUpperCase();
        orderPrice.innerText = (elem.productPrice * elem.amount).toFixed(2);

        subtotalValue += elem.productPrice * elem.amount;

        description.appendChild(h4);
        description.appendChild(ref);

        orderLink.appendChild(orderImg);
        orderImgWrapper.appendChild(orderLink);
        orderText.appendChild(description);
        orderText.appendChild(orderColor);
        orderText.appendChild(orderSize);
        orderText.appendChild(input);

        orderDetails.appendChild(orderImgWrapper);
        orderDetails.appendChild(orderText);

        orderCard.appendChild(orderDetails);
        orderCard.appendChild(orderPrice);
        orderCard.appendChild(remove);

        orderItemsList.appendChild(orderCard);
        amountValue += elem.amount;
    });

    amount.innerText = amountValue;
    subtotal.innerText = subtotalValue.toFixed(2);
}


function changeAmount(e) {

    const subtotal       = document.querySelector('.subtotal');
    const amount         = document.querySelector('.amount');
    const currentIndex   = parseInt(e.target.getAttribute('data-index'));
    const orderPrice     = document.querySelector('.order__price[data-index="' + currentIndex + '"]');
    let newSubtotalValue = 0;
    let amountValue      = 0;

    if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 0) {

        let alert       = document.createElement('div');
        let alertHeader = document.createElement('h4');

        alert.classList.add('alert');
        alertHeader.classList.add('alert__header');
        alertHeader.innerText = 'Enter a valid quantity!';
        alert.appendChild(alertHeader);
        document.body.appendChild(alert);

        setTimeout(function(){
            document.body.removeChild(alert);
        }, 5000);

        e.target.value = 1;
    }

    let newPrice = parseInt(e.target.value) * parseFloat(e.target.getAttribute('data-price'));

    orderPrice.innerText = newPrice.toFixed(2);
    products[currentIndex].amount       = parseInt(e.target.value);
    products[currentIndex].productPrice = parseFloat(e.target.getAttribute('data-price'));

    localStorage['poltavarost'] = JSON.stringify(products);

    products.forEach(function(elem){
        newSubtotalValue += elem.productPrice * elem.amount;
        amountValue += elem.amount;
    });
    subtotal.innerText = newSubtotalValue.toFixed(2);
    amount.innerText   = amountValue;
}

function showPopup(e) {
    const currentIndex = e.target.getAttribute('data-index');
    const popupWrapper = document.querySelector('.popup--wrapper');
    const btnDelete    = document.querySelector('.btn--delete');

    popupWrapper.classList.remove('d-none');
    btnDelete.setAttribute('data-index', currentIndex);

}

const popup = document.querySelector('.popup');

popup.addEventListener('click', function(e){
    if (e.target.classList.contains('btn--delete'))
        removeItem(parseInt(e.target.getAttribute('data-index')));
    else {
        const popupWrapper = document.querySelector('.popup--wrapper');
        popupWrapper.classList.add('d-none');
    }
});

function removeItem(currentIndex) {
    const popupWrapper = document.querySelector('.popup--wrapper');
    
    products.splice(currentIndex, 1);
    showOrders(products);
    localStorage['poltavarost'] = JSON.stringify(products);

    popupWrapper.classList.add('d-none');
}

const order = document.querySelector('.order');

order.addEventListener('click', submitOrder);

function submitOrder() {
    localStorage['poltavarost'] = '';
    window.location.href = 'thank-you.html';
}