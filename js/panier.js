let products = document.getElementById('products');
let totalCart = document.getElementById('cart-total-price');
let quantityInput = document.getElementsByClassName('cart-quantity-input');
let panier = JSON.parse(localStorage.getItem('panier'));
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
            <input type="button" value="-" cartId="${element.id}" cartLense="${element.lenses}" class="decrease">
            <span class="cart-quantity-input">${element.quantity}</span>
            <input type="button" value="+" cartId="${element.id}" cartLense="${element.lenses}" class="increase">
            <button id="${element.id}" class="btn btn-danger" type="button">SUPPRIMER</button>
        </div>
        </div>`;

});

updateQuantity();
totalCount();



function updateQuantity() {
    let btnMinus = document.querySelectorAll(".decrease");
    let btnPlus = document.querySelectorAll(".increase");
    let product = JSON.parse(localStorage.getItem('panier'));

    Array.from(btnMinus).forEach(btn => {
        btn.addEventListener('click', function (e) {
            const id = e.target.getAttribute('cartId');
            const lense = e.target.getAttribute('cartLense');
            console.log("ta cliqué sur - de l'element" + " " + id + " " + lense);
            product = product.map(item => {
                if (item.id == id && item.lenses == lense && item.quantity > 1) {
                    item.quantity -= 1;
                    quantityInput.innerHTML = `${item.quantity}`;
                }
                return item;
            });
            localStorage.setItem('panier', JSON.stringify(product));
            location.reload();
        });
    });

    Array.from(btnPlus).forEach(btn => {
        btn.addEventListener('click', function (e) {
            const id = e.target.getAttribute('cartId');
            const lense = e.target.getAttribute('cartLense');
            console.log("ta cliqué sur + de l'element" + " " + id + " " + lense);
            product = product.map(item => {
                if (item.id == id && item.lenses == lense && item.quantity >= 1) {
                    item.quantity += 1;
                    quantityInput.innerHTML = `${item.quantity}`;
                }
                return item;
            });
            localStorage.setItem('panier', JSON.stringify(product));
            location.reload();
        })
    })

}

// function supprimer et tableaux des boutons
function remove() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
};
remove();




// Bouton supprimer du panier
function removeCartItem(event) {
    let buttonClicked = event.target
    let id = buttonClicked.getAttribute('id');
    console.log(id);
    // récuperer l'index de l'objet via son ID
    let removeIndex = panier.map(function (item) { return item.id; }).indexOf(id);
    // supprimer l'objet
    panier.splice(removeIndex, 1);

    localStorage.clear();
    localStorage.setItem('panier', JSON.stringify(panier));
    buttonClicked.parentElement.parentElement.remove();
    totalCount();
};





// Prix total du panier;
function totalCount() {
    let total = 0;
    for (let i in panier) {
        total += panier[i].price * panier[i].quantity;
    }
    console.log(total);

    totalCart.textContent = total / 100 + ',00 €';
}





// Formulaire remplit et envoyé
document.forms["commande"].addEventListener("submit", function (e) {
    e.preventDefault();
    alert("formulaire validé!");

    // var erreur;

    // var inputs = this;

    // for (var i = 0; i < inputs.length; i++) {
    //     if (!inputs[i].value) {
    //         erreur = "Veuillez renseigner tout les champs";
    //     }
    // }

    // if (erreur) {
    //     e.preventDefault();
    //     document.getElementById('erreur').innerHTML = erreur;
    //     return false;
    // } else {
    //     alert('Formulaire validé !');
    // }
})



