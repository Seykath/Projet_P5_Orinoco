

let products = document.getElementById('products');
let totalCart = document.getElementById('cart-total-price');
let quantityInput = document.getElementsByClassName('cart-quantity-input');
let total = 0;
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);


// if (panier == null || panier.length == 0) {
//     document.getElementById('content-section').style.visibility = 'hidden';
//     document.getElementById('formulaire-validation').style.visibility = 'hidden';
//     let empty = document.getElementById('empty-cart');

//     empty.innerHTML += `<h3 id="empty-text">Votre panier est vide...</h3>`;

// };

panier.forEach(element => {
    console.log(element);

    products.innerHTML += `<div class="cart-product">
    <div class="cart-item cart-column">
            <span class="cart-item-name">${element.name}</span>
        </div>
        <span class="cart-lenses cart-column">${element.lenses}</span>
        <span class="cart-price cart-column">${element.price * element.quantity / 100},00 €</span>
        <div class="cart-quantity cart-column">
            <input type="button" value="-" cartId="${element.id}" cartLense="${element.lenses}" class="decrease">
            <span class="cart-quantity-input">${element.quantity}</span>
            <input type="button" value="+" cartId="${element.id}" cartLense="${element.lenses}" class="increase">
            <button id="${element.id}" class="btn btn-danger btn-X" type="button">X</button>
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
    location.reload();
    totalCount();
};



// Prix total du panier;
function totalCount() {
    for (let i in panier) {
        total += panier[i].price * panier[i].quantity;
    }
    console.log(total);

    totalCart.textContent = total / 100 + ',00 €';
}



const url = 'http://localhost:3000/api/cameras/order';

form();

function sendData(url, order) {

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(order)

    }).then(function (response) {
        return response.json();

    }).then(function (data) {
        localStorage.setItem('commande', JSON.stringify(data));
        document.location = '../commande.html';
        alert('Votre commande à bien été validée !')

    }).catch(function (error) {
        console.log("Erreur", error);
    })
};

function form() {

    if (panier == null || panier.length == 0) {

        let disableBtn = document.querySelector('#btn-validation');
        disableBtn.setAttribute('disabled', "");

    } else {

        let disableBtn = document.querySelector('#btn-validation');
        disableBtn.removeAttribute('disabled', "");


        document.forms["commande"].addEventListener("submit", function (e) {
            e.preventDefault();

            let products = [];

            for (i = 0; i < panier.length; i++) {
                let productId = panier[i].id;
                products.push(productId);
            }

            let valueForm = new FormData(document.getElementById('formulaire-validation'));
            let contact = {
                firstName: valueForm.get('firstName'),
                lastName: valueForm.get('lastName'),
                address: valueForm.get('address'),
                zip: valueForm.get('zip'),
                city: valueForm.get('city'),
                email: valueForm.get('email'),
            };
            console.log(contact); // récupération des informations du formulaire sous forme d'objet
            console.log(products); // récupération des Id des différents produits sous forme de tableau

            const cart = { contact, products };
            console.log('cart', cart); // lecture de la paire clé/valeurs dans la console.
            sendData(url, cart);
            console.log(url, cart);
        })
    };
};



