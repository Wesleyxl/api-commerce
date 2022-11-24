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
routes.post("/category/create", CategoryController.create);
routes.get("/category/", CategoryController.index);

// test private route
routes.get("/test", (req, res) => {
  return res.json({
    success: true,
    data: "ok",
  });
});
routes.get("/test/private", auth, (req, res) => {
  return res.json({
    success: true,
    data: "ok",
  });
});

export default routes;
