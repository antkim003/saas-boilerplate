import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_USERS = 'GET_USERS';
export const GET_USERTYPES = 'GET_USERTYPES';
export const UPDATE_USER = 'UPDATE_USER';


export const USERS = 'users';

const initialState = iMap({
  users: iList(),
  usertypes: iList(),
  user: iMap()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return state.merge({
        users: fromJS(action.payload)
      });
    case GET_USERTYPES:
      return state.merge({
        usertypes: fromJS(action.payload)
      });
    case UPDATE_USER:
      return state.merge({
        user: fromJS(action.payload)
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
export function getAllUserTypes() {
  const userTypeSchema =
  `
    {
      id,
      name
    }
  `;
  return async(dispatch, getState) => {
    console.log(getState);
    const query = `
        query {
          getAllUserTypes
          ${userTypeSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      console.log('data.getAllUserTypes', data.getAllUserTypes);
      dispatch({
        type: GET_USERTYPES,
        payload: data.getAllUserTypes
      });
    }
  };
}
export function updateUser(user) {
  const userMutation =
  `
  (
    id:${user.id},
    name:${user.name},
    active:${user.active},
    usertype:${user.usertype},
    email:${user.email},
    password:${user.password}
  )
  `;
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
        mutation {
          updateUser
          ${userMutation}
          ${userSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      console.log('data.updateUser', data.updateUser);
      dispatch({
        type: UPDATE_USER,
        payload: data.updateUser
      });
    }
  };
}
