/**
 * action reducer for teachers listing admin page
 */
import {
	TRANSACTIONS_PAYLOAD,
    EDITING_TRANSACTION,
} from '../actions/actionTypes';

const defaultState = {
	transactionsData: undefined,
	page: 0,
	limit: 30,
	length: 0,
	editingTransaction: undefined,
};
/**
 * default state handler/reducer for doctor
 */
export default (state=defaultState, {
	type,
	paginatedTransactions = [],
	payload,
	page = 1,
	limit = 10,
	length = 0,
	editingTransaction = undefined,
}) => {
	switch(type) {
		case TRANSACTIONS_PAYLOAD:
			return Object.assign({}, state, { transactionsData: paginatedTransactions, page, limit, length });
		case EDITING_TRANSACTION:
			return Object.assign({}, state, { editingTransaction });
		default:
			return state;
	}
}