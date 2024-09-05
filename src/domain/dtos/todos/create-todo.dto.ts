
export class CreateTodoDto {

  private constructor(public readonly text: string) {};

  static create(props: {[key: string]: any}) : [string?, CreateTodoDto?] {2
    const { text } = props;
    if (!text) return ['Propiedad texto requerida', undefined];
    return [undefined, new CreateTodoDto(text)];
  };
};