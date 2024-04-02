const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users = require("./Routes/api/users");
const auth = require("./Routes/api/auth");


const app = express();
app.use(express.json());
app.use(cors());

const mongo_url=config.get("mongo_url");
mongoose.set("strictQuery",true);
mongoose.connect(mongo_url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log("bien connecté avec mongoDB"))
.catch((err) => console.log(err));

app.use("/api/users",users);
app.use("/api/auth",auth);
const port = process.env.PORT || 3001;
app.listen(port,()=>console.log(`votre serveur fonctionne avec port ${port}`));