import { Todos } from '../../../../app/types/kanban/index';
import { Board, BoardKeyIndex } from '@/shared/Board/Board';
import { Title } from './components/Title/Title';
import { Body } from './components/Body/Body';
import { Action } from './components/Action/Action';

interface IProjectBoard {
    board?: {[key: string]: Todos}, 
    onTaskMove?: (origin: BoardKeyIndex, target: BoardKeyIndex) => void
}

export const ProjectBoard = ({board, onTaskMove}: IProjectBoard) => {
    return (
        <>
            {board && <Board
                factory={{title: Title, body: Body, action: Action}}
                board={board}
                onTaskMove={onTaskMove}
            />}
        </>
    )
}