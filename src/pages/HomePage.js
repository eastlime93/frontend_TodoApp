import React, { useEffect, useContext } from 'react'
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'
import TodoList from '../TodoList'


export default function HomePage () {
    const { state, dispatch } = useContext(StateContext)

    const [todos, getTodos] = useResource(() => ({
      url:'/todo',
      method:'get',
      headers: {"Authorization": `${state.user.access_token}`},
    }))

    useEffect(()=> {
      if(state.user.access_token){
        getTodos()
      }else{
        dispatch({type:"CLEAR_TODOS"})
      }
    },[])

    useEffect(() => {
      if(state.user.access_token){
        getTodos()
      }else{
        dispatch({type:"CLEAR_TODOS"})
      }
    }, [state.user.access_token])

    useEffect(()=>{
      if(todos && todos.isLoading === false && todos.data){
        console.log(todos.data)
        dispatch({type:'FETCH_TODOS', todos:todos.data.todos})
      }
    }, [todos])

    const { data, isLoading } = todos;
    return (
        <>
          {isLoading && 'Todos loading...'} <TodoList />
        </>
    )
}
