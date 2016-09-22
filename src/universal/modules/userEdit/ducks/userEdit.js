import {fromJS, Map as iMap, List as iList, Record as iRecord} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_USERTOEDIT = 'GET_USEREDIT';
export const USEREDIT = 'userEdit';

const initialState = iMap({
  userEdit: iRecord()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERTOEDIT:
      return state.merge({
        userEdit: fromJS(action.payload)
      });
    default:
      return state;
  }
}
export function getUser(id) {
  const userSchema =
  `
    (id:${id}){
      email,
      id,
      name,
      active,
      permissions,
      usertype
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        query {
          getUserById
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_USERTOEDIT,
        payload: data.getUserById
      });
    }
  };
}
