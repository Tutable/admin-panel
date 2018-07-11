/**
 * This file defines application level constants
 */
export const SERVER_BASE_URL = process.env.NODE_ENV ? "https://betutable.com.au/production/api/" : "http://localhost:3001/api/";
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
	// appplications static content
	CONTENT_DETAILS:			`${SERVER_BASE_URL}content/details`,
	CONTENT_SAVE:				`${SERVER_BASE_URL}content/save`,
	// certifcate URLs
	VERIFY_CERTS:				`${SERVER_BASE_URL}certificates/verifyCerts`,
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
