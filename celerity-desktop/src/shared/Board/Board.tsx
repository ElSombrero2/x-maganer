import React, { useRef, useState } from "react"
import { Draggable } from "./Draggable/Draggable"
import './Board.scss'
import { Todos } from "../../app/types/kanban"
import { Textarea } from "@/ui/components/ui/textarea"
import { Button } from "@/ui/components/ui/button"

export type BoardKeyIndex = {index?: number, key: string}

export interface IBoard { 
    board: {[key: string]: Todos},
    factory: {
        title: (key: string) => React.ReactElement,
        body: (data: any) => React.ReactElement,
    },
    onTaskMove?: (origin: BoardKeyIndex, target: BoardKeyIndex) => void
}

const getOrigin = (e: React.DragEvent<HTMLDivElement>) => {
    const o = e.dataTransfer.getData('origin')
    const i = e.dataTransfer.getData('index')
    return { key: o, index: parseInt(i) }
}

export function Board({ board, factory, onTaskMove }: IBoard){
    const parent = useRef<HTMLDivElement>(null)
    const drop = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()
    const [isWriting, setIsWriting] = useState<boolean>(false)
    const submit = () => {
        setIsWriting(false)
    }

    return (
        <div className="board-wrapper w-full h-full" ref={parent}>
            <div className="board flex gap-8" onDragOver={drop}>
                {Object.keys(board).sort((a, b) => board[a].id - board[b].id).map((key, boardIndex) => (
                    <div
                        onDrop={(e) => onTaskMove && board[key].todos.length === 0 && onTaskMove(getOrigin(e), {key})}
                        key={`${key}-${boardIndex}`}
                        className="column rounded-md border p-4 flex flex-col"
                    >
                        {factory.title(key)}
                        {board[key].todos.map((data: any, columnIndex: number) => (
                            <Draggable index={columnIndex}
                                origin={key}
                                key={columnIndex}
                                among={parent}
                                onDrop={
                                    (e, position) => onTaskMove 
                                    && onTaskMove(getOrigin(e), {index: columnIndex + position, key })
                                }
                            >
                                {factory.body(data)}
                            </Draggable>
                        ))}
                        {!isWriting && <Button variant="ghost" onClick={() => setIsWriting(true)}>
                            <i className="fa fa-add"></i>
                            &nbsp;Add Card
                        </Button>}
                        {isWriting && (
                            <div className="flex gap-5">
                                <Textarea className="resize-none bg-accent" placeholder="Write some task...">
                                </Textarea>
                                <Button onClick={submit}>Submit</Button>
                            </div>
                        )}
                    </div>       
                ))}
            </div>
        </div>
    )
}