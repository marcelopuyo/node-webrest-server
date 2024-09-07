import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res
        .status(400)
        .json({ error: 'El parametro id debe ser numerico!' });

    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      return res.status(404).json({ error: `No existe todo con id ${id}` });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    const todo = await this.todoRepository.create(createTodoDto!);

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
        const todo = await this.todoRepository.updateById(updateTodoDto!);

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

    const todo = await this.todoRepository.deleteById(id);

    return res.json(todo);
  };
}
