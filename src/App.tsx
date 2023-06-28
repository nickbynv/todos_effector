import { useList } from "effector-react"
import { useEffect, useState } from "react"
import Modal from "./components/Modal"
import Todo from "./components/Todo"
import { fetchTodos } from "./queries/fetchTodos"
import { $todos } from "./stores/todos"

export default function App() {
  useEffect(() => {
    fetchTodos()
  }, [])

  const todos = useList($todos, (todo) => (
    <Todo key={todo.id} todo={todo} />
  ))

  const [modalToggle, setModalToggle] = useState(false)

  return <>
    <div className="flex flex-col text-3xl p-3 overflow-auto">
      <ul>
        {todos}
      </ul>

      <button
        className="px-7 py-3 border rounded-xl bg-white text-xl uppercase font-bold absolute right-3 top-3 z-10 transition-colors hover:bg-blue-100"
        onClick={() => setModalToggle(true)}
      >
        Add
      </button>
    </div>

    <Modal
      isOpen={modalToggle}
      onClose={() => setModalToggle(false)}
    />
  </>
}