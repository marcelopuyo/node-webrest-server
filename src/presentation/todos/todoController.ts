import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';

export class TodosController {
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: 'El parametro id debe ser numerico!' });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `No existe todo con id ${id}` });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id: id,
    });

    if (error) {
      return res.status(400).json({ error: error });
    } else {
      const oldTodo = await prisma.todo.findFirst({
        where: {
          id: id,
        },
      });

      if (!oldTodo) {
        return res.status(404).json({ error: `No existe todo con id ${id}` });
      } else {
        const todo = await prisma.todo.update({
          where: { id: id },
          data: updateTodoDto!.values,
        });

        return res.json(todo);
      }
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: 'El parametro id debe ser numerico!' });

    let todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `No existe todo con id ${id}` });

    todo = await prisma.todo.delete({
      where: { id: id },
    });

    return res.json(todo);
  };
}
