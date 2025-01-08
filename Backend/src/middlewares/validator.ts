import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateRecipe = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('steps').isArray({ min: 1 }).withMessage('At least one step is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];