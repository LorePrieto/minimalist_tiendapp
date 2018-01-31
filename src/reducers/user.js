import {
    ADD_USER,
    LOGOUT_USER
} from '../actions/user';

const user = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_USER: {
        const { email, cartID, token } = action;
        newState.pop();
        newState.push({email, cartID, token});
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
