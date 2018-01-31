import {
    ADD_STORE,
} from '../actions/store';

const store = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_STORE: {
        const { public_key } = action;
        newState.pop();
        newState.push({public_key});
        return newState;
      }
      default:{
        return newState;
      }
  }
}

export default store;
