
const products = document.getElementById('products');
const totalCart = document.getElementById('cart-total-price');
const panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);



panier.forEach(element => {
    console.log(element);

    products.innerHTML += `<div class="parent">
    <div class="cart-item cart-column">
            <span class="cart-item-name">${element.name}</span>
        </div>
        <span class="cart-lenses cart-column">${element.lenses}</span>
        <span class="cart-price cart-column">${element.price / 100},00 €</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${element.quantity}">
            <button id="${element.id}" class="btn btn-danger" type="button">SUPPRIMER</button>
        </div>
        </div>`




    totalCart.textContent = element.price / 100 * element.quantity + ',00 €';

});

function removeLine() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
};

function removeCartItem(event) {
    let buttonClicked = event.target
    let id = buttonClicked.getAttribute('id');
    // get index of object with id:37
    var removeIndex = panier.map(function (item) { return item.id; }).indexOf(id);
    // remove object
    panier.splice(removeIndex, 1);

    localStorage.clear();
    localStorage.setItem('panier', JSON.stringify(panier));
    buttonClicked.parentElement.parentElement.remove();
};


removeLine();








