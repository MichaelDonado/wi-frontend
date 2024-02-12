import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const corsMiddleware = cors({
  methods: ['GET', 'OPTIONS'],
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result: Error | unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
