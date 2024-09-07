

export class TodoEntity {

  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {};

  get isCompleted() {
    return !!this.completedAt;
  };

  public static fromObject(object: {[key: string]: any}): TodoEntity {
    const { id, text, completedAt } = object;
    return new TodoEntity(id, text, completedAt);
  };
}