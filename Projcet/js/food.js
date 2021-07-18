
var counter = 1;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4){
        counter = 1;
    }
},5000);




let carts = document.querySelectorAll('.add-cart'); //1
let products = [
    {
        name: 'Combo A',
        tag: 'CA',
        price: 15,
        inCart: 0,
    },
    {
        name: 'Combo B',
        tag: 'CB',
        price: 25,
        inCart: 0,
    },
    {
        name: 'Combo C',
        tag: 'CC',
        price: 20,
        inCart: 0,
    },
];
//2
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
       
    });
}
//4
function onLoadCartNumbers() {

    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//3
function cartNumbers(product) {

  let productNumbers =  localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers){
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.cart span').textContent = productNumbers + 1;
  }else{
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.cart span').textContent = 1;
  }

    setItems(product);
}
   

    //5
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1 ;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsIncart", JSON.stringify
    (cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartCost);
    console.log(typeof cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    }else{
        localStorage.setItem("totalCost", product.price);

    }  
}

function displayCart(){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class = "product">
                 <i class='bx bx-window-close'></i>
                 <img src="./Project/${item.tag}.jpeg">
                 <span> ${item.name}</span>
            </div>
            <div class = "pice">${item.price},00</div>
            <div class = "quantity"> 
                <i class='bx bx-plus-circle' ></i>
                <span>${item.inCart}</span>
                <i class='bx bx-minus-circle' ></i>
            </div>
            <div class = "total">
                ${item.inCart * item.price},00
            </div>


        
            `;
        });
        productContainer.innerHTML += `
            <div class = "basketTotalContainer">    
                <h4 class = "basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class = "backetTotal">
                    ${cartCost},00
                </h4>
        `;

    } 

}

onLoadCartNumbers();
displayCart();
