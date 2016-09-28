import {fromJS, Map as iMap, List as iList} from 'immutable';
import {fetchGraphQL} from '../../../utils/fetching';

export const GET_PROJECTS = 'GET_PROJECTS';

export const PROJECTS = 'projects';

const initialState = iMap({
  projects: iList()
});

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return state.merge({
        projects: fromJS(action.payload)
      });
    default:
      return state;
  }
}
// get all users
//
export function getAllProjects() {
  const projectSchema =
  `{
      id,
      name,
      description
    }
  `;
  return async(dispatch, getState) => {
    const query = `
        query {
          getAllProjects
          ${projectSchema}
        }`;
    const {error, data} = await fetchGraphQL({query});
    if (error) {
      console.error(error);
    } else {
      dispatch({
        type: GET_PROJECTS,
        payload: data.getAllProjects
      });
    }
  };
}
