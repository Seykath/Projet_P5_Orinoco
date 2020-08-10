const cameraList = document.getElementById('camera__list');

let url = "http://localhost:3000/api/cameras";


// function qui récupère les caméra via l'url et ensuite affiche le resultat sous format json
async function getCamera(url) {
    let result = await fetch(url)
    return result.json()
}



getCamera(url).then(cameras => {
    console.log(cameras)
    cameras.forEach(camera => {
        console.log(camera)
        cameraList.innerHTML += `<div class="col-lg-4 col-md-6 mb-4">\
                        <div class="card" >\
                                <a href="products.html?id=${camera._id}"><img class="card-img-top" src="${camera.imageUrl}"></a>\
                                <div class="card-body text-center">\
                                    <h3 class="card-title">\
                                        <a href="products.html?id=${camera._id}">${camera.name}</a>\
                                    </h3>\
                                    <h4 class="price">${camera.price / 100},00 €</h4>\
                                    <p class="card-text">${camera.description}</p>\
                                    <a href="products.html?id=${camera._id}"><button type"button" class="btn btn-success">Détails</button></a>\
                                </div >\
                            </div >\
                    </div > `
    });
})

