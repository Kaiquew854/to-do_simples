import {Request, Response} from 'express';
import {Todo} from '../models/todo'

export const all = async  (req: Request, res: Response)=> {
    const list = await Todo.findAll();
    res.json({list});
}

export const add = async  (req: Request, res: Response)=> {
    if(req.body.title){
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });   
        res.status(201).json({item: newTodo});
    } else {
        res.json({error: 'Dados não enviados.'})
    }
}

export const update = async  (req: Request, res: Response)=> {
    
}


export const remove = async  (req: Request, res: Response)=> {
    
}