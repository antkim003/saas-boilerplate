import {fromJS, Map as iMap, List as iList, Record as iRecord} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_USEREDIT = 'GET_USEREDIT';
export const USEREDIT = 'userEdit';

const initialState = iMap({
  userEdit: iRecord()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USEREDIT:
      return state.merge({
        userEdit: state.get('userEdit').concat(fromJS(action.payload))
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
      id,
      name,
      active,
      permissions,
      usertype
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
