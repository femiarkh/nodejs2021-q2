import { v4 } from 'uuid';

class Board {
  id: string;

  title: string;

  columns: {
    title: string;
    order: number;
  }[];

  constructor({
    id = v4(),
    title = 'BOARD',
    columns = [{ title: '', order: -1 }],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: Board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;
