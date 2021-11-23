import React from 'react'
import Todo from './Todo'

export default function UserTodoList({todos}){

  return(
    <div>
      {todos.map((t, i) => <Todo {...t} key={'Todo-' + i} todoId={i} />)}
    </div>
  )
}
