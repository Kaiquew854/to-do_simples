import { Request, Response } from 'express';
import { Todo } from '../models/todo'
import sharp from 'sharp'; //biblioteca para manipular arquivos
import { unlink } from 'fs/promises' //deletar imagens

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({ list });
}

export const add = async (req: Request, res: Response) => {
    if (req.body.title) {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201).json({ item: newTodo });
    } else {
        res.json({ error: 'Dados não enviados.' })
    }
}

export const update = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if (todo) {
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case '0':
                case 'false':
                    todo.done = false;
                    break;
                case '1':
                case 'true':
                    todo.done = true;
                    break;
            }
        }

        await todo.save();
        res.json({ item: todo });

    } else {
        res.json({ error: 'item não encontrado.' })
    }
}


export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    let todo = await Todo.findByPk(id);
    if (todo) {
        await todo.destroy();
    }
    res.json({})
}

export const uploadFile = async (req: Request, res: Response) => {
    if (req.file) {
        const filename = `${req.file.filename}.jpg`
        await sharp(req.file.path)
            .resize(500)
            .toFormat('jpeg')
            .toFile(`./public/media/${filename}`)//salvar

        await unlink(req.file.path); //deletando da pasta temporaria   

        res.json({ image: `${filename}` })
    } else {
        res.status(400)
        res.json({ error: 'Arquivo inválido' })
    }
}
