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
	 adminDoctorsListing: reducers.adminDoctorsListingReducer,
	 adminConsultationsListing: reducers.adminConsultationsListingReducer,
	 dashboard: reducers.adminDashboard,
	 anxiometer: reducers.anxiometerReducer,
	 feedback: reducers.feedbacksReducer,
	 ailments: reducers.ailmentsReducer,
	 navigation: reducers.navigationReducer,
 }), initialState, enhancer );