import React, {useContext} from 'react'
import {StateContext} from './contexts'
import User from './User'

export default function UserList(){
  const {state, dispatch} = useContext(StateContext)

  return(
    <div>
      {state.userList.map((u, i) => <User {...u} key={'User-' + i} />)}
    </div>
  )
}
