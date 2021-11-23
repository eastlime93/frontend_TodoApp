import React, {useContext, useEffect} from 'react'
import {StateContext} from './contexts'
import {useResource} from 'react-request-hook'
import {Card, Container} from 'react-bootstrap'
import {Link} from 'react-navi'

export default function Todo({title, description, dateCreated, complete, dateCompleted, user, id, _id, todoId, short = false}){

  const {state, dispatch} = useContext(StateContext)

  let processedDescription = description

  if (short) {
       if (description.length > 30) {
            processedDescription = description.substring(0, 30) + '...'
       }
  }

  const [deletedTodo, deleteTodo] = useResource((id) => ({
    url:`/todo/${encodeURI(id)}`,
    method:'delete',
    headers: {"Authorization": `${state.user.access_token}`},
  }))

  const [updatedTodo, toggleTodo] = useResource(({complete}, id) => ({
    url:`/todo/${encodeURI(id)}`,
    method:'patch',
    headers: {"Authorization": `${state.user.access_token}`},
    data:{complete:!complete, dateCompleted:completeDateGetter(!complete)}
  }))

  useEffect(() => {
    if(deletedTodo && deletedTodo.isLoading === false && deletedTodo.data){
      dispatch({type:"DELETE_TODO", id:_id})
    }
  }, [deletedTodo])

  useEffect(() => {
    if(updatedTodo && updatedTodo.isLoading === false && updatedTodo.data){
      dispatch({type:"TOGGLE_TODO", completeCheck:updatedTodo.data.complete, completedDateVal:updatedTodo.data.dateCompleted, id:_id})
    }
  }, [updatedTodo])

  return(
    <Container>
    <Card bg={"Light".toLowerCase()} text={"dark"}>
      <Card.Body>
          <Card.Title><Link href={`/todo/${_id}`}>{title}</Link></Card.Title>
          <Card.Subtitle>
          <i>Added by <b>{user}</b></i><br /><br />
          </Card.Subtitle>
          <Card.Text>
            <div>{processedDescription}</div><br />
            <div><i>Date Created: {dateCreated}</i></div><br />
            <div><i>Complete: <input type="checkbox" checked={complete} onClick={e=> toggleTodo({complete}, _id)} /></i></div>
            <br />
            <div><i>Date Completed: {dateCompleted}</i></div>
            <br />
            <button onClick={e =>deleteTodo(_id)}>Delete</button>
          </Card.Text>
          {short && <Link href={`/todo/${_id}`}>View full todo</Link>}
        </Card.Body>
      </Card>
      <br />
    </Container>
 )
}

function completeDateGetter(complete){
    let currentTime ="";
    if(complete){
      const ts = Date.now();

      const date_ob = new Date(ts);
      const date = date_ob.getDate();
      const month = date_ob.getMonth() + 1;
      const year = date_ob.getFullYear();

      currentTime = `${year}-${month}-${date}`;
  }
    return currentTime;
}
