import {fetchGraphQL} from '../../../utils/fetching';

export const getArticles = (dispatch, variables) => {
  // dispatch({type: LOGIN_USER_REQUEST});
  return new Promise(async (resolve, reject) => {
    const query = `
    query{getAllArticles{title}}`;

    const {error, data} = await fetchGraphQL({query, variables});
    if (error) {
      reject(error);
    } else {
      console.log('Wow data inside ducks', data);
      return data;
      // const {payload} = data;
      // dispatch(loginUserSuccess(payload));
      // dispatch(push(redirect));
      // resolve();
    }
  });
};
