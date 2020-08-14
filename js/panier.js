
let products = document.getElementById('products');
let totalCart = document.getElementById('cart-total-price');
let quantityInput = document.getElementsByClassName('cart-quantity-input');
let total = 0;
let panier = JSON.parse(localStorage.getItem('panier'));
console.log(panier);


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


// function de mise à jour de la quantité
function updateQuantity() {
    let btnMinus = document.querySelectorAll(".decrease");
    let btnPlus = document.querySelectorAll(".increase");
    let product = JSON.parse(localStorage.getItem('panier'));


    // diminution de la quantité via le bouton ' - '
    Array.from(btnMinus).forEach(btn => {
        btn.addEventListener('click', function (e) {
            const id = e.target.getAttribute('cartId');
            const lense = e.target.getAttribute('cartLense');

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


    // augmentation de la quantité via le bouton ' + '
    Array.from(btnPlus).forEach(btn => {
        btn.addEventListener('click', function (e) {
            const id = e.target.getAttribute('cartId');
            const lense = e.target.getAttribute('cartLense');
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


// tableau des boutons ' X ' + appel de la function de suppression du produit lors de l'activation du bouton
function remove() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
};
remove();


//  function de suppression sur l'élement cliqué
function removeCartItem(event) {
    let buttonClicked = event.target
    let id = buttonClicked.getAttribute('id');
    console.log(id);

    // récuperer l'index de l'objet via son ID
    let removeIndex = panier.map(function (item) { return item.id; }).indexOf(id);

    // supprimer l'objet
    panier.splice(removeIndex, 1);

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


// Fonction du formulaire et informations récupérées
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

            // RegExp pour la validation via JS.
            let valueForm = new FormData(document.getElementById('formulaire-validation'));
            let nameFormat = new RegExp(/^[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ \s]{1,}/);
            let addressFormat = new RegExp(/[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ 0-9\s]{5,}/);
            let zipFormat = new RegExp(/[0-9]{5}/);
            let cityFormat = new RegExp(/[A-Za-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s]{2,}/);

            if (nameFormat.test(valueForm.get("firstName")) && nameFormat.test(valueForm.get('lastName')) && addressFormat.test(valueForm.get('address')) && zipFormat.test(valueForm.get('zip')) && cityFormat.test(valueForm.get('city'))) {

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

                sendData(url, cart);
                console.log(url, cart);
            }
        })

    };
};


form();


// Fonction envoie de données au serveur 
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





