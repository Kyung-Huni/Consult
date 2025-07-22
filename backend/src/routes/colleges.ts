// routes/colleges.ts
import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../prisma';

import {
  AuthenticatedRequest,
  authenticateJWT,
} from '../middlewares/authMiddleware';

dotenv.config();
const router = Router({ mergeParams: true });

// GET /colleges?limit=1000&name=harv
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { limit = 50, name } = req.query;

    const colleges = await prisma.college.findMany({
      where: name
        ? {
            name: {
              contains: String(name),
              mode: 'insensitive',
            },
          }
        : undefined,
      take: Number(limit),
      orderBy: { name: 'asc' },
    });

    res.json(colleges);
  })
);

router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const { name } = req.query;
    try {
      const response = await axios.get(
        'https://api.data.gov/ed/collegescorecard/v1/schools.json',
        {
          params: {
            'school.name': name,
            api_key: process.env.COLLEGE_API_KEY,
          },
        }
      );

      const simplified = response.data.results.map((item: any) => ({
        id: item.id.toString(),
        name: item.school.name,
        location: `${item.school.city}, ${item.school.state}`,
      }));

      res.json({ results: simplified });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch college data' });
    }
  })
);

// /colleges/searchById
router.get(
  '/searchById',
  asyncHandler(async (req, res) => {
    const { id } = req.query;
    try {
      const response = await axios.get(
        'https://api.data.gov/ed/collegescorecard/v1/schools.json',
        {
          params: {
            id,
            api_key: process.env.COLLEGE_API_KEY,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch college data' });
    }
  })
);

// PUT /colleges/:id - 메모/즐겨찾기 저장
router.put(
  '/:id',
  authenticateJWT,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const { name, location, note, isFavorite } = req.body;

    try {
      const college = await prisma.college.upsert({
        where: { id },
        update: {
          note: note ?? undefined,
          isFavorite: isFavorite ?? undefined,
        },
        create: {
          id,
          name: name ?? 'Unknown', // 외부 API에서 이름을 저장하지 않는 경우 placeholder
          location: location ?? '',
          note: note ?? '',
          isFavorite: isFavorite ?? false,
        },
      });

      res.json(college);
    } catch (err) {
      console.error('College 저장 실패:', err);
      res.status(500).json({ error: 'College 저장 중 오류 발생' });
    }
  })
);

// routes/college.ts

router.get(
  '/:id',
  asyncHandler(async (req, res): Promise<any> => {
    const { id } = req.params;

    const college = await prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }

    res.json(college);
  })
);

export default router;
