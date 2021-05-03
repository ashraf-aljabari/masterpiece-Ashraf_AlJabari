import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  createPlayground,
  getAllMyPlaygrounds,
  approvePlayground,
  getAllPlaygrounds,
} from '../controllers/playgroundController.js';
const router = express.Router();

router.route('/').post(protect, createPlayground).get(getAllPlaygrounds);
router.route('/myplaygrounds').get(protect, getAllMyPlaygrounds);
router.route('/approve/:id').post(protect, approvePlayground);

export default router;
