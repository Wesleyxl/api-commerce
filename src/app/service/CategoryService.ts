import Service from "./Service";
import Category from "@model/Category";

class CategoryService extends Service {
  public async createCategory(name: string) {
    try {
      const [category, created] = await Category.findOrCreate({
        where: { name },
        defaults: { name },
      });

      if (created) {
        return {
          success: true,
          data: {
            category: {
              id: category.id,
              name: category.name,
            },
          },
        };
      }

      return {
        success: false,
        message: `Category ${category.name} already exists}`,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  public async getCategories() {
    try {
      const categories = await Category.findAll();

      if (categories.length > 0) {
        return {
          success: true,
          data: categories,
        };
      }

      return {
        success: false,
        message: "No categories found",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  public async showCategory(id: string) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return {
          success: false,
          message: "Category not found",
        };
      }

      return {
        success: true,
        data: {
          category,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  public async updateCategory(id: string, name: string) {
    try {
      const category = await Category.update({ name }, { where: { id } });
      if (category) {
        return {
          success: true,
          data: category,
        };
      }

      return {
        success: false,
        message: "Something went wrong",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  public async deleteCategory(id: string) {
    try {
      const category = await Category.destroy({ where: { id } });
      if (!category) {
        return {
          success: false,
          message: "Something went wrong",
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new CategoryService();
