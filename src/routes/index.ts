import { Router } from "express";

// middleware
import auth from "@middleware/Auth";

// controllers
import AuthController from "@controller/AuthController";
import CategoryController from "@controller/CategoryController";

const routes = Router();

// auth routes
routes.post("/auth/login", AuthController.login);
routes.post("/auth/register", AuthController.register);
routes.get("/auth/me", auth, AuthController.me);

// category routes
routes.get("/category/", auth, CategoryController.index);
routes.get("/category/:id", auth, CategoryController.show);
routes.post("/category/create", auth, CategoryController.create);
routes.post("/category/:id", auth, CategoryController.update);
routes.delete("/category/:id", auth, CategoryController.delete);

export default routes;
