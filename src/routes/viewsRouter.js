import { Router } from "express";
import ProductManager from "../DAL/DAO/productManager.js";

const productManager= new ProductManager();
const viewsRouter = Router();


// estas dos no deberian ir en utils.js?

const publicAccess= (req,res,next)=>{
    if(req.sesssion.user) return res.redirect("/profile");
    next();
};

const privateAccess= (req,res,next)=>{
    if (!req.session.user) return res.redirect("/login");
};


viewsRouter.get("/", async (req,res)=>{
    const productList = await productManager.getProducts();
    res.render("index", {productList});
});

viewsRouter.get("realtimeproducts", async (req,res)=>{
    res.render("realtimeproducts")
});

viewsRouter.get("/carts", async (req,res)=>{
    res.render("carts");
});

viewsRouter.get("/register", publicAccess,  (req,res)=>{
    if(req.session.user){
        return res.redirect ("/profile");
    }
    res.render("register")
});

viewsRouter.get("/login", publicAccess, (req,res)=>{
    if (req.session.user){
        return res.redirect("/profile");
    }
    res.render("login")
});

viewsRouter.get("/profile", privateAccess, (req,res)=>{
    console.log("user in session:", req.session.user);
    res.render("profile",{
        user: req.session.user,
    });
});

viewsRouter.get("/admin", async (req,res)=>{
    if(!req.session.user || req.session.user.role !=="ADMIN"){
        return res.redirect("/login");
    }
    res.render("admin", {
        user: req.session.user
    });
});

viewsRouter.get("/email", (req,res)=>{
   res.render("email");
});

viewsRouter.use("/tickets", (req,res)=>{
    res.render("tickets");
});

export default viewsRouter;