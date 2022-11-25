import Controller from "./Controller";
import { Request, Response } from "express";
import CategoryService from "@service/CategoryService";

class CategoryController extends Controller {
  public async index(res: Response) {
    try {
      const categories = await CategoryService.getCategories();

      if (categories.success) {
        return res.status(200).json({
          success: true,
          data: categories.data,
        });
      }

      return res.status(400).json({
        success: false,
        data: categories.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await CategoryService.showCategory(id);

      if (!response.success) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
        data: response.data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const validator = Controller.validator(req.body);

      if (!validator.success) {
        return res.status(401).json({
          success: false,
          message: validator.message,
        });
      }

      const { name } = req.body;
      const response = await CategoryService.createCategory(name);

      if (response.success) {
        return res.status(200).json({
          success: true,
          data: response.data,
        });
      }

      return res.status(400).json({
        success: false,
        message: response.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const validator = Controller.validator(req.body);

      if (!validator.success) {
        return res.status(401).json({
          success: false,
          message: validator.message,
        });
      }

      const { name } = req.body;
      const { id } = req.params;
      const response = await CategoryService.updateCategory(id, name);

      if (response.success) {
        return res.status(200).json({
          success: true,
        });
      }

      return res.status(400).json({
        success: false,
        message: response.message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await CategoryService.deleteCategory(id);
      if (!response.success) {
        return res.status(400).json({
          success: false,
          message: response.message,
        });
      }

      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new CategoryController();
