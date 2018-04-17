export { default as fetchAction } from './fetchAction';
// export { default as searchAction } from './searchAction';
export { adminLogin } from './loginActions';
/**
 * admin actions
 */
export {
	fetchDoctors,
	deleteDoctor,
	registerDoctor,
	updateDoctorImage,
	fetchAddress,
	nullifyDoctorsResponse,
	changePaymentOptions,
	toggleEditingDoctor,
	updateDoctor,
} from './adminDoctorsActions';
export { fetchConsultations, deleteConsultations } from './adminConsultationsActions';
export { fetchStatistics } from './adminDashboardActions';
export {
	fetchAilmentsList,
	toggleDropdown,
	changeFormData,
	createAnxiometerPost,
	nullifyResponse,
	toggleAddAnxiometer,
	fetchAnxiometerListing,
	removeAnxiometer,
	updateAnxiometer,
	toggleEditingAnxiometer,
} from './anxiometerActions';
export {
	fetchFeedbacks
} from './feedbackActions';
export {
	addAilment,
	nullifyAilmentsResponse
} from './ailmentActions';
export { default as switchNavigation } from './navigationActions';