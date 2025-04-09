import { Router } from 'express';
import { ProductController } from '../controllers/products';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new ProductController();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);
router.post('/', authenticate, controller.createProduct);
router.put('/:id', authenticate, controller.updateProduct);
router.delete('/:id', authenticate, controller.deleteProduct);

export const productRoutes = router;