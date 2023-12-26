import cartService from "../services/cartService.js";
import CartService from "../services/cartService.js";
import ticketService from "../services/ticketService.js";

class CartController {
    async getCarts(req, res) {
        try {
            const carts = await CartService.getCarts();
            res.status(200).json({ status: "succes", carts: carts });
        } catch (error) {
            res.status(500).json({ status: "error", message: "Internarl error" });
        }
    }

    async getCartById(req, res) {
        const { cartId } = req.params;
        try {
            const cartInfo = await CartService.getCartById(cartId);
            res.status(200).json(cartInfo);
        } catch (error) {
            if (error.status) {
                res.status(error.status).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "internal error" });
            }
        }
    }

    async createCart(req, res) {
        const { products } = req.body;
        try {
            const newCart= await CartService.createCart(products);
            res.status(201).json({status:"error", message:error.message});

        } catch (error) {
            if (error.status) {
                res.status(err.status).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal error" });
            }
        }
    }

    async addProductToCart(req,res){
        const{cartId, productId}=req.params;
        const{quantity}=req.body;
        try {
            const response= await CartService.addProductToCart(cartId, productId, quantity);
            res.status(200).json({message:`Product with id ${productId} added to cart id ${cartId}`, cart:response});
        } catch (error) {
            if (error.status) {
                res.status(err.status).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal error" });
            }
        }
    }

    async updateQuantity(req,res){
        const{cartId, productId}=req.params;
        const{ quantity}= req.body;

        try {
            const response = await CartService.updateQuantity(cartId, productId, quantity);
            res.status(200).json({message:"quantity added ", cart:response});
        } catch (error) {
            if (error.status) {
                res.status(err.status).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal error" });
            }
        }
    }

    async clearCart(req,res){
        const{cartId}= req.params;
        try {
            const response= await CartService.clearCart(cartId);
            res.status(200).json({message:`carrito id: ${cartId}, se ha vaciado`, cart:response});
        } catch (error) {
            if (error.status) {
                res.status(err.status).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Internal error" });
            }
        }
    }

    async purchase(req,res){
        const {cartId}=req.params;

        try {
            const cartInfo= await CartService.getCartById(cartId);
            const purchasedProducts= [];
            

            for(const product of cartInfo.products){
                try {
                    const productInfo= await CartService.checkStock(product._id, product.quantity);
                    purchase.push({
                        _id:productInfo._id,
                        title: productInfo.title,
                        price: productInfo.price,
                        quantitu: product.quantity,
                    });
                    await CartService.updateStock(product._id, product.quantity);
                } catch (error) {
                    res.status(200).json({status:"error", message:"Not enough stock"});
                }
            }
        } catch (error) {
            res.status(error.status).json({status:"error", message:error.message});
        }
        

        const ticketInfo={
            products: purchasedProducts,
            total: purchasedProducts.reduce((total, product)=>total +product.price * product.quantity,0),

        };

        const newTicket = await ticketService.generateTicket(ticketInfo);
        await cartService.clearCart(cartId);

        res.status(200).json({ message:"Purchase complete", purchasedProducts, ticket:newTicket});
    
    }catch(error){
        if(error.status){
            res.status(error.status).json({status:"error", message: error.message});
        }else{
            res.status(500).json({status:"error"});
        }
    }

    





}

export default new CartController();