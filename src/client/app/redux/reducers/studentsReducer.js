/**
 * action reducer for users listing admin page
 */
import {
	STUDENTS_PAYLOAD,
	EDITING_STUDENT,
} from '../actions/actionTypes';

const defaultState = {
	studentsData: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingStudent: undefined,
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
	editingStudent = undefined,
}) => {
	switch(type) {
		case STUDENTS_PAYLOAD:
			return Object.assign({}, state, { studentsData: paginatedStudents, page, limit, length });
		case EDITING_STUDENT:
			return Object.assign({}, state, { editingStudent });
		default:
			return state;
	}
}