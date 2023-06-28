import { createEvent, createStore } from "effector"
import { ITodo } from "../interfaces"

export const todosEvents = {
    set: createEvent<ITodo[]>(),
    add: createEvent<ITodo>(),
    change: createEvent<ITodo>(),
    delete: createEvent<number>()
}

export const $todos = createStore<ITodo[]>([])
    .on(todosEvents.set, (_, newTodos) => newTodos)
    .on(todosEvents.add, (todos, newTodo) => [...todos, newTodo])
    .on(todosEvents.change, (todos, changedTodo) => {
        return todos.map(todo => {
            if (todo.id === changedTodo.id) return changedTodo
            return todo
        })
    })
    .on(todosEvents.delete, (todos, todoId) => {
        return todos.filter(todo => todo.id !== todoId)
    })