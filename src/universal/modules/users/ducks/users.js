import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_USERS = 'GET_USERS';
export const USERS = 'users';

const initialState = iMap({
  users: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      console.log('action is here: ', action);
      return state.merge({
        users: state.get('users').concat(fromJS(action.payload))
      });
    default:
      return state;
  }
}
export function getUsers() {
  const userSchema =
  `
    {
      email,
      id
    }
  `;
  return async(dispatch, getState) => {
    console.log(getState);
    const query = `
        query {
          getAllUsers
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_USERS,
        payload: data.getAllUsers
      });
    }
  };
}
