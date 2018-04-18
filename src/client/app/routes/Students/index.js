/**
 * feedbacks listing component page route
 */
import React, { Component } from 'react';
import { connect }  from 'react-redux';
import {
	Table,
	Button,
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';

import { SERVER_BASE_URL, APPLICATION_ROUTES, navigationIndexer } from '../../constants';
import LoadingOverlay from '../../components/LoadingOverlay';
import Image from '../../components/Image';
import {
	switchNavigation,
	fetchStudents,
	toggleEditingStudent,
	updateStudent,
	verifyEntity,
	deleteEntity,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class StudentsListing extends Component {
	
	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchStudents } = this.props;
		triggerSwitchNavigation(navigationIndexer.students);
		triggerFetchStudents();
	}

	componentDidUpdate() {
		document.title = 'Students listing';
	}

	componentDidMount() {
		document.title = 'Students listing';
	}

	handlePaginationNext(e) {
		e.preventDefault();
		// const { students: { page, limit, length }, triggerFetchFeedbacks } = this.props;
		toast.dismiss();
		if (length < limit) {
			// no more data
			toast.info('No more data');
		} else {
			// console.log(`fetch page ${page+1} with ${limit} items`);
			// triggerFetchFeedbacks(page+1, limit)
		}
	}

	handlePaginationBack(e){
		e.preventDefault();
		toast.dismiss();
		// const { feedback: { length, page, limit }, triggerFetchFeedbacks } = this.props;
		if (page > 1) {
			// console.log(`fetch page ${page-1} with ${limit} items`);
			// triggerFetchFeedbacks(page-1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}

	render() {
		const {
			fetching,
			students: {
				studentsData,
				editingStudent,
				limit,
				page,
			}, 
			triggerToggleEditingStudent,
			triggerUpdateStudent,
			triggerVerifyEntity,
			triggerDeleteEntity,
		} = this.props;

		return <section>
			<ToastContainer />
			{LoadingOverlay({ show: fetching })}
			<h2>Students</h2>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8 }}>
				<thead>
					<tr>
						<th>#</th>
						<th></th>
						<th>Name</th>
						<th>Linked account</th>
						<th>Email</th>
						<th>address</th>
						<th>Verification</th>
						<th>Delete</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						studentsData ? 
							studentsData.map((student, index) => {
								const imageUrl = student.picture ? student.picture.indexOf('http') !== -1 ? student.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${student.picture}`: undefined;
								return <tr key={`student-${index}`}>
									<td>
										{index+1}
									</td>
									<td><Image image={imageUrl}/></td>
									<td>
										{
											editingStudent === student._id ?
												<input type='text' className='input-field' ref={ name => this.name = name } placeholder={student.name}/> :
												student.name
										}
									</td>
									<td>
									{
										student.facebook ? 
											<FontAwesome style={{ color: '#4468b0' }} name="facebook"/> :
											student.google ?
												<FontAwesome style={{ color: '#e8453c'}} name="google"/> :
												<FontAwesome style={{ color: '#ce8b14' }} name="envelope"/>
									}</td>
									<td>
										{
											editingStudent === student._id ?
												<input type='email' className='input-field' ref={ email => this.email = email } placeholder={student.email}/> :
												student.email
										}
									</td>
									<td>{student.address.location}</td>
									<td>
										{
											student.isVerified ?
												'Verified':
												<button onClick={() => triggerVerifyEntity(student.email, page, limit)} className='btn-sm app-btn verify'>Verify</button>
										}
										{/* {student.isVerified ? 'Yes': 'No'} */}
									</td>
									<td>
										<button onClick={() => triggerDeleteEntity(student.email, student.deleted ? false : true, page, limit)} className={ student.deleted ? 'btn-sm app-btn recover' : 'btn-sm app-btn delete'}>
											{ student.deleted ? 'Recover': 'Delete' }		
										</button>
									</td>
									<td>
										{
											editingStudent && editingStudent === student._id ?
												<p>
													<button className='btn btn-sm app-btn green' onClick={() => {
															const name = this.name.value || undefined;
															const email = this.email.value || undefined;
															triggerUpdateStudent({ id: student._id, name, email: student.email, updateEmail: email, limit, page });
															// alert(this.name.value);
															// alert(this.email.value);
														}}>
														Update
													</button>&nbsp;
													<button className='btn btn-sm app-btn recover' onClick={() => triggerToggleEditingStudent(student._id)}>Cancel</button>
												</p> :
												<button className='btn btn-sm btn-default' onClick={() => triggerToggleEditingStudent(student._id, true)}>
													Edit
												</button>
										}
									</td>
								</tr>
							}) :
							<tr>
								<td colSpan="7">No data</td>
							</tr>
					}
				</tbody>
			</Table>
			<section className='text-center'>
				<button className='app-btn btn-sm plain paginationBack'>
					<FontAwesome name='chevron-left'/>
				</button>
				&nbsp;&nbsp;
				<button className='app-btn btn-sm plain paginationNext'>
					<FontAwesome name='chevron-right'/>
				</button>
			</section>
		</section>
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerFetchStudents: (page, limit) => dispatch(fetchStudents({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerToggleEditingStudent: (id, toggle) => dispatch(toggleEditingStudent({ id, toggle })),
		triggerUpdateStudent: ({ id, name, email, updateEmail, limit, page }) => dispatch(updateStudent({ id, name, email, updateEmail, limit, page })),
		triggerVerifyEntity: (email, page, limit) => dispatch(verifyEntity({ userEmail: email, page, limit })),
		triggerDeleteEntity: (email, deleted, page, limit) => dispatch(deleteEntity({ userEmail: email, deleted, page, limit })),
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, students } = state;
	return { fetching, students };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentsListing);
