import STRIPE_KEYS from "./stripe-keys.js";
//console.log(STRIPE_KEYS);

const $tacos = document.getElementById("tacos");
const $template = document.getElementById("taco-template").content;         // nos interesa el contenido del template
const $fragment = document.createDocumentFragment();


const fetchOptions = {
    headers:{                                                       
      Authorization: `Bearer ${STRIPE_KEYS.secret}`,                         // en la cabecera ponemos la auteiticacion 
      mode:"cors"
    }
  
}

let prices, products;
const moneyFormat = (num) => ` ${num.slice(0,1)}.${num.slice(-2)}`                     // trae el digito en la posicion del 0 al 1
                                                                                      // y trae los 2 ultimos digitos
Promise.all([                                                           
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions)
])
.then((responses) => Promise.all(responses.map((res) => res.json() )))             // map me crea un nuevos Arrays me trae 2 o mas endpoints
.then((json) => {
 // console.log(json);                                                              // ya que me retorna el json imprimo las 2 respuestas ya en formato json 

 products = json[0].data;                                                           // OJO EN ESTE ORDEN extraemos unicamente la info que nos interesa 
  prices = json[1].data;                                                           // extraemos unicamente la info que nos interesa

  console.log(prices, products);                                                  //Despues de crear el html o la plantilla, stripe nos pide un ''CHECKOUT SESSION' Esto es el metodo de pago que nos permite enviar nuestros datos de nuestro formulario en html a STRIPE
 // console.log(products);                                                        // y se programa en el click 'submit' nos pedira la PK aqui encontramos la documentacion 'https://stripe.com/docs/api/checkout/sessions/object'

 //INICIAMOS CON PRECIOS, ya que stripe me pedira el id_precio al momento de relacionarlo con cada producto
// INSERTANDO EL HTML                    // por cada precio me va traer un producto (que su id_producto sea igual al 'id_producto' contenido dentro de precio  )


  
  prices.forEach( precio => {
    let dataProducto =  products.filter( producto => producto.id === precio.product );  // OOJO SOLO LOS TRAE EL LOS ID'S QUE COINCIDEN EN LOS 2 ENDPOINTS, PERO EN 'precio' ya esta toda la info junta del producto
    //console.log(dataProducto);
    
    $template.querySelector(".taco").setAttribute("data-price", precio.id);              // del template selecciona la clase taco y agregale el data atribute precio.id
    $template.querySelector("img").src = dataProducto[0].images[0];
    $template.querySelector("img").alt = dataProducto[0].name;
    $template.querySelector("figcaption").innerHTML = `
    ${dataProducto[0].name} <br>                                                          
    ${moneyFormat(precio.unit_amount_decimal)} ${precio.currency}`;                                  // me traigo el precio en string para separarle el . decimal y la moneda en la q esta
    
    let clone = document.importNode($template, true);                                   // cuando trabajamos con templates debemos de clonarlos y poner true para traer su contenido
    $fragment.appendChild(clone);

  });
  
  $tacos.appendChild($fragment);

  
  
}) 


.catch((err) =>{
  console.log(err);

  let message = err.statusText || "Ocurrio un error al conectarse a la API de stripe";
  $tacos.innerHTML = `<p>Error ${message}</p>`
})

document.addEventListener("click",e=>{
  if(e.target.matches(".taco *")){                 // todo lo que este dentro de figure .taco
    
    let price = e.target.parentElement.getAttribute("data-price");                    //como dimos click dentro de caption, le decimos que se ira un elemento arriba y nos traera el id-precio 
    console.log(price);
          
    Stripe(STRIPE_KEYS.public)
    .redirectToCheckout(
      {                                                  //invocamos a Stripe y le pasamos la llave publica y le decimos que nos reditrija a 
      lineItems:[{price:price, quantity:1}],                                // como el usuario pagara de uno en uno, solo ponemos 1 objeto, (le pasamos el precio de solo ese producto) y (solo 1 cantidad o sea solo la de ese producto)
      mode:"payment",                                                                  // si tuvieramos un carrito de compras cambiaria la cantidad
      successUrl: "http://127.0.0.1:5500/assets/stripe-success.html",              // en un caso real aqui seria la pagina de exito con el tiquet y todo copiar de amazon
      cancelUrl: "http://127.0.0.1:5500/assets/stripe-wrong.html"                                                               //aqui igual mostramos que la compora no se pudo realizar en otra pagina
    }
    )                       
    .then(res => {   
      console.log(res);
    
    


    if(res.error){
      $tacos.insertAdjacentHTML("afterend",res.error.message);
    }
    }) 
    }
})



//mode":"payment"













/*
// Productos
fetch("https://api.stripe.com/v1/products",{
  headers:{                                                       
    Authorization: `Bearer ${STRIPE_KEYS.secret}`                         // en la cabecera ponemos la auteiticacion 
  }
  }).then((res) =>{                            // investigamos cual es la API y al momento de crear un producto 
                                                             // nos fijamos como acceder a ese producto con la API
    return res.json();                                                      //  investigamos que significa el error 401, indica que no estamos autorizados
  })                                                                     // investigamos  en la documentacion que pide para entrar con autenticacion la API       
  .then( json =>{
    console.log(json);
  })


// Precios
  fetch("https://api.stripe.com/v1/prices",{                            // COMO no me trae los precios, debo investigar como traer los precios tambien en la documentacion d e la API
  headers:{                                                       
    Authorization: `Bearer ${STRIPE_KEYS.secret}`                         // en la cabecera ponemos la auteiticacion 
  }
  }).then((res) =>{                            // investigamos cual es la API y al momento de crear un producto 
                                                             // nos fijamos como acceder a ese producto con la API
    return res.json();                                                      //  investigamos que significa el error 401, indica que no estamos autorizados
  })                                                                     // investigamos  en la documentacion que pide para entrar con autenticacion la API       
  .then( json =>{
    console.log(json);
  })
  */