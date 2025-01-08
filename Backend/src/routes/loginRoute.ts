import { Router } from 'express';
import LoginController from '../controllers/login'

const router: Router = Router();

// POST /api/login
router.post('/', LoginController.login);

export default router;