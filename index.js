require("dotenv").config(); // ← EN PREMIER, avant tout

const express = require("express");
var cors = require('cors')
const connectDB = require("./src/config/db");

const app = express();
app.use(cors())

const port = process.env.PORT || 5000;


const  UserRoute=require("./src/routes/userRoute")
const CategoryRoute=require("./src/routes/CategoryRoute")
const  ProductRoute=require("./src/routes/ProductRoute")
const TaskRoute=require("./src/routes/TaskRoute")
const PersoTaskRoute=require("./src/routes/PersonnelTaskRoute")
const SheduleRoute=require("./src/routes/PlanningRoute")


app.use(express.json());
connectDB();


app.use("/user",UserRoute)
app.use("/category",CategoryRoute)
app.use("/products",ProductRoute)
app.use("/tasks",TaskRoute)
app.use("/persotasks",PersoTaskRoute)
app.use("/shedules",SheduleRoute)


/* ____on importe l'erreur a la fin  pour que ErrorHndler fonctionne_____ */
const { ErrorFunction } = require("./src/Middlewares/ErrorHndler");
app.use(ErrorFunction)

app.listen(port, () => {
  console.log("serveur is running on port " + port);
});