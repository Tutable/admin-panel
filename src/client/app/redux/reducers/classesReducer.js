/**
 * action reducer for users listing admin page
 */
import {
	CLASSES_PAYLOAD,
	EDITING_CLASS,
	CATEGORIES_PAYLOAD,
} from '../actions/actionTypes';

const defaultState = {
	classesData: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingClass: undefined,
	categories: undefined,
};
/**
 * default state handler/reducer for doctor
 */
export default (state=defaultState, {
	type,
	paginatedClasses = [],
	payload,
	page = 1,
	limit = 10,
	length = 0,
	editingClass = undefined,
	categories = undefined,
}) => {
	switch(type) {
		case CATEGORIES_PAYLOAD:
			return Object.assign({}, state, { categories });
		case CLASSES_PAYLOAD:
			return Object.assign({}, state, { classesData: paginatedClasses, page, limit, length });
		case EDITING_CLASS:
			return Object.assign({}, state, { editingClass });
		default:
			return state;
	}
}