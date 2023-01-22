import { Router } from 'express';
import * as TodoController from '../controllers/todoController'
import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },

    filename: (req, file, cb) => {
        let randomName = Math.floor(Math.random() * 9999999);
        cb(null, `${randomName + Date.now()}.jpg`);
    }
}
);

const upload = multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => { //aceitar apenas os arquivos que eu quiser
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
        cb(null, allowed.includes(file.mimetype));
    },
    limits: {fieldSize: 1000000} //limite de 1 mb

});

const router = Router();

router.get('/todo', TodoController.all);
router.post('/todo', TodoController.add);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.remove);
router.post('/upload', upload.single('avatar'), TodoController.uploadFile);

export default router;