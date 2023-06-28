import { useState } from "react"
import { ITodo } from "../interfaces"
import { todosEvents } from "../stores/todos"

export default function Todo(props: {
    todo: ITodo
}) {
    const [title, setTitle] = useState(props.todo.title)
    const [body, setBody] = useState(props.todo.body)

    const [editMode, setEditMode] = useState(false)

    const inputStylesLogic = `
        ${editMode && `!bg-white !px-2 !py-1 !rounded-xl !border !cursor-text`}
    `

    return (
        <div className="bg-white flex flex-col border p-3 rounded-xl mt-3 first:mt-0">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={"font-bold text-xl bg-transparent cursor-default" + inputStylesLogic}
                readOnly={!editMode}
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={"mt-2 resize-none bg-transparent h-24 cursor-default" + inputStylesLogic}
                readOnly={!editMode}
            />

            <div className="flex justify-end mt-3">
                {editMode ? (
                    <button
                        className="bg-green-600 text-white uppercase text-sm font-bold px-3 py-1.5 rounded-md transition-colors hover:bg-green-800"
                        onClick={() => {
                            todosEvents.change({ ...props.todo, title, body })
                            setEditMode(false)
                        }}
                    >
                        Apply
                    </button>
                ) : (
                    <button
                        className="bg-blue-700 text-white uppercase text-sm font-bold px-3 py-1.5 rounded-md transition-colors hover:bg-blue-900" onClick={() => setEditMode(true)}
                    >
                        Edit
                    </button>
                )}

                <button
                    className="bg-red-700 text-white uppercase text-sm font-bold px-3 py-1.5 rounded-md ml-3 transition-colors hover:bg-red-900"
                    onClick={() => todosEvents.delete(props.todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}