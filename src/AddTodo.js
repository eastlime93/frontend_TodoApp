import React, {useState, useContext,useEffect} from 'react'
import {StateContext} from './contexts'
import {useResource} from 'react-request-hook'
import {useNavigation} from 'react-navi'

export default function AddTodo(){
  const {state,dispatch} = useContext(StateContext)
  const {user} = state;
  const navigation = useNavigation();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [dateCreated] = useState(dateGetter())

  const [complete] = useState(false)
  const [dateCompleted] = useState('')

  const [todo, createTodo] = useResource(({title,description,dateCreated,complete,dateCompleted,user}) => ({
     url: '/todo',
     method: 'post',
     headers: {"Authorization": `${state.user.access_token}`},
     data:{title,description,dateCreated,complete,dateCompleted,user}
  }))

  function handleTitle(evt){setTitle(evt.target.value)}
  function handleDescription(evt){setDescription(evt.target.value)}

  function handleCreate(){
    console.log(user.access_token);
    createTodo({title,description,dateCreated,complete,dateCompleted,user:user.username})

  }

  useEffect(() => {
      if(todo && todo.isLoading === false && todo.data){
        dispatch({type:'CREATE_TODO', title:todo.data.title, description:todo.data.description, dateCreated:todo.data.dateCreated, complete:todo.data.complete, dateCompleted:todo.data.dateCompleted, user:user.username, id:todo.data._id})
        navigation.navigate(`/todo/${todo.data._id}`)
      }
    },[todo])

  return (
    <form onSubmit={e => {e.preventDefault(); handleCreate();}}>
        <div>User: <b>{user.username}</b></div>
        <div>
            <label htmlFor="add-title">Title:</label>
            <input type="text" value={title} onChange={handleTitle} name="add-title" id="add-titile" required/>
        </div>

        <div>
              <label htmlFor="add-description">Description:</label>
              <textarea name="add-description" value={description} onChange={handleDescription} id="add-description"/>
        </div>

        <div>
            Date Created: {dateCreated}
        </div>

        <div>
              <label htmlFor="complete-status">Complete:</label>
              <input type="checkbox" checked={complete} id="complete-status" name="complete-status" />
        </div>

        <div>
            Date Completed:{dateCompleted}

        </div>

      <input type="submit" value="Add" disabled={title.length === 0}/>

    </form>

  )
}


function dateGetter(){
  const ts = Date.now();

  const date_ob = new Date(ts);
  const date = date_ob.getDate();
  const month = date_ob.getMonth() + 1;
  const year = date_ob.getFullYear();

  const currentTime = `${year}-${month}-${date}`;
  return currentTime;
}
