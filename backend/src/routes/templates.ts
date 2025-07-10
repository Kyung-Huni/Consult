import { Router } from 'express';
import { prisma } from '../prisma';
import { asyncHandler } from '../utils/asyncHandler';

import { validateParams } from '../middlewares/validateParams';
import { validateBody } from '../middlewares/validateBody';

import { getTemplateParamsSchema } from '../schemas/template/getTemplateParamsSchema';
import { createTemplateSchema } from '../schemas/template/createTemplateSchema';
import { updateTemplateSchema } from '../schemas/template/updateTemplateSchema';

import NotFoundError from '../errors/NotFoundError';

const router = Router();

// ✅ 템플릿 목록 (type 필터 가능)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { type } = req.query;

    const templates = await prisma.template.findMany({
      where: type ? { type: String(type) } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    res.json(templates);
  })
);

// 단일 템플릿 조회
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const template = await prisma.template.findUnique({
      where: { id: req.params.id },
    });
    if (!template)
      throw new NotFoundError({ message: '템플릿을 찾을 수 없습니다' });
    res.json(template);
  })
);

// ✅ 템플릿 생성
router.post(
  '/',
  validateBody(createTemplateSchema),
  asyncHandler(async (req, res) => {
    const { type, title, content } = req.body;

    const created = await prisma.template.create({
      data: { type, title, content },
    });

    res.status(201).json(created);
  })
);

// ✅ 템플릿 수정
router.put(
  '/:id',
  validateParams(getTemplateParamsSchema),
  validateBody(updateTemplateSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updated = await prisma.template.update({
      where: { id },
      data: { title, content },
    });

    res.json(updated);
  })
);

// ✅ 템플릿 삭제
router.delete(
  '/:id',
  validateParams(getTemplateParamsSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    await prisma.template.delete({
      where: { id },
    });

    res.status(204).end();
  })
);

export default router;
