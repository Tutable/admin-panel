import { CONTENT_PAYLOAD } from '../actions/actionTypes';

const defaultState = null;

export default (state = defaultState, { type, content }) => {
	switch(type) {
		case CONTENT_PAYLOAD:
			return content;
		default: return state;
	}
}