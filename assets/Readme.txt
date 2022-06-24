1-  En la cabecera ponemos la auteiticacion
2-  investigamos cual es la API y al momento de crear un producto 
3-  nos fijamos como acceder a ese producto con la API
4- investigamos que significa el error 401, indica que no estamos autorizados
5- investigamos  en la documentacion que pide para entrar con autenticacion la API       
6- COMO no me trae los precios, debo investigar como traer los precios tambien en la documentacion de la API
7- Strapi genera en otro endpoint o url, dentro de la misma API, entonces
8- investigamos como ver los precios dentro de la misma documentacion API 

9- SABEMOS QUE NOS PIDE AUTENTICACION PORQUE EN LA DOCUMENTACION DICE:
  use -H "Authorization: Bearer sk_test_51LAapYBCItzpCXUlLs9xq8YxJZrkFGeDbbeEVnApdjq5cdoD2L7bk4d6SZPOcwTSo4sMAQhhuj74GmEmGIiPvuqs00G7dEDpNz"
   instead of -u sk_test_51LAapYBCItzpCXUlLs9xq8YxJZrkFGeDbbeEVnApdjq5cdoD2L7bk4d6SZPOcwTSo4sMAQhhuj74GmEmGIiPvuqs00G7dEDpNz.

  -H: Significa que se debe usar en el header
   Seguido de la palabra Bearer
   sk: Significa Secret Key o Private Key y las mandamos llamar como lo indicamos en el archivo Js
   pk: Significa Public Key y tambien es la que nos proporciona Strapi

10- con Promise.All resolvemos los 2 fetch o mas al mismo tiempo
11- extraemos solo lo que nos interesa con las posiciones[] y ahora si ya podremos iterar sobre precios y productos 


// FALTA SELECCIONAR VARIOS PRODUCTOS, METERLOS TODOS A UN CARRITO Y ENVIAR EL TIQUET DE PAGO AL CLIENTE (COMPROBAR ESTO ULTIMO EN EL MODO REAL, NO EN TEST)

////////////
🟣 https://stripe.com/docs
🟣 https://stripe.com/docs/api
🟣 https://stripe.com/docs/api/authentic...
🟣 https://stripe.com/docs/js
🟣 https://stripe.com/docs/api/products
🟣 https://stripe.com/docs/api/prices
🟣 https://stripe.com/docs/api/checkout/...
🟣 https://github.com/stripe-samples
🟣 https://github.com/stripe-samples/che...