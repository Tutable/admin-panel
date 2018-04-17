/**
 * the action emitter for account page
 */
import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_ACCOUNT_LISTING,
	ACCOUNT_LISTING_PAYLOAD,
	ACCOUNT_PAYLOAD,
	TOGGLE_EDIT_ACCOUNT,
	EDIT_DATA_UPDATED,
	EDIT_ADDRESS_UPDATED,
	ACCOUNT_UPDATE_PAYLOAD,
	TOGGLE_ACCOUNTS,
	TOGGLE_COLLAPSE_BAR,
	CHANGE_NAVIGATION_INDEX,
	TOGGLE_UPLOAD,
	ADD_IMAGES,
	UPLOAD_OWNER_GALLERY,
	CHANGE_OWNER_PICTURE
} from './actionTypes';
import { fetchAction, 
	fetchPosts, 
	fetchEvents, 
	fetchFollowersListing, 
	fetchNotifications,
	resetMessages,
} from '.';
import { APPLICATION_ROUTES, DEFAULT_COUNTRY_CODE, GOOGLE_GEO_URL_LOCATION } from '../../constants';

const headers = {
	'Content-Type': 'application/json',
	'Authorization': localStorage.accessToken
}
// fetch the account listing
export const fetchAccountListing = () => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.ACCOUNTS_LISTING, {}, { headers })
		.then((response) => {
			// handle server response
			const { data: { code, message, data: { data } } } = response;
			if (code === 100) {
				const accounts = data;
				dispatch({ type: ACCOUNT_LISTING_PAYLOAD, accounts });
				dispatch(fetchAction({ fetching: false }));
			} else {
				dispatch({ type: ACCOUNT_LISTING_PAYLOAD, accounts: [] });
				dispatch(fetchAction({ fetching: false }));
			}
		}).catch((err) => {
			// handle server error response
			// todo handle server rejection errors
			dispatch(fetchAction({ fetching: false }));
		})
}

/** 
 * ftetch the account details
*/
export const fetchAccountDetails = () => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.OWNER_DETAILS, {}, { headers })
		.then((response) => {
			// handle the response codes, message and data here
			// console.log(response);
			const { data: { message }, data } = response;
			if (data) {
				dispatch({ type: ACCOUNT_PAYLOAD, business: data });
			} else {
				// handle no response
				dispatch({ type: ACCOUNT_PAYLOAD, business: {}, message, code })
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle the errors here
			// todo handle server rejections error
			console.log(err);
		})
}

/**
 * trigger the business edit action
 * @param {*} editedBusiness the data representing the edited business
 */
export const editDataUpdate = (editedBusiness) => {
	return { type: EDIT_DATA_UPDATED, editedBusiness };
}

/**
 * parse coordinates and update the edit location value
 * @param {*} address thr inpute address from form
 */
export const parseEditCoordinates = address => (dispatch) => {
	axios.get(GOOGLE_GEO_URL_LOCATION(address))
		.then((success) => {
			const { data: { results }, status } = success;
			if (status === 200 && results && results.length) {
				const { formatted_address, geometry: { location: { lat, lng }}} = results[0];
				dispatch({ type: EDIT_ADDRESS_UPDATED, formattedAddress: { location: formatted_address, type: 'Point' , coordinates: [lat, lng] }});
			}
		}).catch((err) => {
			console.log('ERR');
		})
}

/**
 * use this to call thetrigger to update the account information
 * @param {*} account 
 */
export const triggerAccountUpdate = account => (dispatch) => {
	dispatch(fetchAction({ fetching: true }))
	const { businessName, contactNumber, email, address, tradingHours } = account;
	if (businessName || contactNumber || email || address || tradingHours ) {
		// make an update call
		axios.post(APPLICATION_ROUTES.OWNER_UPDATE, account, { headers })
			.then((response) => {
				// handle propert server responses here
				const { data: { code, message } } = response;
				if (code === 100) {
					// handle success
					dispatch({ type: ACCOUNT_UPDATE_PAYLOAD, editedBusiness: account });
					dispatch(fetchAccountListing());
				} else {
					dispatch({ type: ACCOUNT_UPDATE_PAYLOAD });
				}
				dispatch(fetchAction({ fetching: false }));
			}).catch(err => {
				// handle the server errors here
				dispatch(fetchAction({ fetching: false }))
			});
	}
}

/**
 * this action handles the account toggling process
 * The flow is as follows
 * - fetch the club details based upon the club id provided
 * - reduce the existing business data in the satte with the on received
 * @param {*} id 
 */
