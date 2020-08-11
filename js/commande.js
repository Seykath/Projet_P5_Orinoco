const orderCart = localStorage.getItem('commande');
const numCommande = JSON.parse(orderCart);
console.log(numCommande.orderId);
const commandeCart = localStorage.getItem('panier');
const totalPrice = JSON.parse(commandeCart);
const totalOrder = document.getElementById('totalorder');


let order = document.getElementById('order');
order.innerHTML = `<strong> ${numCommande.orderId}</strong>`;


let total = 0;
for (i = 0; i < totalPrice.length; i++) {

    total += totalPrice[i].price * totalPrice[i].quantity;
}

console.log(total);

totalOrder.innerHTML += `<strong> ${total / 100},00 € </strong>`;

localStorage.clear();