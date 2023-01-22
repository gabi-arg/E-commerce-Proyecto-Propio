let productsCart = localStorage.getItem('products-in-cart')
productsCart = JSON.parse(productsCart);
const cartEmptyUnit = document.querySelector('.cart-empty');
const cartProducts = document.querySelector('.cart-products');
const cartAccions = document.querySelector('.cart-accions');
const cartPurchase = document.querySelector('.cart-purchase');
const btnReturn = document.querySelector('.btn-return')
const btnCartEmpty = document.querySelector('.cart-accions-delete')
let btnDelete= document.querySelectorAll('.cart-product-delete')
let btntotal = document.querySelector('#total');
const btnBuy = document.querySelector('.cart-accions-buy')
function loadCart(){
    if(productsCart && productsCart.length > 0){
        cartPurchase.style.display = 'none';
        cartEmptyUnit.style.display = 'none';
        btnReturn.style.display = 'none';
        cartProducts.innerHTML= '';
        productsCart.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('cart-product');  
            div.innerHTML = `
                
                    <img class="cart-product-image" src="${product.image}" alt="product-image">
                    <div class="cart-product-title">
                        <h6>Product</h6>
                        <p>${product.title}</p>
                    </div>
                    <div class="cart-product-quantity">
                        <h6>Quantity</h6>
                        <p>${product.quantity}</p>
                    </div>
                    <div class="cart-product-price">
                        <h6>Price</h6>
                        <p>${product.price}</p>
    
                    </div>
                    <div class="cart-product-subtotal">
                        <h6>Subtotal</h6>
                        <p>${product.price * product.quantity}</p>
                    </div>
                    <button class="cart-product-delete" id="${product.id}"><img src="./css/img/icons/eliminar.png" alt=""></button>       
            `;
            cartProducts.append(div)
        })
    
    }else{
        cartEmptyUnit.style.display = 'flex'
        cartProducts.style.display = 'none';
        cartPurchase.style.display = 'none';
        btnReturn.style.display = 'none';
    
    }
    updateDeleteBtn();
    updateTotal();
};
loadCart()

function updateDeleteBtn(){
    btnDelete = document.querySelectorAll('.cart-product-delete')
    btnDelete.forEach(boton =>{
            boton.addEventListener('click', deleteToCart);
        });
};
function deleteToCart(e){
    const idBoton = e.currentTarget.id;
    const index = productsCart.findIndex(product => product.id === idBoton);
    productsCart.splice(index, 1);
    loadCart();
    localStorage.setItem('products-in-cart', JSON.stringify(productsCart));
}
btnCartEmpty.addEventListener('click', cartEmpty);

function cartEmpty() {
    productsCart.length = 0;
     localStorage.setItem('products-in-cart', JSON.stringify(productsCart));
     loadCart();
}

function updateTotal(){
    const totalCalculated = productsCart.reduce((acc, product)=> acc + (product.quantity * product.price), 0);
    btntotal.innerText = `$${totalCalculated}`
}
btnBuy.addEventListener('click', buyNow)

function buyNow() {
    productsCart.length = 0;
    localStorage.setItem('products-in-cart', JSON.stringify(productsCart));
    cartPurchase.style.display = 'flex';
    btnReturn.style.display = 'block';
    cartEmptyUnit.style.display = 'none';
    cartProducts.style.display = 'none';
    cartAccions.style.display = 'none';
}