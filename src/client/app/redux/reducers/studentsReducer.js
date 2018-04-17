/**
 * action reducer for users listing admin page
 */
import {
	STUDENTS_PAYLOAD,
	RESPONSE,
	UPDATE_DOCTOR_IMAGE,
	FETCHING_ADDRESS,
	PARSED_ADDRESS,
	CHANGE_PAYMENT_OPTIONS,
    EDITING_DOCTOR,
} from '../actions/actionTypes';

const defaultState = {
	studentsData: undefined,
	response: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingDoctor: undefined,
};
/**
 * default state handler/reducer for doctor
 */
export default (state=defaultState, {
	type,
	paginatedStudents = [],
	payload,
	page = 1,
	limit = 10,
	length = 0,
	editingDoctor = undefined,
}) => {
	switch(type) {
		case STUDENTS_PAYLOAD:
			return Object.assign({}, state, { studentsData: paginatedStudents, page, limit, length });
		case EDITING_DOCTOR:
			return Object.assign({}, state, { editingDoctor });
		default:
			return state;
	}
}