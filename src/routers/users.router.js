import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get('/me', requireAccessToken, usersController.getUsers);

export { usersRouter };

// usersRouter.get('/me', requireAccessToken, (req, res, next) => {
//   try {
//     const data = req.user;

//     return res.status(HTTP_STATUS.OK).json({
//       status: HTTP_STATUS.OK,
//       message: MESSAGES.USERS.READ_ME.SUCCEED,
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
