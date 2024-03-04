import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

// const app = express(); // como tenemos socket está en socket.js
import { app, server } from "./socket/socket.js"; //usamos esta app del socket

const PORT = process.env.PORT || 5000;

// Esto nos da el root de la carpeta
const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); //Permite parasear el body de las peticiones a JSON
app.use(cookieParser()); //Permite parsear las cookies de las peticiones (lo usamos en protectRoute.js)

// Middlewares (controladores de rutas)
app.use("/api/auth", authRoutes); //Creamos un middleware que funciona como controlador de rutas
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist"))); //Para servir el frontend

//Esto hace que el front corra en el mismo puerto que el back al hacer una build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Server is ready!!");
});

//Cuando la aplicación empiece a escuchar entonces la conectamos a la base de datos
//Ahora en lugar de usar app.listen usamos server.listen porque estamos usando el servidor del socket también
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server started on http://localhost:${PORT}`);
});
