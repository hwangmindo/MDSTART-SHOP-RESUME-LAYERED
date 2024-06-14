import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
  // 이력서 생성
  createResume = async (authorId, title, content) => {
    await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      }
    });

	const data = await prisma.resume.findFirst({
		where: { authorId },
		include: { author: true },
	  });

    return data;
  };

  // 이력서 목록 조회
  getAllResume = async (authorId, sort) => {
    const resumes = await prisma.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    return resumes;
  };

  // 이력서 상세 조회
  getResume = async (authorId, id) => {
    const getedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
      include: { author: true },
    });

    return getedResume;
  };

  // findUnique()
  findId = async (authorId, id) => {
    const existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    return existedResume;
  };

  // 이력서 수정
  putResume = async (authorId, id, title, content) => {
    await prisma.resume.update({
      where: { id: +id, authorId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

	const data = await prisma.resume.findFirst({
		where: { authorId },
		include: { author: true },
	  });

    return data;
  };

  // 이력서 삭제
  deleteResume = async (authorId, id) => {
    const deletedResume = await prisma.resume.delete({
      where: { id: +id, authorId },
    });

    return deletedResume;
  };
}
