const socketClient = io();
const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')
const delet = document.getElementById('del')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socketClient.emit('newProduct', product);
}

delet.onclick = (e) => {
socketClient.on('DelProduct', products);
}
socketClient.on('products', (arrayProducts)=>{
    let infoProducts = '';
    arrayProducts.map((prod)=>{
        infoProducts += `${prod.name} - $${prod.price} </br>`
    })
    products.innerHTML = infoProducts
})



socketClient.on('message', (message)=>{
    console.log(message);
})
