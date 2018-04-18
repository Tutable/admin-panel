/**
 * action reducer for users listing admin page
 */
import {
	BOOKINGS_PAYLOAD,
	EDITING_BOOKING,
} from '../actions/actionTypes';

const defaultState = {
	bookingsData: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingBooking: undefined,
};
/**
 * default state handler/reducer for doctor
 */
export default (state=defaultState, {
	type,
	paginatedBookings = [],
	payload,
	page = 1,
	limit = 10,
	length = 0,
	editingBooking = undefined,
}) => {
	switch(type) {
		case BOOKINGS_PAYLOAD:
			return Object.assign({}, state, { bookingsData: paginatedBookings, page, limit, length });
		case EDITING_BOOKING:
			return Object.assign({}, state, { editingBooking });
		default:
			return state;
	}
}