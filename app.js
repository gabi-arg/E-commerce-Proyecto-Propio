
 let btnComprar = document.querySelectorAll('.add-to-card')
 let number = document.getElementById('number')
//abrir cerrar menu-mobile
const hamburgerMenu = document.querySelector('.btn-menu');
const modalNavbar = document.querySelector('.menu-modal-background');
const closeModalNavbar = document.querySelector('.btn-close');

modalNavbar.style.display = 'none'

hamburgerMenu.addEventListener('click', ()=>{
    modalNavbar.style.display = 'flex';
});
closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
}); 
//cargar productos
let productsContainer = document.querySelector('.container')
function productCatalog(chosenProduct){
    productsContainer.innerHTML = '';
    chosenProduct.forEach((product =>{
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>$${product.price}</p>
            <button class= "add-to-cart" id="${product.id}">Add to cart</button>
           `;
        productsContainer.append(div);//agrego los productos al contenedor principal
    }
    ))
    btnAdd()
} 
productCatalog(products);
//cambio del menu con su productos correspondientes
let newTitle = document.querySelector('#titulo-principal')
let menuOpcion = document.querySelectorAll('.btn-categories')
const backgroundPrincipal = document.querySelector('.principal')

menuOpcion.forEach(btn => {
    btn.addEventListener("click", (e) => {
        backgroundPrincipal.style.display = 'none';
        let prod = e.target.id
        newTitle.innerHTML = prod;
        menuOpcion.forEach(btn => btn.classList.remove('active'))
        e.currentTarget.classList.add('active');
        productsBtn = products.filter(product => product.categori === e.currentTarget.id);
        productCatalog(productsBtn)
        }) 
    }); 
//llamo el evento del boton para agregar al productsCart
let productsCart;

const productinCartLS = localStorage.getItem('product-in-cart')
if(productinCartLS){
    productsCart = JSON.parse(productinCartLS);
    updateNumber()
}else{
    productsCart = [];
}


function btnAdd(){
    btnComprar = document.querySelectorAll('.add-to-cart')
    btnComprar.forEach(boton =>{
            boton.addEventListener('click', addtoCarts);
        });
    }
function addtoCarts(e){
        let idBoton = e.currentTarget.id;
        const prodAdd = products.find(product => product.id === idBoton);
        if(productsCart.some(product=> product.id === idBoton)){
            const index = productsCart.findIndex(product => product.id === idBoton)
            productsCart[index].quantity++;
        }else{
            prodAdd.quantity = 1;
            productsCart.push(prodAdd)   
        }
        updateNumber();
        localStorage.setItem('products-in-cart', JSON.stringify(productsCart));
    }   
   
function updateNumber(){
    let newNumber = productsCart.reduce((acc, product)=> acc + product.quantity, 0);
   number.innerHTML = newNumber;
    console.log(newNumber)
}


