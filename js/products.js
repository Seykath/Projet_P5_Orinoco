//  Récupère les Id des balises HTML.
const image = document.getElementById('product__img');
const title = document.getElementById('product__title');
const price = document.getElementById('product__price');
const description = document.getElementById('product__description');
const selectLenses = document.getElementById('product__lenses');

// Récupère l'Id du button
const addPanier = document.getElementById('add-panier');

// Récupération de l'id du produit
const queryString = window.location.search;
const cameraId = new URLSearchParams(queryString).get('id');
console.log(cameraId);
const url = "http://localhost:3000/api/cameras/" + cameraId;
var isPresent = false;


// Connexion avec les produits du server via l'URL
async function productCamera(url) {
    let result = await fetch(url)
    return result.json()
}

// Récupération des produits du server
productCamera(url).then(function (camera) {
    console.log(camera)
    // remplit les champs html par les informations du produit
    image.innerHTML = `<img id="product__img" src="${camera.imageUrl}" alt="Photo de ${camera.name}" >`
    title.innerHTML = camera.name;
    price.innerHTML = [camera.price / 100] + ',00 €';
    description.innerHTML = camera.description;


    // Ajoute les différentes lentilles au tableau selecteur et permet de récupérer la sélection via le bouton
    lenses = camera.lenses;
    lensesOptions = document.getElementById('lenses-options')

    for (i = 0; i < lenses.length; i++) {
        lensesOptions += '<option id="lenses-options">' + lenses[i] + '</option>';
    }

    selectLenses.innerHTML += lensesOptions


    // Bouton ajout au panier lors du clique
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

        }
        if (isPresent == false) {
            panier.push(element);
        }

        localStorage.setItem('panier', JSON.stringify(panier));
        alert('produit ajouté au panier!')
    })
})

    .catch(function (error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error);
        alert('La connexion au serveur a échouée !');
    });











