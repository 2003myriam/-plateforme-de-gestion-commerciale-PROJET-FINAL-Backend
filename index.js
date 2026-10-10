 
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importer les routes
const UserRoute = require("./src/routes/userRoute");
const CategoryRoute = require("./src/routes/CategoryRoute");
const ProductRoute = require("./src/routes/ProductRoute");
const TaskRoute = require("./src/routes/TaskRoute");
const PersoTaskRoute = require("./src/routes/PersonnelTaskRoute");
const GenerateCodeRoute = require("./src/routes/CodeRoute");
const customerRoute = require("./src/routes/ClientRoute");
const commandeRoute = require("./src/routes/CommandeRoute");

// Déclarer les routes
app.use("/user", UserRoute);
app.use("/category", CategoryRoute);
app.use("/products", ProductRoute);
app.use("/tasks", TaskRoute);
app.use("/persotasks", PersoTaskRoute);
app.use("/code", GenerateCodeRoute);
app.use("/customers", customerRoute);
app.use("/orders", commandeRoute);

// Middleware de gestion des erreurs
const { ErrorFunction } = require("./src/Middlewares/ErrorHndler");
app.use(ErrorFunction);

// Démarrer le serveur après la connexion à MongoDB
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("Serveur démarré sur le port " + port);
    });
  } catch (error) {
    console.error(
      "Impossible de démarrer le serveur :",
      error.message
    );

    process.exit(1);
  }
};

startServer();
