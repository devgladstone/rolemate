import express from 'express';
import { uploadController, deleteController } from '../controllers/aws.js';

const router = express.Router();

router.post('/upload', uploadController);
router.post('/delete', deleteController);

export default router;
