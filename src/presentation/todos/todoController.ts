import { Request, Response } from 'express';

let todos = [
  { id: 1, text: 'Comprar leche', createdAt: new Date() },
  { id: 2, text: 'Comprar pan', createdAt: null },
  { id: 3, text: 'Comprar huevos', createdAt: new Date() },
];

export class TodosController {

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: 'El parametro id debe ser numerico!' });

    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `No existe todo con id ${id}` });
  };

  public createTodo = (req: Request, res: Response) => {

    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'El campo texto es requerido!' });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null
    };

    todos.push(newTodo);

    return res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {

    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: 'El parametro id debe ser numerico!' });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `No existe todo con id ${id}` });

    const { text, createdAt } = req.body;

    todo.text = text || todo.text;

    (createdAt === 'null')
      ? todo.createdAt = null
      : todo.createdAt = new Date(createdAt || todo.createdAt);

    return res.json(todo);

  };

  public deleteTodo = (req: Request, res: Response) => {

    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: 'El parametro id debe ser numerico!' });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `No existe todo con id ${id}` });

    todos = todos.filter(todo => todo.id !== id);

    return res.json(todo);

  };


}
