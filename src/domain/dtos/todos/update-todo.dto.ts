
export class UpdateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {};

  get values() {
    const returnObj: {[key: string]: any} = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    
    return returnObj;
  };

  static create(props: {[key: string]: any}) : [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) {
      return ['Propiedad id debe ser un numero', undefined];
    };

    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['Propiedad completedAt debe ser una fecha valida', undefined];
      };
    };
    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  };
};