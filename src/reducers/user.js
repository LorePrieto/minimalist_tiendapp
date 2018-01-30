import {
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/user';

const user = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case LOGIN_USER: {
        const { email, cartID } = action;
        newState.pop();
        newState.push({email, cartID});
        return newState;
      }
      case LOGOUT_USER: {
        newState.pop();
        return newState;
      }
      default:{
        return newState;
      }
  }
}

export default user;
