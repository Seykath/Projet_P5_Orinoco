
// Attribution d'un id pour la commande effectué
const orderCart = localStorage.getItem('commande');
const numCommande = JSON.parse(orderCart);
console.log(numCommande.orderId);

// Récupèrations des informations de validation de commande et du localStorage
const commandeCart = localStorage.getItem('panier');
const totalPrice = JSON.parse(commandeCart);
const totalOrder = document.getElementById('totalorder');


let order = document.getElementById('order');
order.innerHTML = `<strong> ${numCommande.orderId}</strong>`;


// Récupère le prix total du panier et l'affiche sur la page commande.html.
let total = 0;
for (i = 0; i < totalPrice.length; i++) {

    total += totalPrice[i].price * totalPrice[i].quantity;
}
console.log(total);

totalOrder.innerHTML += `<strong> ${total / 100},00 € </strong>`;


// On vide le localStorage une fois la commande validée et les informations envoyées.
localStorage.clear();