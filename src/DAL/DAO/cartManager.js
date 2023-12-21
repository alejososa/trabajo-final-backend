import cartModel from "../DB/models/cartModel.js"

class CartManager{

   async getCarts(){
    try {
        const carts= await cartModel.find().lean();
        return carts;
    } catch (error) {
        console.error("No se pudo obtener los carritos",error.message);
        return[];
    }
   };

   async getCartById(cartId){
    try {
        const cart= await cartModel.findById(cartId);
        return cart;
    } catch (error) {
        console.error("No se pudeo obtener el carrito", error.message);
        return error;
    }
   };

   async createCart(products){
    try {
        let cartData={};
        if(products && products.length >0){
            cartData.products= products;
        }
        const cart= await cartModel.create(cartData);
        return cart;
    } catch (error) {
        console.error("Error al crear el carrito", error.message);
        return error;
    }
   };

   async addProductToCart(cartId, obj){
    try {
        const filter={ _id:cartId,"products._id":obj._id};
        const cart= await cartModel.findById(cartId);
        const productAvaible= cart.products.some((product)=> product._id.toString()===obj._id);
        if(productAvaible){
            const update={$inc:{"products.$.quantity":obj.quantity}};
            await cartModel.updateOne(filter, update);
        }else{
            const update={$push:{products:{_id:obj._id, quantity:obj.quantity}}};
            await cartModel.updateOne({_id:cartId}, update);
        }
        return cartModel.findById(cartId);
    } catch (error) {
        console.error("No se pudo agregar el producto al carrito", error.message);
        return error;
    }
   };

   async deleteProductInCart(cartId, products){
    try {
      const cart=   await cartModel.findByIdAndUpdate(
            {_id:cartId},
            {products},
            {new:true}
        )
        return cart;
    } catch (error) {
        console.error("No se pudo borrar el producto del carrito", error.message);
        return error
    }
   };


}

export default CartManager;