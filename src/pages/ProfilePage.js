import React, { useEffect, useContext, useState } from 'react'
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'
import {Link} from 'react-navi'
import TodoList from '../TodoList'


export default function ProfilePage({id}){

  const { state, dispatch } = useContext(StateContext)

  const [todosRetrieved, setTodosRetrieved] = useState(false)
  const [todos, getTodos] = useResource(() => ({
    url:`/users/${id}`,
    method:'get'
  }))

  useEffect(() => {
    getTodos()
  }, [])

  useEffect(()=>{
    if(todos && todos.isLoading === false && todos.data){
      console.log(todos.data)
      setTodosRetrieved(true)
      dispatch({type:'FETCH_TODOS', todos:todos.data.todos})
    }
  }, [todos])

  const { data, isLoading } = todos;

  return(
    <div>
      {todosRetrieved && <TodoList  />}
      <div><Link href="/users">Go back</Link></div>
      <br />
    </div>
  )
}
