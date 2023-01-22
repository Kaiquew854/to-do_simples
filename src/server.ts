import express, { Request, Response, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mainRoutes from './routes/api'
import { MulterError } from 'multer'

dotenv.config()
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(mainRoutes);


server.use((req, res) => {
    res.send('page not found')
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); //bad request

    if (err instanceof MulterError) {
        res.json({ error: err.code });
    } else{
        console.log(err);
        res.json({error: 'ocorreu algum erro no arquivo'});
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);
