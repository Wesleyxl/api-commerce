import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@model/User";
import authConfig from "@config/auth";
import { Op } from "sequelize";

interface LoginProps {
  email: string;
  password: string;
}
interface RegisterProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  birth: string;
}

class AuthService {
  /**
   *  Create a new token based on user id
   * @param userId
   * @returns string (hash of token)
   */
  private static createUserToken(userId: number) {
    return jwt.sign({ id: userId }, authConfig.jwt_secret, {
      expiresIn: authConfig.expire_in,
    });
  }

  /**
   * sign user
   * @param email
   * @param password
   * @returns object (user data and access_token)
   */
  public async login(body: LoginProps) {
    try {
      // get user by email
      const user = await User.findOne({
        where: {
          email: {
            [Op.eq]: body.email,
          },
        },
      });

      // verify if user exists
      if (user) {
        // compare password
        const isValidPassword = await bcrypt.compare(
          body.password,
          user.password
        );

        if (isValidPassword) {
          // return user + access_token
          const token = AuthService.createUserToken(user.id);

          return {
            success: true,
            data: {
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                birth: user.birth,
                phone: user.phone,
              },
              access_token: token,
            },
          };
        }

        return {
          success: false,
          message: "Email or password is incorrect",
        };
      }
      return {
        success: false,
        message: "Email or password is incorrect",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   *  create new user
   * @params {object}
   * @returns object (user data and access_token)
   */
  public async register(body: RegisterProps) {
    try {
      const passwordHash = await bcrypt.hash(body.password, 8);

      const [user, created] = await User.findOrCreate({
        where: {
          email: {
            [Op.eq]: body.email,
          },
        },
        defaults: {
          name: body.name,
          email: body.email,
          password: passwordHash,
          birth: body.birth,
          phone: body.phone,
        },
      });

      if (created) {
        const token = AuthService.createUserToken(user.id);

        return {
          success: true,
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              birth: user.birth,
              phone: user.phone,
              image: user.image,
            },
            access_token: token,
          },
        };
      }

      return {
        success: false,
        message: "Email already exists",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * return user authenticate data
   * @param id
   * @returns user data
   */
  public async me(id: number) {
    try {
      const user = await User.findByPk(id, {
        attributes: [
          "id",
          "name",
          "email",
          "birth",
          "phone",
          "image",
          "created_at",
          "updated_at",
        ],
      });

      if (user) {
        return {
          success: true,
          data: user,
        };
      }

      return {
        success: false,
        message: "Email or password is incorrect",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new AuthService();
