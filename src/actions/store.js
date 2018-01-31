export const ADD_STORE = 'ADD_STORE';

export const addStore = (
  public_key,
) =>{
  return {
    type: ADD_STORE,
    public_key,
  }
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

export const loadStore = () =>{
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/public_key.json', {
      method: 'GET',
    }).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then((responseJson) => {
      var pubKey = responseJson.key;
      dispatch(addStore(responseJson.key));
    });
  }
}
