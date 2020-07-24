const cameraList = document.getElementById('camera__list');

let url = "http://localhost:3000/api/cameras";



////////////////////////////////////////////

async function getCamera(url) {
    let result = await fetch(url)
    return result.json()
}


getCamera(url).then(cameras => {
    console.log(cameras)
    cameras.forEach(camera => {
        console.log(camera)
        cameraList.innerHTML += '<div class="col-lg-4 col-md-6 mb-4">\
                        <div class="card w-80" >\
                                <a href="#"><img class="card-img-top" src="'+ camera.imageUrl + '"></a>\
                                <div class="card-body text-center">\
                                    <h3 class="card-title">\
                                        <a href="products.html?id='+ camera._id + '">' + camera.name + '</a>\
                                    </h3>\
                                    <h4 class="price"> '+ camera.price + ' €' + '</h4>\
                                    <p class="card-text">' + camera.description + '</p>\
                                </div>\
                            </div>\
                    </div >'
    });


})




















// fetch(url)
//     .then(
//         getCamera
//     )
//     .catch(
//         getError
//     )


// function getCamera(reponse) {
//     if (reponse.status !== 200) {
//         console.log('il y\'a un problème' + reponse.status);
//         return;
//     }
//     reponse.json()
//         .then(function (data) {
//             console.log(data);
//             data.forEach(camera => {
//                 console.log(camera);
//                 cameraList.innerHTML += '<div class="col-lg-4 col-md-6 mb-4">\
//                         <div class="card w-80" >\
//                                 <a href="#"><img class="card-img-top" src="'+ camera.imageUrl + '"></a>\
//                                 <div class="card-body">\
//                                     <h3 class="card-title">\
//                                         <a href="produit.html?id='+ camera._id + '">' + camera.name + '</a>\
//                                     </h3>\
//                                     <h4 class="price">'+ camera.price + ' €' + '</h4>\
//                                     <p class="card-text">' + camera.description + '</p>\
//                                 </div>\
//                             </div>\
//                     </div >'
//             });
//         })

// }


// function getError() {
//     console.log('erreur')
// }
