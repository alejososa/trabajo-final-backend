import ProductManager from "../DAL/DAO/productManager.js";

const productManager= new ProductManager();

const socketProducts= (socketServer)=>{
    socketServer.on("connection", async (socket)=>{
        const productList= await productManager.getProducts();
        socketServer.emit("products", productList);

        socket.on("Create product", async (obj)=>{
            await productManager.createProduct(obj);
            const productList= await productManager.getProducts();
            socketServer.emit ("products", productList);
        });

        socket.on("delete Product", async (productId)=>{
            await productManager.deleteProduct(productId);
            const productList= await productManager.getProducts();
            socketServer.emit("products", productList);
        });

        socket.on("new user", (usuario)=>{
            console.log("user", usuario);
            socket.broadcast.emit("braodcast", usuario);

        });

        socket.on("disconnect", ()=>{
            console.log(`Se desconecto el usuadio id : ${socket.id}`)
        });
    })
};

export default socketProducts;