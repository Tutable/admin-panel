import axios from 'axios';
import { CONTENT_PAYLOAD } from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': localStorage.adminAccessToken,
}

export const fetchContent = () => dispatch => {
	dispatch(fetchAction({ fetching: true }));

	axios.post(APPLICATION_ROUTES.CONTENT_DETAILS)
		.then((response) => {
			// console.log(response);
			const { data: { data } } = response;
			dispatch({ type: CONTENT_PAYLOAD, contentData: data });

			dispatch(fetchAction({ fetching: false }))
		}).catch(err => {
			/**
			 * @todo handle error responses
			 */
		})
}
/**
 * save the content
 * @param {*} param0 
 */
export const saveContent = ({ terms, help, about }) => dispatch => {
	dispatch(fetchAction({ fetching: true }));

	const body = { terms, help, about };
	axios.post(APPLICATION_ROUTES.CONTENT_SAVE, body, { headers })
		.then((response) => {
			const { data: { code, message, data } } = response;
			if (code === 100) {
				dispatch({ type: CONTENT_PAYLOAD, content: { terms, help, about }});

			} else {
				// handle other error codes here
			}
			dispatch(fetchAction({ fetching: false }))
		}).catch((err) => {
			// handle other error codes here
			dispatch(fetchAction({ fetching: false }))
		})
}
// /**
//  * @param {*} param0 
//  */
// export default ({ page = 1, limit = 30 }) => (dispatch) => {
// 	dispatch(fetchAction({ fetching: true }));


// 	axios.post(APPLICATION_ROUTES.APP_STATS, {}, { headers })
// 		.then((response) => {
// 			dispatch({ type: DASHBOARD_PAYLOAD, statistics: response.data });
// 			// const { data: { code, message, data } } = response;
// 			// if (code === 100) {
				
// 			// } else {
// 			// 	/**
// 			// 	 * @todo handle server error
// 			// 	 */
// 			// }

// 			dispatch(fetchAction({ fetching: false }));
// 		}).catch((err) => {
// 			console.log(err);

// 			dispatch(fetchAction({ fetching: false }));
// 		});
// };
