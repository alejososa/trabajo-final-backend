import productModel from "../DB/models/productModel.js";

class ProductManager{
    async category(){
        try {
            const category= await productModel.aggregate([
                {
                    $group:{
                        _id:null,
                        category:{$addToSet:"$category"}
                    }
                }
            ])
            return category[0].category
        } catch (error) {
            return error
        }
    };

    // async getProducts(){
    //     try {
    //         const products= await productModel.find().lean();
    //         return products;
    //     } catch (error) {
    //         console.error("No se pueden obetener los productos",error.message);
    //         return error
    //     }
    // };

    async getProducts(filter, options){
        try {
            const products= await productModel.paginate(filter, options);
            return products;
        } catch (error) {
            return error
        }
    };

    async getProductById (productId){
        try {
            const response= await productModel.findById(productId);
            return response;
        } catch (error) {
            return error
        }
    };

    async createProduct(product){
        try {
            const response = await productModel.create(product);
            return response;
        } catch (error) {
            return error
        }
    };

    async updateProduct(productId, product){
        try {
            const response= await productModel.findByIdAndUpdate(productId, {$set:product});
            return response
        } catch (error) {
            return error
        }
    };

    async updateStock(productId, quantity){
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(productId,{
                $inc:{stock:-quantity}},
                {new:true}
            );
            if(!updatedProduct){
                console.log(`Product id: ${productId}, not found`);
            }
            return updatedProduct;
        } catch (error) {
            console.error("No se pudo actualizar el error del producto", error);
            throw error;
        }
    }

    async deleteProduct(productId){
        try {
            const response= await productModel.findByIdAndDelete(productId);
            return response;
        } catch (error) {
            console.error("No se pudo borrar el productt", error.message);
            return error
        }
    };









}

export default ProductManager;