import React, {useContext, useState} from 'react'
import {StateContext} from '../contexts'
import Login from './Login'
import Logout from './Logout'
import Registration from './Registration'
import {Button} from 'react-bootstrap'

export default function UserBar(){

  const {state} = useContext(StateContext)

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  if(state.user.username){
      return <Logout />
    }else{
      return (
            <div className="justify-content-end">
                <Button variant="link" onClick={(e) => setShowLogin(true)}>
                    Login
                </Button>
                <Login show={showLogin} handleClose={() => setShowLogin(false)} />
                <Button variant="link" onClick={(e) => setShowRegister(true)}>
                    Register
                </Button>
                <Registration show={showRegister} handleClose={() => setShowRegister(false)} />
            </div>
      )
    }

}
