import {
    ADD_TIENDAPP,
} from '../actions/tiendapp';

const tiendapp = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_TIENDAPP: {
        const { public_key } = action;
        newState.pop();
        newState.push({public_key});
        return newState;
      }
      default:{
        return state;
      }
  }
}

export default tiendapp;
