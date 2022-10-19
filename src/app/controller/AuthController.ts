import Controller from "./Controller";
import { Request, Response } from "express";
import AuthService from "@service/AuthService";

class AuthController extends Controller {
  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const validator = await Controller.validator(req.body);

      if (!validator.success) {
        return res.status(401).json({
          success: false,
          message: validator.message,
        });
      }

      const { email, password } = req.body;

      const registerResponse = await AuthService.login(email, password);
      if (registerResponse.success) {
        return res.json({
          success: true,
          data: registerResponse.data,
        });
      }

      return res.status(401).json({
        success: false,
        message: registerResponse.message,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const validator = await Controller.validator(req.body);

      if (!validator.success) {
        return res.status(401).json({
          success: false,
          message: validator.message,
        });
      }
      const { name, email, password } = req.body;

      const response = await AuthService.register(name, email, password);

      if (response.success) {
        return res.json({
          success: true,
          data: response.data,
        });
      }

      return res.status(400).json({
        success: false,
        data: "Email or password is incorrect",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error,
      });
    }
  }

  public async me(req: Request, res: Response): Promise<Response> {
    try {
      const id = await res.locals.auth_data.id;

      const response = await AuthService.me(id);

      if (response.success) {
        return res.json({
          success: true,
          data: response.data,
        });
      }

      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error,
      });
    }
  }
}

export default new AuthController();
