import mongoose from "mongoose";
import config from "../../config.js";

const URI= config.mongo_uri

mongoose.connect(URI)
.then(()=> console.log("conectado a la base de datos"))
.catch(error=>console.log("no se pudo conectar a la base de datos"))
