import { useState } from 'react'
import { createPortal } from 'react-dom'
import { todosEvents } from '../stores/todos'

export default function Modal(props: {
    isOpen: boolean
    onClose: () => void
}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    if (!props.isOpen) return null

    return createPortal(
        <>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000
            }} className='bg-[#1a192292]' onClick={props.onClose} />

            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
            }} className='rounded-xl p-3 bg-white flex flex-col'>
                <div className='flex justify-end items-center font-bold text-2xl'>
                    <button onClick={props.onClose}>X</button>
                </div>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="!px-2 !py-1 !rounded-md !border !border-gray-200 mt-3"
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Description"
                    className="!px-2 !py-1 !rounded-md !border !border-gray-200 mt-1.5"
                />

                <button
                    className="mt-3 bg-blue-700 py-2 rounded-xl uppercase text-white font-bold transition hover:bg-blue-900"
                    onClick={() => {
                        todosEvents.add({
                            id: Date.now(),
                            title,
                            body
                        })
                        setTitle('')
                        setBody('')
                        props.onClose()
                    }}
                >
                    Add
                </button>
            </div>
        </>, document.getElementById('portal') as Element
    )
}