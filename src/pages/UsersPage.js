import React, {useEffect, useState, useContext } from 'react'
import { StateContext } from '../contexts'
import {useResource} from 'react-request-hook'
import UserList from '../UserList'
import {Link} from 'react-navi'

export default function UsersPage(){
  const{state, dispatch} = useContext(StateContext);

  const [userRetrieved, setUserRetrieved] = useState(false)
  const [users, getUsers] = useResource(() => ({
    url:'/users',
    method:'get'
  }))

  useEffect(getUsers, [])

  useEffect(() => {
    if(users && users.isLoading === false && users.data){
      setUserRetrieved(true);
      dispatch({type:"FETCH_USERS", userList:users.data})
    }
  }, [users])

  return(
    <>
      <h3>Registered Users:</h3><br />
      {userRetrieved && <UserList />}
      <div><Link href="/">Go home</Link></div>
      <br />
    </>
  )
}
