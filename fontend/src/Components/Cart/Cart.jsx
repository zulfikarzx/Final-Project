import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    const [cartdata, setcartdata] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const addtocart = (product ,size = null) => {
        let updatedcart = [...cartdata];
if(cartdata.length == 0){
    updatedcart.push({
        id: `${product._id}-${Math.floor(Math.random() * 1000)}`,
        product_id : product._id,
        title : product.title,
        price : product.price,
        quantity : 1,
        image_url : product.image_url,
        size : size,
    });
}else{
    if(size != null){
        const existingItem = updatedcart.find(item => 
            item.product_id == product.id && item.size == size);

            if(existingItem){
                updatedcart = updatedcart.map(item => 
                    (item.product_id == product.id && item.size == size)
                    ? {...item, quantity: item.quantity + 1}
                    : item 
                
                )
                console.log(existingItem);
            } else {
                updatedcart.push({
                    id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
                    product_id : product.id,
                    title : product.title,
                    price : product.price,
                    quantity : 1,
                    image_url : product.image_url,
                    size : size,
                });
            }
    } else{ 
        const existingItem = updatedcart.find(item => item.product_id == product.id);
        if(existingItem){
            updatedcart = updatedcart.map(item => 
                (item.product_id == product.id)
                ? {...item, quantity: item.quantity + 1}
                : item 
            )
        } else {
            updatedcart.push({
                id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
                product_id : product.id,
                title : product.title,
                price : product.price,
                quantity : 1,
                image_url : product.image_url,
                size : null,
            });
        }

         
    }

}
setcartdata(updatedcart);
localStorage.setItem('cart', JSON.stringify(updatedcart));
   
}

const updatecartItem = (itemId , newqty) => {
    let updatedcart = [...cartdata];
    updatedcart = updatedcart.map(item => item.id == itemId ? {...item, quantity: newqty} : item);
    setcartdata(updatedcart);
    localStorage.setItem('cart', JSON.stringify(updatedcart));
}
 const deletecartItem = (itemId) => {
    let updatedcart = [...cartdata];
    updatedcart = updatedcart.filter(item => item.id != itemId);
    setcartdata(updatedcart);
    localStorage.setItem('cart', JSON.stringify(updatedcart));
}
const getquantity =() => {
    let qty = 0;
    cartdata.map(item => qty += item.quantity);
    return qty;
} 

let Shipping = 5;
const subtotal = cartdata.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );



const grandtotal = subtotal + Shipping;

return (
    <CartContext.Provider value={{addtocart , cartdata , updatecartItem, deletecartItem, getquantity,subtotal,grandtotal,Shipping}}>{children}</CartContext.Provider>)

    
}

