// routes/colleges.ts
import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../prisma';

dotenv.config();
const router = Router();

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
      res.json(response.data);
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

export default router;
