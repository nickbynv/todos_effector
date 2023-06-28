import { todosEvents } from "../stores/todos"

export const fetchTodos = async () => {
    const response = await fetch("https://648b411917f1536d65eaada6.mockapi.io/tasks")
    const data = await response.json()
    todosEvents.set(data)
}