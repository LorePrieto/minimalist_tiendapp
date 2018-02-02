export const ADD_TIENDAPP = 'ADD_TIENDAPP';

/*
  Action to add information to local tiendapp.
*/
export const addTiendapp = (
  public_key
) =>{
  return {
    type: ADD_TIENDAPP,
    public_key
  }
}

/*
  Action to fetch TiendApp's information about the store
  and saving it to local tiendapp.
*/
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
