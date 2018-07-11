import { CONTENT_PAYLOAD } from '../actions/actionTypes';

const defaultState = null;

export default (state = defaultState, { type, contentData }) => {
	switch(type) {
		case CONTENT_PAYLOAD:
			return Object.assign({}, state, { contentData });
		default: return state;
	}
}