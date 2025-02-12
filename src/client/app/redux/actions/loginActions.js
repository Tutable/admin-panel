import { LOGIN_FETCH, LOGIN_PAYLOAD, FETCHING } from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES } from '../../constants';
import axios from 'axios';

export default ({ username, password }) => (dispatch) => {
	const body ={ username, password };
	axios.post(APPLICATION_ROUTES.ADMIN_LOGIN, body, {
		headers: { 'Content-Type': 'application/json' }
	})
		.then((response) => {
			const { code, message, accessToken } = response;

			dispatch({ type: LOGIN_PAYLOAD, response, status: 0 });
			dispatch({ type: FETCHING, fetching: false })
		}).catch((err) => {
			console.log(err);
			dispatch({ type: LOGIN_PAYLOAD, response: {data: { code: 104, message: 'Invalid username/password' } , status: 1 }});
			dispatch({ type: FETCHING, fetching: false })
		})
};

/** 
 * trigger admin login
 * @param {String} username
 * @param {String} password
*/
export const adminLogin = ({ username, password }) => (dispatch) => {
	const body = { username, password };
	dispatch(fetchAction({ fetching: true  }));
	axios.post(APPLICATION_ROUTES.ADMIN_LOGIN, body)
		.then((response) => {
			// handle the server success response
			const { data: { code, message, data } } = response;
			console.log(response);
			dispatch({ type: LOGIN_PAYLOAD, response, code });
			dispatch(fetchAction({ fetching: false }));

		}).catch((err) => {
			// handle no connection to the server
			dispatch(fetchAction({ fetching: false }));
		})
}