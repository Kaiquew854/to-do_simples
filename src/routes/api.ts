import {Router} from 'express';
import * as TodoController from '../controllers/todoController'
import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './tmp');
    },

    filename: (req, file, cb)=>{
        let randomName = Math.floor(Math.random() * 9999999);
        cb(null,`${randomName+Date.now()}.jpg`);
    }
});

const upload = multer({
    storage: storageConfig
});

const router = Router();

router.get('/todo', TodoController.all);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);
router.post('/upload', upload.single('avatar'), TodoController.uploadFile);

export default router;