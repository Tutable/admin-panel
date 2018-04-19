/**
 * The application store
 * @author gaurav sharma
 * @since 9th January 2019
 */

 import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
 import { createLogger } from 'redux-logger';
 import thunk from 'redux-thunk';
 import * as reducers from './reducers';

 // enhances combines all the middlewares.
 const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware ( thunk ) : applyMiddleware( thunk, createLogger() );

 export const initStore = ( initialState = {} ) => createStore ( combineReducers({
	 fetching: reducers.fetchReducer,
	 login: reducers.loginReducer,
	 // admin reducers
	 students: reducers.studentsReducer,
	 teachers: reducers.teachersReducer,
	 classes: reducers.classesReducer,
	 dashboard: reducers.dashboardReducer,
	 transactions: reducers.transactionsReducer,
	 navigation: reducers.navigationReducer,
	 bookings: reducers.bookingsReducer,
 }), initialState, enhancer );