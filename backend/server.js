import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //Permite parasear el body de las peticiones a JSON
app.use(cookieParser()); //Permite parsear las cookies de las peticiones (lo usamos en protectRoute.js)

// Middlewares (controladores de rutas)
app.use("/api/auth", authRoutes); //Creamos un middleware que funciona como controlador de rutas
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is ready!!");
});

//Cuando la aplicación empiece a escuchar entonces la conectamos a la base de datos
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server started on http://localhost:${PORT}`);
});
