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
	fetchTeachers,
	switchNavigation,
	verifyEntity,
	deleteTeacherEntity,
	updateTeacher,
	toggleEditingTeacher,
	verifyTeacherEntity,
	verifyCerts,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class TeachersListing extends Component {
	
	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchTeachers } = this.props;
		triggerSwitchNavigation(navigationIndexer.teachers);
		triggerFetchTeachers();
	}

	componentDidUpdate() {
		document.title = 'Students listing';
	}

	componentDidMount() {
		document.title = 'Students listing';
	}

	handlePaginationNext(e) {
		e.preventDefault();
		const { teachers: { page, limit, length }, triggerFetchTeachers } = this.props;
		toast.dismiss();
		if (length < limit) {
			// no more data
			toast.info('No more data');
		} else {
			// console.log(`fetch page ${page+1} with ${limit} items`);
			triggerFetchTeachers(page+1, limit)
		}
	}

	handlePaginationBack(e){
		e.preventDefault();
		toast.dismiss();
		const { teachers: { length, page, limit }, triggerFetchTeachers } = this.props;
		if (page > 1) {
			// console.log(`fetch page ${page-1} with ${limit} items`);
			triggerFetchTeachers(page-1, limit);
		} else {
			toast.info('Cannot go back anymore');
		}
	}

	render() {
		const {
			fetching,
			teachers: {
				teachersData,
				editingTeacher,
				page,
				limit,
			},
			triggerToggleEditingTeacher,
			triggerUpdateTeacher,
			triggerDeleteTeacherEntity,
			triggerVerifyTeacherEntity,
			triggerVerifyCerts,
		} = this.props;
		return <section>
			<ToastContainer />
			{LoadingOverlay({ show: fetching })}
			<h2>Teachers</h2>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8 }}>
				<thead>
					<tr>
						<th>#</th>
						<th></th>
						<th>Name</th>
						<th>Linked account</th>
						<th>Email</th>
						<th>Address</th>
						<th>Verification</th>
						<th>Delete</th>
						<th>Actions</th>
						<th>Certifications</th>
					</tr>
				</thead>
				<tbody>
					{
						teachersData ? 
							teachersData.map((teacher, index) => {
								const imageUrl = teacher.picture ? teacher.picture.indexOf('http') !== -1 ? teacher.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${teacher.picture}`: undefined;
								return <tr key={`teacher-${index}`}>
									<td>
										{index+1}
									</td>
									<td><Image image={imageUrl}/></td>
									<td>
										{/* {teacher.name} */}
										{
											editingTeacher === teacher._id ?
												<input type='text' className='input-field' ref={ name => this.name = name } placeholder={teacher.name}/> :
												teacher.name
										}
									</td>
									<td>
									{
										teacher.facebook ? 
											<FontAwesome style={{ color: '#4468b0' }} name="facebook"/> :
											teacher.google ?
												<FontAwesome style={{ color: '#e8453c'}} name="google"/> :
												<FontAwesome style={{ color: '#ce8b14' }} name="envelope"/>
									}</td>
									<td>
										{
											editingTeacher === teacher._id ?
												<input type='email' className='input-field' ref={ email => this.email = email } placeholder={teacher.email}/> :
												teacher.email
										}
									</td>
									<td>{teacher.address  && teacher.address.suburb}, {teacher.address  && teacher.address.state}</td>
									<td>
										{
											teacher.isVerified ?
												'Verified':
												<button className='btn-sm app-btn verify' onClick={() => triggerVerifyTeacherEntity(teacher.email, page, limit)}>Verify</button>
										}
										{/* {teacher.isVerified ? 'Yes': 'No'} */}
									</td>
									<td>
										<button onClick={() => triggerDeleteTeacherEntity(teacher.email, teacher.deleted ? false : true, page, limit)} className={ teacher.deleted ? 'btn-sm app-btn recover' : 'btn-sm app-btn delete'}>
											{ teacher.deleted ? 'Recover': 'Delete' }		
										</button>
									</td>
									<td>
										{
											editingTeacher && editingTeacher === teacher._id ?
												<p>
													<button className='btn btn-sm app-btn green' onClick={() => {
															const name = this.name.value || undefined;
															const email = this.email.value || undefined;
															triggerUpdateTeacher({ id: teacher._id, name, email: teacher.email, updateEmail: email, limit, page });
														}}>
														Update
													</button>&nbsp;
													<button className='btn btn-sm app-btn recover' onClick={() => triggerToggleEditingTeacher(teacher._id)}>Cancel</button>
												</p> :
												<button className='btn btn-sm btn-default' onClick={() => triggerToggleEditingTeacher(teacher._id, true)}>
													Edit
												</button>
										}
									</td>
									<td>
										{
											teacher.certs ?
												<section>
													{
														teacher.certs.childrenCertificate ? 
															<span>
																<a href={`${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length - 1)}${teacher.certs.childrenCertificate}`} className='btn app-btn btn-sm verify'>Teacher Certificate</a>
																&nbsp;<button onClick={() => triggerVerifyCerts({ id: teacher._id, childrenCertificateVerified: true, page, limit })} className='btn btn-app btn-sm btn-success'>Verify Children Certificates</button><br/>
																<a href={`mailto:${teacher.email}?Subject=Resend children certificate`}>Request Children Certificate</a>
															</span> : 
															<a href={`mailto:${teacher.email}?Subject=Missing%20Children%20Certificate`} target="_top">Request Children Certificate</a>
													}
													<hr/>
													{
														teacher.certs.policeCertificate ?
															<span>
																<a href={`${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length - 1)}${teacher.certs.policeCertificate}`} className='btn app-btn btn-sm verify'>Police Certificate</a>
																&nbsp;<button onClick={() => triggerVerifyCerts({ id: teacher._id, policeCertificateVerified: true, page, limit })} className='btn btn-app btn-sm btn-success'>Verify Police Certificate</button><br/>
																<a href={`mailto:${teacher.email}?Subject=Resend police verification`}>Request Police Certificate</a>
															</span> :
															<a href={`mailto:${teacher.email}?Subject=Missing%20Police%20Certificate`} target="_top">Request Police Certificate</a>
													}
												</section>
												:
												<a href={`mailto:${teacher.email}?Subject=Missing%20Children and Police %20Certificates`} target="_top">Request Police and Teacher certificate</a>
										}
										<hr/>
										{
											teacher.degree ? 
												<span>
													<a href={`${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length - 1)}${teacher.degree}`} className='btn app-btn btn-sm verify'>Degree</a><br/>
													<a href={`mailto:${teacher.email}?Subject=Resend Degree document`}>Request Degree</a>
												</span> :
													<a href={`mailto:${teacher.email}?Subject=Resend Degree document`}>Request Degree</a>
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
				<button className='app-btn btn-sm plain paginationBack' onClick={this.handlePaginationBack}>
					<FontAwesome name='chevron-left'/>
				</button>
				&nbsp;&nbsp;
				<button className='app-btn btn-sm plain paginationNext' onClick={this.handlePaginationNext}>
					<FontAwesome name='chevron-right'/>
				</button>
			</section>
		</section>
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerFetchTeachers: (page, limit) => dispatch(fetchTeachers({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerToggleEditingTeacher: (id, toggle) => dispatch(toggleEditingTeacher({ id, toggle })),
		triggerVerifyTeacherEntity: (email, page, limit) => dispatch(verifyTeacherEntity({ userEmail: email, page, limit })),
		triggerDeleteTeacherEntity: (email, deleted, page, limit) => dispatch(deleteTeacherEntity({ userEmail: email, deleted, page, limit })),
		triggerUpdateTeacher: ({ id, name, email, updateEmail, page, limit }) => dispatch(updateTeacher({ id, name, email, updateEmail, limit, page })),
		triggerVerifyCerts: ({ id, policeCertificateVerified, childrenCertificateVerified, page = 1, limit = 30 }) => dispatch(verifyCerts({ id, policeCertificateVerified, childrenCertificateVerified, page, limit })),
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, teachers } = state;
	return { fetching, teachers };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeachersListing);
