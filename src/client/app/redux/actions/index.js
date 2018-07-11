export { default as fetchAction } from './fetchAction';
// export { default as searchAction } from './searchAction';
export { adminLogin } from './loginActions';
/**
 * admin actions
 */
export {
	fetchStudents,
	toggleEditingStudent,
	updateStudent,
	verifyEntity,
	deleteEntity,
} from './studentActions';
export {
	fetchTeachers,
	updateTeacher,
	deleteTeacherEntity,
	toggleEditingTeacher,
	verifyTeacherEntity,
	verifyCerts,
} from './teacherActions';
export {
	fetchClasses,
	toggleEditingClass,
	updateClass,
	deleteClass,
} from './classesActions';
export { fetchBookings } from './bookingsActions';
export { fetchTransactions } from './transactionActions';
export { default as switchNavigation } from './navigationActions';
export { default as fetchStatistics } from './dashboardActions';
export { fetchContent, saveContent } from './contentActions';
