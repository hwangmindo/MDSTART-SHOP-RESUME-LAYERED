import { ResumesRepository } from '../repositories/resumes.repository.js';
export class ResumesService {
  resumesRepository = new ResumesRepository();

  // 이력서 생성
  createResume = async (authorId, title, content) => {
    const createdResume = await this.resumesRepository.createResume(
      authorId,
      title,
      content,
    );

    return {
      id: createdResume.id,
      authorName: createdResume.author.name,
      title: createdResume.title,
      content: createdResume.content,
      status: createdResume.status,
      createdAt: createdResume.createdAt,
      updatedAt: createdResume.updatedAt,
    };
  };

  // 이력서 목록 조회
  getAllResume = async (authorId, sort) => {
    if (sort !== 'desc' && sort !== 'asc') {
      sort = 'desc';
    }

    const resumes = await this.resumesRepository.getAllResume(authorId, sort);

    return resumes.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  // 이력서 상세 조회
  getResume = async (authorId, id) => {
	const getedResume = await this.resumesRepository.getResume(authorId, id);
  
	  return {
		id: getedResume.id,
		authorName: getedResume.author.name,
		title: getedResume.title,
		content: getedResume.content,
		status: getedResume.status,
		createdAt: getedResume.createdAt,
		updatedAt: getedResume.updatedAt,
	  };
  };

  // findUnique()
  findId = async (authorId, id) => {
	const existedResume = await this.resumesRepository.findId(authorId, id);

	return existedResume;
  };

  // 이력서 수정
  putResume = async (authorId, id, title, content) => {
	const putInResume = await this.resumesRepository.putResume(
        authorId,
        id,
        title,
        content,
      );

	  return {
		id: putInResume.id,
		authorName: putInResume.author.name,
		title: putInResume.title,
		content: putInResume.content,
		status: putInResume.status,
		createdAt: putInResume.createdAt,
		updatedAt: putInResume.updatedAt,
	  };
  };

  // 이력서 삭제
  deleteResume = async (authorId, id) => {
	const deletedResume = await this.resumesRepository.deleteResume(authorId, id);

	return deletedResume;
  };
}
