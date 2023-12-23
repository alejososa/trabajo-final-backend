import "../src/DAL/DB/dbconfig.js";
import express from "express";
import handlebars from "express-handlebars";
import { __dirname} from "./utils.js";
import {Server, Socket} from "socket.io";
import socketChat from "./web sockets/socketChat.js";
import socketProducts from "./web sockets/socketProducts.js";
import session from "express-session";
import  FileStore  from "session-file-store";
import MongoStore from "connect-mongo";
import passport from "passport";
import "../src/services/passport/passportStrategies.js";
import productRouter from "./routes/productRouter.js";
import cartRouter  from "./routes/cartRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import emailRouter from "./routes/emailRouter.js";





const app= express();
const PORT= process.env.PORT ;
const fileStore= FileStore(session);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


//mongo
app.use(
    session({
        store: new MongoStore({
            mongoUrl:process.env.MONGO_URI,
        }),
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
    })
);

//te odio handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/tickets", ticketRouter);
app.use("/", viewsRouter);

//web sockets

const httpServer = app.listen(PORT,()=>{
    try {
        console.log(`Escuchando al puerto ${PORT}`);

    } catch (error) {
        console.log("No se pudo conectar al puerto");
    }
});

const socketServer= new Server(httpServer);
socketChat(socketServer);
socketProducts(socketServer);