import {Router} from 'express';
import * as TodoController from '../controllers/todoController'
import multer from 'multer';

const upload = multer({
    dest: './tmp'
});

const router = Router();

router.get('/todo', TodoController.all);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);
router.post('/upload', upload.single('avatar'), TodoController.uploadFile);

export default router;