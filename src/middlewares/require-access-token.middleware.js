import jwt from 'jsonwebtoken';
import { MESSAGES } from '../constants/message.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { HttpError } from '../errors/http.error.js';

const usersRepository = new UsersRepository();

export const requireAccessToken = async (req, res, next) => {
  try {
    // 인증 정보 파싱
    const authorization = req.headers.authorization;

    // Authorization이 없는 경우
    if (!authorization) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
    }

    // JWT 표준 인증 형태와 일치하지 않는 경우
    const [type, accessToken] = authorization.split(' ');

    if (type !== 'Bearer') {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE);
    }

    // AccessToken이 없는 경우
    if (!accessToken) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN);
      
    }

    let payload;
    try {
      payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    } catch (error) {
      // AccessToken의 유효기한이 지난 경우
      if (error.name === 'TokenExpiredError') {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.EXPIRED);
      }
      // 그 밖의 AccessToken 검증에 실패한 경우
      else {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.INVALID);
      }
    }

    // Payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
    const { id } = payload;
    const user = await usersRepository.findUserBpw(id);

    if (!user) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
