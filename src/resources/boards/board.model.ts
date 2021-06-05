import { v4 } from 'uuid';

export type InitialBoard = {
  title: string;

  columns: {
    title: string;
    order: number;
  }[];
};

class Board {
  id: string;

  title: string;

  columns: {
    title: string;
    order: number;
  }[];

  constructor(boardData: InitialBoard) {
    const { title, columns } = boardData;
    this.id = v4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
