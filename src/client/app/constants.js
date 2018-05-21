/**
 * This file defines application level constants
 */
export const SERVER_BASE_URL = process.env.NODE_ENV ? "https://backend.tutable.com/development/api/" : "http://localhost:3000/api/";
export const APPLICATION_ROUTES = {
	// admin URLS
	ADMIN_LOGIN: 				`${SERVER_BASE_URL}admin/authenticate`,
	LIST_STUDENTS:				`${SERVER_BASE_URL}student/list`,
	LIST_TEACHERS:				`${SERVER_BASE_URL}teachers/list`,
	LIST_CLASSES:				`${SERVER_BASE_URL}class/listAll`,
	LIST_BOOKINGS:				`${SERVER_BASE_URL}bookings/list`,
	LIST_TRANSACTIONS:			`${SERVER_BASE_URL}payments/list`,
	// update the student and teacher entity
	UPDATE_ENTITY:				`${SERVER_BASE_URL}admin/update`,
	VERIFY_ENTITY:				`${SERVER_BASE_URL}admin/verify`,
	DELETE_ENTITY:				`${SERVER_BASE_URL}admin/delete`,
	UPDATE_CLASS:				`${SERVER_BASE_URL}admin/classUpdate`,
	DELETE_CLASS:				`${SERVER_BASE_URL}admin/deleteClass`,
	APP_STATS:					`${SERVER_BASE_URL}admin/statistics`,
	CATEGORIES_LISTING:			`${SERVER_BASE_URL}categories/list`,

	CONTENT_DETAILS:			`${SERVER_BASE_URL}content/details`,
	CONTENT_SAVE:				`${SERVER_BASE_URL}content/save`,
	// ADMIN_STATS:				`${SERVER_BASE_URL}admin/stats`,
	// DELETE_DOCTOR:				`${SERVER_BASE_URL}doctors/delete`,
	// DOCTOR_PICTURE:				`${SERVER_BASE_URL}doctors/picture/`,
	// REGISTER_DOCTOR:			`${SERVER_BASE_URL}doctors/register`,
	// UPDATE_DOCTOR:				`${SERVER_BASE_URL}doctors/updateAdmin`,
	// LIST_CONSULTATIONS:			`${SERVER_BASE_URL}admin/listConsultations`,
	// DELETE_CONSULTATIONS: 		`${SERVER_BASE_URL}consultation/adminDelete`,
	// AILMENTS_LISTING:			`${SERVER_BASE_URL}ailment/list`,
	// ANXIOMETER_LISTING:			`${SERVER_BASE_URL}anxiometer/listAll`,
	// CREATE_ANXIOMETER:			`${SERVER_BASE_URL}anxiometer/create`,
	// REMOVE_ANXIOMETER: 			`${SERVER_BASE_URL}anxiometer/remove`,
	// LIST_FEEDBACK:				`${SERVER_BASE_URL}feedback/list`,
	// ADD_AILMENT:				`${SERVER_BASE_URL}ailment/add`,
	// UPDATE_ANXIOMETER:				`${SERVER_BASE_URL}anxiometer/update`,
};
export const SUPPORTED_IMAGE_MIMES=['image/jpeg','image/png'];
export const ASSET_TYPES = {
	IMAGE: 'image',
	VIDEO: 'video',
	AUDIO: 'audio',
}
export const ASSETS_MAPPING = {
	IMAGE: 0,
	VIDEO: 1,
	AUDIO: 2,
};

export const navigationIndexer = {
	'dashboard': 1,
	'students': 2,
	'teachers': 3,
	'classes': 4,
	'bookings': 5,
	'transactions': 6,
	'categories': 7,
	'content': 8,
}

// export const MAPS_API_KEY='AIzaSyDyuUeVZlCxg2uO3Mtgk1OakL0KQ-FgHHo';
// export const GOOGLE_GEO_URL_LOCATION = location => `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${MAPS_API_KEY}`;