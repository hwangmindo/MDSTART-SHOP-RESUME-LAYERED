import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { ResumesService } from '../services/resumes.service.js';
import { HttpError } from '../errors/http.error.js';
export class ResumesController {
  resumesService = new ResumesService();

  // 이력서 생성
  createResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const createdResume = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data: createdResume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 목록 조회
  getAllResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      let { sort } = req.query;
      sort = sort?.toLowerCase();

      const getedAllResume = await this.resumesService.getAllResume(
        authorId,
        sort,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data: getedAllResume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 상세 조회
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;

      const getedResume = await this.resumesService.getResume(authorId, id);

      if (!getedResume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: getedResume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 수정
  putResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      const { title, content } = req.body;

      const existedResume = await this.resumesService.findId(authorId, id);

      if (!existedResume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }

      const putInResume = await this.resumesService.putResume(
        authorId,
        id,
        title,
        content,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: putInResume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 삭제
  deleteResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      const existedResume = await this.resumesService.findId(authorId, id);

      if (!existedResume) {
        throw new HttpError.NotFound(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      }

      const deletedResume = await this.resumesService.deleteResume(authorId, id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: deletedResume.id,
      });
    } catch (error) {
      next(error);
    }
  };
}
