import axios from 'axios';
import { DASHBOARD_PAYLOAD } from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': localStorage.adminAccessToken,
}

/**
 * @param {*} param0 
 */
export default ({ page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));


	axios.post(APPLICATION_ROUTES.APP_STATS, {}, { headers })
		.then((response) => {
			dispatch({ type: DASHBOARD_PAYLOAD, statistics: response.data });
			// const { data: { code, message, data } } = response;
			// if (code === 100) {
				
			// } else {
			// 	/**
			// 	 * @todo handle server error
			// 	 */
			// }

			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			console.log(err);

			dispatch(fetchAction({ fetching: false }));
		});
};
