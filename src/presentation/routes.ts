import { Router } from "express";
import { TodosRoutes } from "./todos/todoRoute";



export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    router.use('/api/todos', TodosRoutes.routes);

    return router;
  };

};