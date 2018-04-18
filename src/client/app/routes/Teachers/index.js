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
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class FeedbacksListing extends Component {
	
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
		const { fetching, teachers: { teachersData } } = this.props;
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
						{/* <th>address</th> */}
						<th>Verification</th>
						<th>Delete</th>
						<th>Actions</th>
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
									<td>{teacher.name}</td>
									<td>
									{
										teacher.facebook ? 
											<FontAwesome style={{ color: '#4468b0' }} name="facebook"/> :
											teacher.google ?
												<FontAwesome style={{ color: '#e8453c'}} name="google"/> :
												<FontAwesome style={{ color: '#ce8b14' }} name="envelope"/>
									}</td>
									<td>{teacher.email}</td>
									{/* <td>{teacher.address.location}</td> */}
									<td>
										{
											teacher.isVerified ?
												'Verified':
												<button className='btn-sm app-btn verify'>Verify</button>
										}
										{/* {teacher.isVerified ? 'Yes': 'No'} */}
									</td>
									<td>
										<button className={ teacher.deleted ? 'btn-sm app-btn recover' : 'btn-sm app-btn delete'}>
											{ teacher.deleted ? 'Recover': 'Delete' }		
										</button>
									</td>
									<td>
										<button className='btn btn-sm'>
											Edit
										</button>
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
		triggerFetchTeachers: (page, limit) => dispatch(fetchTeachers({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
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
)(FeedbacksListing);
