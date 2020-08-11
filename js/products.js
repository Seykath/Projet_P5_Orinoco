// variables
const image = document.getElementById('product__img');
const title = document.getElementById('product__title');
const price = document.getElementById('product__price');
const description = document.getElementById('product__description');
const selectLenses = document.getElementById('product__lenses');
const addPanier = document.getElementById('add-panier');

const queryString = window.location.search;
const cameraId = new URLSearchParams(queryString).get('id');
console.log(cameraId);
const url = "http://localhost:3000/api/cameras/" + cameraId;
var isPresent = false;




////////////////////////////////////////

// fetch

async function result(url) {
    let result = await fetch(url)
    return result.json()
}

result(url).then(function (camera) {
    console.log(camera)

    image.innerHTML = `<img id="product__img" src="${camera.imageUrl}" alt="Photo de ${camera.name}" >`
    title.innerHTML = camera.name;
    price.innerHTML = [camera.price / 100] + ',00 €';
    description.innerHTML = camera.description;

    lenses = camera.lenses;
    lensesOptions = document.getElementById('lenses-options')

    for (i = 0; i < lenses.length; i++) {
        lensesOptions += '<option id="lenses-options">' + lenses[i] + '</option>';
    }

    selectLenses.innerHTML += lensesOptions

    addPanier.addEventListener('click', e => {
        e.preventDefault();
        let productLenses = selectLenses.options[selectLenses.selectedIndex].value;
        console.log(productLenses);
        let element = {};
        element.id = cameraId;
        element.name = camera.name;
        element.lenses = productLenses;
        element.price = camera.price;
        element.quantity = 1;

        let panier = [];

        if (localStorage.getItem('panier')) {
            panier = JSON.parse(localStorage.getItem('panier'));

            panier.forEach(e => {

                if (e.id == cameraId && e.lenses == productLenses) {
                    e.quantity = e.quantity + 1;
                    isPresent = true;
                }
            });
            console.log(panier);

        }
        if (isPresent == false) {
            panier.push(element);
        }

        localStorage.setItem('panier', JSON.stringify(panier));
        alert('produit ajouté au panier!')
    })
});












