import { Request, Response } from 'express';
import { generatePresignedUrl } from '../lib/r2';
import crypto from 'crypto';

export const presign = async (req: Request, res: Response) => {
  const { filename, contentType, folder } = req.body;

  const fileExtension = filename.split('.').pop();
  const storageKey = `${folder}/${crypto.randomUUID()}.${fileExtension}`;

  const result = await generatePresignedUrl(storageKey, contentType);

  res.status(200).json(result);
};
