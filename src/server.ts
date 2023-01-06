import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mainRoutes from './routes/routes'

dotenv.config()
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(mainRoutes);


server.use((req, res)=>{
    res.send('page not found')
})
server.listen(process.env.PORT);
