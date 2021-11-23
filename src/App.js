import appReducer from './reducers'
import {StateContext} from './contexts'
import React, {useReducer} from 'react'
import {Router, View} from 'react-navi'
import {mount, route} from 'navi'
import {Container} from 'react-bootstrap'

import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import AddTodo from './AddTodo'
import TodoPage from './pages/TodoPage'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  const [state, dispatch] = useReducer(appReducer, {user:{}, todos:[], userList:[]})

  const routes = mount({
   '/': route({ view: <HomePage /> }),
   '/users/': route({view: <UsersPage />}),
   '/users/:id':route(req => {
       return { view: <ProfilePage id={req.params.id} /> }
   }),
   '/todo/add':route({ view: <AddTodo /> }),
   '/todo/:id': route(req => {
       return { view: <TodoPage id={req.params.id} /> }
   }),
 })

  return (
    <div>
      <StateContext.Provider value={{state:state, dispatch:dispatch}}>
        <Router routes={routes}>
          <Container>
              <HeaderBar />
              <hr />
              <View />
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  )
}

export default App;