export const toggleBusinessAccounts = businessId => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.CLUB_DETAILS, { businessId })
		.then((response) => {
			// handle the success here
			const { data: { code, message, data } } = response;
			if (code === 100) {
				// handle success
				dispatch({ type: TOGGLE_ACCOUNTS, business: data });
				dispatch(fetchPosts(businessId));
				dispatch(fetchEvents(businessId));
				dispatch(fetchFollowersListing(businessId));
				dispatch(fetchNotifications(businessId));
				dispatch(resetMessages());

				const { pathname } = window.location;
				if (pathname.startsWith('/conversation')) {
					browserHistory.push('/messages');
				}
			} else {
				// handle error
			}

			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle the server error here
			console.log('Account fetching error:', err);
			dispatch(fetchAction({ fetching: false }));
		});
}

/**
 * trigger toggling editing mode enabled/disabled
 * @param {Boolean} toggle 
 */
export const toggleEditAccount = (toggle) => {
	return { type: TOGGLE_EDIT_ACCOUNT, editing: toggle };
}

// toggle collapse bar
export const toggleCollapseBar = toggle => {
	return { type: TOGGLE_COLLAPSE_BAR,  collapsed: toggle };
}

/**
 * change left navigation item index
 * @param {Number} to 
 */
export const changeLeftNavigation = to => {
	return { type: CHANGE_NAVIGATION_INDEX, activeTab: to };
}

// show/hide toggle content
export const toggleUpload = toggle => {
	return { type: TOGGLE_UPLOAD, showUpload: toggle };
}

// organize the selected images data set
export const addImages = images => {
	return { type: ADD_IMAGES, uploadImagesList: images }; 
}

// trigger upload action here
export const ownerGalleryUpload = (images, businessId) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));

	// prepare multipart form data
	// console.log(images, businessId);
	const formdata = new FormData();
	images.map((image, index) => formdata.append(`image${index}`, image));
	formdata.append('businessId', businessId);
	axios.post(APPLICATION_ROUTES.UPLOAD_CLUB_PICTURES, formdata, { headers })
		.then((response) => {
			// handler server response 
			const { data: { code, message } } = response;
			if (code === 100) {
				// handle upload success
				// trigger updating business account
				axios.post(APPLICATION_ROUTES.CLUB_DETAILS, { businessId })
					.then((clubResponse) => {
						// handle club success response
						const { data: { code, message, data } } = clubResponse;
						if (code === 100) {
							// dispatch updating the business account
							dispatch({ type: TOGGLE_ACCOUNTS, business: data });
							dispatch(toggleUpload(false));
						}else {
							// handle club details response error
						}

						dispatch(fetchAction({ fetching: false }))
					}).catch((err) => {
						// handle club error respons
						dispatch(fetchAction({ fetching: false }))
					})
			} else {
				// handler API error
				dispatch(fetchAction({ fetching: false }))
			}
		}).catch((err) => {
			// handle server error
			dispatch(fetchAction({ fetching: false }))
		})
}
/**
 * trigger uploading profile picture
 * @param {*} image 
 */
export const uploadProfilePicture = (image, businessId) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	const formData = new FormData();
	formData.append('businessId', businessId);
	formData.append('picture', image);
	axios.post(APPLICATION_ROUTES.OWNER_UPLOAD_PROFILE_PIC, formData, { headers })
		.then((response) => {
			// handle uplaod success
			const { data: { code, message, data } } = response;
			console.log(response);
			if ( code === 100) {
				// hndle successful upload
				dispatch({ type: CHANGE_OWNER_PICTURE, uploadedPicture: data });
			} else {
				// handle upload failure
				dispatch({ type: PICTURE_SIZE_LARGE });
			}
			dispatch(fetchAction({ fetching: false }));
		}).catch((err) => {
			// handle server failure
			// console.log(err);
			dispatch(fetchAction({ fetching: false }));
		})
}

/**
 * trigger removing the gallery pic
 */
export const removeGalleryPic = (businessId, galleryImage) => (dispatch) => {
	dispatch(fetchAction({ fetching: true }));
	axios.post(APPLICATION_ROUTES.REMOVE_GALLERY_PIC, { businessId, galleryImage }, { headers })
		.then((response) => {
			const { data: { code, message } } = response;
			if (code === 100) {
				axios.post(APPLICATION_ROUTES.CLUB_DETAILS, {businessId })
					.then((clubResponse) => {
						const { data: { code, message, data } } = clubResponse;
						if(code === 100) {
							dispatch({ type: TOGGLE_ACCOUNTS, business: data });
						} else {

						}
						dispatch(fetchAction({ fetching: false }));
					}).catch((clubError) => {
						// handle error response
						dispatch(fetchAction({ fetching: false }));
					});
			}
			console.log(response);
		}).catch((err) => {
			// handle the server error
			dispatch(fetchAction({ fetching: false }));
		});
}