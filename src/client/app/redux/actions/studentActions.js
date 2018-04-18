/**
 * contains actions related to admin users listing
 */
import axios from 'axios';
import {
	STUDENTS_PAYLOAD,
    EDITING_STUDENT,
} from './actionTypes';
import { fetchAction } from '.';
import { APPLICATION_ROUTES, GOOGLE_GEO_URL_LOCATION } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': localStorage.adminAccessToken,
}

/**
 * fetch users
 * @param {*} dispatch 
 */
export const fetchStudents = ({ page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	axios.post(APPLICATION_ROUTES.LIST_STUDENTS, { page, limit }, { headers })
		.then((response) => {
			const { data: { code, message, data, length, limit, page } } = response;
			if (code === 100) {
				// handle listing here
				dispatch({ type: STUDENTS_PAYLOAD, paginatedStudents: data, page, limit, length });
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
export const deleteEntity = ({ userEmail, deleted = true, page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	const body = { userEmail, deleted };
	axios.post(APPLICATION_ROUTES.DELETE_ENTITY, body, { headers })
		.then((response) => {
			const { data: { code, message } } = response;
			if (code === 100) {
				// deleted success
				dispatch(fetchStudents({ page, limit }));
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
export const toggleEditingStudent = ({ id, toggle }) => (dispatch) => {
	dispatch({ type: EDITING_STUDENT, editingStudent: toggle ? id : undefined });
};
/**
 * verify the entity
 * @param {*} param0 
 */
export const  verifyEntity = ({ userEmail, page, limit }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	const body = { userEmail };

	axios.post(APPLICATION_ROUTES.VERIFY_ENTITY, body, { headers })
		.then((response) => {
			const { data: { code } } = response;
			if (code == 100) {
				dispatch(fetchStudents({ page, limit }));
			}

			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle rejection
			dispatch(fetchAction({ fetching: false }));
		})
}

/**
 * update the doctor information
 * @param {*} id 
 * @param {*} name 
 * @param {*} speciality 
 * @param {*} licensedState 
 * @param {*} email 
 */
export const updateStudent = ({ id, name, email, updateEmail, page = 1, limit = 30 }) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	const body = { userId: id, name, userEmail: email, updateEmail };
	
	axios.post(APPLICATION_ROUTES.UPDATE_ENTITY, body, { headers })
		.then(response => {
			const { data: { code } } = response;
			console.log(code);
			if (code === 100) {
				dispatch(fetchStudents({ page, limit }));
			}

			dispatch(fetchAction({ fetching: false }));
			dispatch(toggleEditingStudent(id, false));
		}).catch(err => {
			console.log(err);

			dispatch(fetchAction({ fetching: false }));
		});
}