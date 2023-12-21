import ProductService from "../services/productService.js";

class ProductController{

    async getProducts(req,res){
        try {
            let{limit, page,sort,category}= req.query;
            limit=Number(limit)||10;
            page=Number(page)||1;
            sort={price:Number(sort)};

            if(!(sort.price=== -1|| sort.price===1)){
                delete sort.price;
            }

            const options ={page,limit,sort};
            const products = await ProductService.getProducts({category}, options);


            const newLink= (page)=>{
                const baseUrl= req.originalUrl.split("?")[0];
                const queryString= `?page=${page}`;
                return req.originalUrl.includes("page") ? req.originalUrl.replace(/page=\d+/g, `page=${page}`):`${baseUrl}${queryString}`;

            };

            const prevLink= products.hasPrevPage ? newLink(products.prevPage): null;
            const nextLink= products.hasNextPage ? newLink(products.nextPage): null;
        
        
            const response={
                status: "success",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                hasNextPage: products.hasNextPage,
                hasPrevPage: products.hasPrevPage,
                prevLink,
                nextLink,
            };
        
            return res.status(200).json(response);

        } catch (error) {
            console.error(error);
            return res.status(error.status||500).json({status:"error", message:error.message||"Internal error"});
        }
    };

    async getProductByid(req,res){
        const{productId}=req.params;
        try {
            const product = await ProductService.getProductById(productId);
            res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({status:"eeror", message:error.message|| "internal error"});
        }
    };

    async createProduct(req, res){
        try {
            const productInfo= req.body;
            const newProduct= await ProductService.createProduct(productInfo);
            res.status(201).json(newProduct);
        } catch (error) {
            return res.status(error.status||500).json({status:"error",message:error.message|| "internal error" });

        }
    };

    async updateProduct(req,res){
        const{productId}= req.params;
        try {
            const productInfo = req.body;
            const updatedProduct= await ProductService.updateProduct(productId, productInfo);
            res.status(200).json(updatedProduct);
        } catch (error) {
            return res.status(error.status||500).json({status:"error",message:error.message|| "internal error" }); 
        }
    };

    async deleteProduct(req,res){
        const {productId}= req.params;
        try {
            const deletedProduct= await ProductService.deleteProduct(productId);
            res.status(200).json(deletedProduct);
        } catch (error) {
            return res.status(error.status||500).json({status:"error",message:error.message|| "internal error" }); 
        }
    }

}

export default new ProductController();
