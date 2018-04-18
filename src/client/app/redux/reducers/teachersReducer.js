/**
 * action reducer for teachers listing admin page
 */
import {
	TEACHERS_PAYLOAD,
    EDITING_TEACHER,
} from '../actions/actionTypes';

const defaultState = {
	teachersData: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingTeacher: undefined,
};
/**
 * default state handler/reducer for doctor
 */
export default (state=defaultState, {
	type,
	paginatedTeachers = [],
	payload,
	page = 1,
	limit = 10,
	length = 0,
	editingTeacher = undefined,
}) => {
	switch(type) {
		case TEACHERS_PAYLOAD:
			return Object.assign({}, state, { teachersData: paginatedTeachers, page, limit, length });
		case EDITING_TEACHER:
			return Object.assign({}, state, { editingTeacher });
		default:
			return state;
	}
}