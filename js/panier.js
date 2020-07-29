
const products = document.getElementById('products');
const totalCart = document.getElementById('cart-total-price');
const panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);



panier.forEach(element => {
    console.log(element);

    products.innerHTML += `<div class="cart-product">
    <div class="cart-item cart-column">
            <span class="cart-item-name">${element.name}</span>
        </div>
        <span class="cart-lenses cart-column">${element.lenses}</span>
        <span class="cart-price cart-column">${element.price / 100},00 €</span>
        <div class="cart-quantity cart-column">
            <input type="button" value="-" id="moins">
            <input type="text" class="cart-quantity-input count" size="8" value="${element.quantity}">
            <input type="button" value="+" id="plus">
            <button id="${element.id}" class="btn btn-danger" type="button">SUPPRIMER</button>
        </div>
        </div>`;

    actionCart();
    totalCount();

});

// action sur le panier
function actionCart() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
};


// Bouton supprimer du panier
function removeCartItem(event) {
    let buttonClicked = event.target
    let id = buttonClicked.getAttribute('id');
    // get index of object with id:37
    let removeIndex = panier.map(function (item) { return item.id; }).indexOf(id);
    // remove object
    panier.splice(removeIndex, 1);

    localStorage.clear();
    localStorage.setItem('panier', JSON.stringify(panier));
    buttonClicked.parentElement.parentElement.remove();
    totalCount();
};


// Bouton moins 
function minus() {
    console.log('click sur -');
}

let btnMinus = document.getElementById('moins');
btnMinus.addEventListener('click', minus);


// Bouton plus 
function plus() {
    console.log('clic sur +');
}

let btnPlus = document.getElementById('plus')
btnPlus.addEventListener('click', plus);



// Prix total du panier
function totalCount() {
    let total = 0;
    for (let i in panier) {
        total += panier[i].price * panier[i].quantity;
    }

    totalCart.textContent = total / 100 + ',00 €';
}


// Formulaire remplit et envoyé
document.forms["commande"].addEventListener("submit", function (e) {


    var erreur;

    // var inputs = this;

    // for (var i = 0; i < inputs.length; i++) {
    //     if (!inputs[i].value) {
    //         erreur = "Veuillez renseigner tout les champs";
    //     }
    // }

    if (erreur) {
        e.preventDefault();
        document.getElementById('erreur').innerHTML = erreur;
        return false;
    } else {
        alert('Formulaire envoyé !');
    }
})



