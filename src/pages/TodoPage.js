import React, { useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'
import {StateContext} from '../contexts'
import { Link } from 'react-navi'
import Todo from '../Todo'

export default function TodoPage ({ id }) {
    const {state} = useContext(StateContext)
    const {user} = state

    const [ todo, getTodo ] = useResource(() => ({
        url: `/todo/${id}`,
        method: 'get',
        headers: {"Authorization": `${user.access_token}`}
    }))

    useEffect(getTodo, [id])

    useEffect(getTodo, [state.todos])

    return (
        <div>
            {(todo && todo.data)
                ? <Todo {...todo.data} />
                : ''
            }
            <div><Link href="/">Go Home</Link></div>
            <br />
        </div>
    )
}
