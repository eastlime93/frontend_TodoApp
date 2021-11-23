function userReducer(state, action){
  switch(action.type){
    case 'LOGIN':
    case 'REGISTER':
      return {
           'username': action.username,
           'access_token': action.access_token
      }
    case 'LOGOUT':
      return {
           'username': undefined,
           'access_token': undefined
       }
    default:
      return state;
  }
}

function todoReducer(state, action){
  switch(action.type){
    case 'CREATE_TODO':
        const newTodo = {
          title:action.title,
          description:action.description,
          dateCreated:action.dateCreated,
          complete:action.complete,
          dateCompleted:action.dateCompleted,
          user:action.user,
          id:action.id
        }
        return [newTodo, ...state]
    case 'TOGGLE_TODO':
      return state.map((p) => {
        if(p._id === action.id){
          p.complete = action.completeCheck;
          p.dateCompleted = action.completedDateVal;
        }
        return p;
      })
    case 'DELETE_TODO':
      return state.filter((p) => p._id !== action.id)
    case 'FETCH_TODOS':
      return action.todos;
    case 'CLEAR_TODOS':
      state.length = 0;
      return state;
    default:
      return state;
  }
}

function userListReducer(state, action){
  switch(action.type){
    case 'FETCH_USERS':
      return action.userList;
    case 'ADD_USER':
      const newUser = {
        _id: action._id,
        username:action.username
      }
      return [...state, newUser]
    default:
      return state;
    }
  }

export default function appReducer (state, action){
  return {
    user:userReducer(state.user, action),
    todos:todoReducer(state.todos, action),
    userList:userListReducer(state.userList,action)
  }
}
