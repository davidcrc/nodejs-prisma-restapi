import express from "express";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/products.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options as swaggerOptions } from "./swaggerOptions";

const app = express();

app.use(express.json());

app.use("/api", categoriesRoutes);
app.use("/api", productsRoutes);

// Add swagger
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000);
console.log("Server on port ", 3000);
