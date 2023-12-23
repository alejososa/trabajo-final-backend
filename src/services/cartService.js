
import CartManager from "../DAL/DAO/cartManager.js";
import ProductManager from "../DAL/DAO/productManager.js";
import TickertService from "../services/ticketService.js";

class CartService {
    constructor() {
        this.cartManager = new CartManager();
        this.productManager = new ProductManager();
    }

    async getCarts() {
        try {
            const carts = await this.cartManager.getCarts();
            return carts;
        } catch (error) {
            console.error("no se pudo obtener todos los carritos", error.message);
            return error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await this.cartManager.getCartById(cartId);

            if (!cart) {
                return { status: 404, message: `No se pudeo encontrar el carrito con id ${cartId}` };
            }
            const products = await Promise.all(cart.products.map(async (product) => {
                const productInfo = await this.productManager.getProductById(product._id);
                return {
                    _id: productInfo._id,
                    title: productInfo.title,
                    price: productInfo.price,
                    quantity: productInfo.quantity,
                };
            }));

            const cartInfo = {
                _id: cart._id,
                products: products,
            };
            return cartInfo
        } catch (error) {
            console.error("No se pudo obtener info de ese carrito", error.message);
            return error
        }
    }

    async createCart(products) {
        try {
            if (!Array.isArray(products)) {
                throw { status: 400, message: "Los productsos no son un array" };

            }

            const productsOk = await Promise.all(products.map(async (product) => {
                const idOk = await this.productManager.getProductById(product._id);
                if (!idOk) {
                    throw { status: 404, message: `Producto id:${product._id} no encontrado` };
                }
                return { product: idOk._id, quantity: product.quantity || 1 };
            }));

            const cart = await this.cartManager.createCart(productsOk);
            return cart
        } catch (error) {
            console.error("No se pudo crear un nuevo carrito", error.message);
            return error
        }
    };

    async addProductToCart(cartId, productId, quantity) {
        try {
            const product = await this.productManager.getProductById(productId);
            if (!product) {
                throw { status: 404, message: `Producto id ${productId}, no se encuentra` };

            }

            const cart = await this.cartManager.getCartById(cartId);
            if (!cart) {
                throw { status: 404, message: `Carrito id ${cartId}, no se encuentra` };

            }

            const response = await this.cartManager.addProductToCart(cartId, { _id: productId, quantity });
            return response;
        } catch (error) {
            console.error("No se pudo agregarl el producto al carrito", error.message);
            throw error
        }
    };

    async updateQuantity(cartId, productId, quantity) {
        try {
            const product = await this.productManager.getProductById(productId);

            if (!product) {
                throw { status: 404, message: `Producto id ${productId}` };

            }
            const cart = await this.cartManager.getCartById(cartId);
            if (!cart) {
                throw { status: 404, message: `Carrito no encontrado` };
            }
            const response = await this.cartManager.updateQuantity(cartId, { _id: productId, quantity });
            return response;
        } catch (error) {
            console.error("No se pudo actualizar la cantidad del producto en el carro", error.message);
            throw error
        }
    };

    async removeProduct(cartId, productId) {
        try {
            const product = await this.productManager.getProductById(productId);
            if (!product) {
                throw { status: 404, message: `No existe producto con id ${productId}` };

            }
            const cart = await this.cartManager.getCartById(cartId);

            if (!cart) {
                const response = await this.cartManager.deleteProductInCart(cartId, { _id: productId });
                return response;
            }
        } catch (error) {
            console.error("No se pudo eliminar el producto del carrito", error.message);
            throw error
        }
    };

    async clearCart(cartId) {
        try {
            const cart = await this.cartManager.getCartById(cartId);
            if (!cart) {
                throw { status: 404, message: `Carrito con id ${cartId} no existe` };

            }
            const response = await this.cartManager.createCart(cartId);
            return response;

        } catch (error) {
            console.error("Error al vaciar el carrito", error.message);
            throw error
        }
    };

    async checkStock(productId, quantity) {
        try {
            const product = await this.productManager.getProductById(productId);
            if (!product) {
                throw { status: 404, message: `Producto con id ${productId} no existe` };

            }
            return product.stock >= quantity;
        } catch (error) {
            console.error("No hay ese numero en el stock", error.message);
            throw error
        }
    };

    async updateStock(productId, quantity){
        await this.productManager.updateStock(productId, quantity);
    }

    async purchaseTicket(purchaseInfo) {
        try {
            const { purchaser, totalAmount } = purchaseInfo;;
            const ticketInfo = {
                code: generateUniqueCode(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: purchaser,
            };
            const ticket = await TickertService.generateTicket(ticketInfo);
            return ticket;
        } catch (error) {
            console.error("Error al generar el ticket", error);
            throw error;
        }
    }


};

export default new CartService();