import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { AuthService } from '../services/auth.service.js';
import { HttpError } from '../errors/http.error.js';

export class AuthController {
  authService = new AuthService();

  // 회원가입
  createUsers = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const existedUser = await this.authService.findUsers(email);

      if (existedUser) {
        throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
      }
	  const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

      const createdUser = await this.authService.createDatas(
        email,
        hashedPassword,
        name,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  getTokens = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.findUsers(email);
      const isPasswordMatched =
        user && bcrypt.compareSync(password, user.password);

      if (!isPasswordMatched) {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
      }

      const payload = { id: user.id };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  };
}
