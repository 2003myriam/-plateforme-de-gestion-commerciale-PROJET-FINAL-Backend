require("dotenv").config(); // ← EN PREMIER, avant tout

const express = require("express");
var cors = require('cors')
const connectDB = require("./src/config/db");

const app = express();
app.use(cors())

const port = process.env.PORT || 5000;


const  UserRoute=require("./src/routes/userRoute")
const CategoryRoute=require("./src/routes/CategoryRoute")


app.use(express.json());
connectDB();


app.use("/user",UserRoute)
app.use("/category",CategoryRoute)


/* ____on importe l'erreur a la fin  pour que ErrorHndler fonctionne_____ */
const { ErrorFunction } = require("./src/Middlewares/ErrorHndler");
app.use(ErrorFunction)

app.listen(port, () => {
  console.log("serveur is running on port " + port);
});