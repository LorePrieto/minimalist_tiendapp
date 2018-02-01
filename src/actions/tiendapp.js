export const ADD_TIENDAPP = 'ADD_TIENDAPP';

export const addTiendapp = (
  public_key,
) =>{
  return {
    type: ADD_TIENDAPP,
    public_key,
  }
}

export const loadTiendapp = () =>{
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/public_key.json', {
      method: 'GET',
    }).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then((responseJson) => {
      dispatch(addTiendapp(responseJson.key));
    });
  }
}
