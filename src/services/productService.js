import ProductManager from "../DAL/DAO/productManager.js";

class ProductService{
    constructor(){
        this.productManager= new ProductManager();
    }

    async getProducts(filter,options){
        try {
            const products= await this.productManager.getProducts(filter,options);
            return products
            
        } catch (error) {
            console.error("No se pudo obtener los productos", error);
            throw error;

        }
    };

    async getProductById(productId){
        try {
            const product= await this.productManager.getProductById(productId);
            if (!product){
                throw{ status:404, message:`Producto con id ${productId} no se encuentra`};
                
            }
            return product;
        } catch (error) {
            console.error("No se pudo obtener el producto ", error);
            throw error;
        }
    };

    async createProduct(productInfo){
        try {
            const newProduct= await this.productManager.createProduct(productInfo);
            return newProduct;
        } catch (error) {
            console.error("No se pudo crear el nuevo producto", error);
            throw error
        }

    };

    async updateProduct(productId,productInfo){
        try {
            const updatedProduct= await this.productManager.updateProduct(productId, productInfo);
            if(!updatedProduct){
                throw {status:404, message:`Producto id ${productId} no se encuentra`};

            }
            return updatedProduct;

        } catch (error) {
            console.error("No se pudo actualizar el product", error.message);
            throw error;

        }
    };

    async deleteProduct(productId){
        try {
            const deletedProduct= await this.productManager.deleteProduct(productId);
            if (!deletedProduct){
                throw {status:404, message:`Product con id ${productId} no se encuentra`};

            }
            return { message:`Producto con id ${productId} ha sido eliminado`};

        } catch (error) {
            console.error("No se pudo eliminar el producto", error);
            throw error
        }
    }
}

export default new ProductService();