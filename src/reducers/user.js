import {
    ADD_USER,
    REMOVE_USER
} from '../actions/user';

const user = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_USER: {
        const {
          email,
          token,
          order_number,
          order_token
        } = action;
        newState.pop();
        newState.push({
          email,
          token,
          order_number,
          order_token
        });
        return newState;
      }
      case REMOVE_USER: {
        newState.pop();
        return newState;
      }
      default:{
        return state;
      }
  }
}

export default user;
