import { Router } from 'express';
//import { authenticate } from '../middleware/auth.js';
import { getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestruct } from '../controllers/GadgetController.js';

const router = Router();

router.get('/', getAllGadgets);
router.post('/', addGadget);
router.patch('/:id', updateGadget);
router.delete('/:id', decommissionGadget);
router.post('/:id/self-destruct', selfDestruct);

export default router;
