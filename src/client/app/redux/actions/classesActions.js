/**
 * contains actions related to teachers listing
 */
import axios from 'axios';
import {
	CLASSES_PAYLOAD,
	EDITING_CLASS,
	CATEGORIES_PAYLOAD
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
export const fetchClasses = ({ page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	axios.post(APPLICATION_ROUTES.LIST_CLASSES, { page, limit }, { headers })
		.then((response) => {
			const { data: { code, message, data, length, limit, page } } = response;
			if (code === 100) {
				// handle listing here
				dispatch({ type: CLASSES_PAYLOAD, paginatedClasses: data, page, limit, length });
				// now fetch categories listing
				axios.post(APPLICATION_ROUTES.CATEGORIES_LISTING, { parent: true })
					.then((catResponse) => {
						const { data: { code, message, data } } = catResponse;
						if (code === 100) {
							dispatch({ type: CATEGORIES_PAYLOAD, categories: data });
						}
					}).catch((catError) => {
						/**
						 * @todo handle category fetch error
						 */
					});
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
export const deleteClass = ({ id, deleted = true, page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	const body = { id, deleted };
	axios.post(APPLICATION_ROUTES.DELETE_CLASSES, body, { headers })
		.then((response) => {
			const { data: { code, message } } = response;
			if (code === 100) {
				// deleted success
				dispatch(fetchClasses({ page, limit }));
			} else {

			}
			dispatch(fetchAction({ fetching: false }))
		}).catch((err) => {
			dispatch(fetchAction({ fetching: false }))
		})
}

/**
 * toggle action to edit doctor
 * @param {*} id 
 * @param {*} toggle true/false
 */
export const toggleEditingClass = ({ id, toggle }) => (dispatch) => {
	dispatch({ type: EDITING_CLASS, editingClass: toggle ? id : undefined });
};

/**
 * update the doctor information
 * @param {*} id 
 * @param {*} name 
 * @param {*} speciality 
 * @param {*} licensedState 
 * @param {*} email 
 */
export const updateClass = ({ id, name, speciality, licensedState, email, page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	const formData = new FormData();
	// todo can add picture property if required
	formData.append('data', JSON.stringify({ id, name, speciality, licensedState, email }));
	axios.post(APPLICATION_ROUTES.UPDATE_CLASSES, formData, { headers })
		.then(response => {
			const { data: { code } } = response;
			if (code === 100) {
				dispatch(fetchClasses({ page, limit }));
			}

			dispatch(fetchAction({ fetching: false }));
			dispatch(toggleEditingClass(id, false));
		}).catch(err => {
			console.log(err);

			dispatch(fetchAction({ fetching: false }));
		});
}