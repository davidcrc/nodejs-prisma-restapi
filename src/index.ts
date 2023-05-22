import express from "express";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/products.routes";

const app = express();

app.use(express.json());

app.use("/api", categoriesRoutes);
app.use("/api", productsRoutes);

app.listen(3000);
console.log("Server on port ", 3000);
