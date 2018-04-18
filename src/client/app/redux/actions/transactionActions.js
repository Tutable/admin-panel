/**
 * contains actions related to teachers listing
 */
import axios from 'axios';
import {
	TRANSACTIONS_PAYLOAD,
	EDITING_TRANSACTION,
} from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': localStorage.adminAccessToken,
}

/**
 * fetch users
 * @param {*} dispatch 
 */
export const fetchTransactions = ({ page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	axios.post(APPLICATION_ROUTES.LIST_TRANSACTIONS, { page, limit }, { headers })
		.then((response) => {
			const { data: { code, message, data, length, limit, page } } = response;
			if (code === 100) {
				// handle listing here
				dispatch({ type: TRANSACTIONS_PAYLOAD, paginatedTransactions: data, page, limit, length });
			} else {
				// handle error here
			}

			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle server error
			dispatch(fetchAction({ fetching: false }));
		})
}
/**
 * action to remove a user
 * @param {String} id
 * @param {Boolean} deleted
 * 
 * @todo handle http failures
 */
// export const deleteTransaction = ({ id, deleted = true, page = 1, limit = 30 }) => (dispatch) => {
// 	dispatch(fetchAction({ fetching: true }));
// 	const body = { id, deleted };
// 	axios.post(APPLICATION_ROUTES.DELETE_TRANSACTION, body, { headers })
// 		.then((response) => {
// 			const { data: { code, message } } = response;
// 			if (code === 100) {
// 				// deleted success
// 				dispatch(fetchTransactions({ page, limit }));
// 			} else {

// 			}
// 			dispatch(fetchAction({ fetching: false }))
// 		}).catch((err) => {
// 			dispatch(fetchAction({ fetching: false }))
// 		})
// }

// /**
//  * toggle action to edit doctor
//  * @param {*} id 
//  * @param {*} toggle true/false
//  */
// export const toggleEditingTransaction = (id, toggle) => (dispatch) => {
// 	dispatch({ type: EDITING_TRANSACTION, editingTransaction: toggle ? id : undefined });
// };

/**
 * update the doctor information
 * @param {*} id 
 * @param {*} name 
 * @param {*} speciality 
 * @param {*} licensedState 
 * @param {*} email 
 */
// export const updateTransaction = ({ id, name, speciality, licensedState, email, page = 1, limit = 30 }) => (dispatch) => {
// 	dispatch(fetchAction({ fetching: true }));
// 	const formData = new FormData();
// 	// todo can add picture property if required
// 	formData.append('data', JSON.stringify({ id, name, speciality, licensedState, email }));
// 	axios.post(APPLICATION_ROUTES.UPDATE_TRANSACTION, formData, { headers })
// 		.then(response => {
// 			const { data: { code } } = response;
// 			if (code === 100) {
// 				dispatch(fetchTransactions({ page, limit }));
// 			}

// 			dispatch(fetchAction({ fetching: false }));
// 			dispatch(toggleEditingTransaction(id, false));
// 		}).catch(err => {
// 			console.log(err);

// 			dispatch(fetchAction({ fetching: false }));
// 		});
// }