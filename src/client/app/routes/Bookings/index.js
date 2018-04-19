/**
 * feedbacks listing component bookings listing page
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
	fetchBookings,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class BookingsListing extends Component {
	
	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchBookings } = this.props;
		triggerSwitchNavigation(navigationIndexer.bookings);
		triggerFetchBookings();
	}

	componentDidUpdate() {
		document.title = 'Bookings';
	}

	componentDidMount() {
		document.title = 'Bookings';
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
		const { fetching, bookings: { bookingsData } } = this.props;
		return <section>
			<ToastContainer />
			{LoadingOverlay({ show: fetching })}
			<h2>Bookings</h2>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8 }}>
				<thead>
					<tr>
						<th>#</th>
						<th>Booking Id</th>
						<th>Booking details</th>
						<th>Student</th>
						<th>Booked on</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{
						bookingsData ? 
						bookingsData.map((booking, index) => {
								const studentImage = booking.student.picture ? booking.student.picture.indexOf('http') !== -1 ? booking.student.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${booking.student.picture}`: undefined;
								const teacherImage = booking.teacher.picture ? booking.teacher.picture.indexOf('http') !== -1 ? booking.teacher.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${booking.teacher.picture}`: undefined;
								return <tr key={`booking-${index}`}>
									<td>
										{index+1}
									</td>
									<td>{booking._id}</td>
									<td>
										<p style={{ position: 'absolute' }}><Image image={teacherImage}/></p>
										<p style={{ marginLeft: '60px', top: '0'}}>
											<FontAwesome name="user-plus"/>&nbsp;
											{booking.teacher.name}<br/>{booking.teacher.id}<br/>
											<a href={`mailto:${booking.teacher.email}?Subject=Query%20regarding%20booking #${booking._id}`} target="_top">Send Query Mail to Teacher</a>
											<hr/>
											<FontAwesome name="book"/>&nbsp;
											{booking.classDetails.name}<br/>
											{booking.classDetails.id}<br/>
											<FontAwesome name="clock-o"/>&nbsp;{moment(booking.timeline).format('LLL')}
										</p>
									</td>
									<td>
										<p style={{ position: 'absolute' }}><Image image={studentImage}/></p>
										<p style={{ marginLeft: '60px', top: '0'}}>
										<FontAwesome name="user"/>&nbsp;
											{booking.student.name}<br/>{booking.student.id}<br/>
											<a href={`mailto:${booking.student.email}?Subject=Query%20regarding%20booking #${booking._id}`} target="_top">Send Query Mail to Student</a>
										</p>
									</td>
									<td>{ moment(booking.timestamp).format('LLL') }</td>
									<td>
										{
											!booking.confirmed && !booking.cancelled ?
												<p style={{ color: '#5390cc' }}><FontAwesome name="clock-o"/> Awaiting</p> :
												booking.confirmed ?
													<p>
														<p style={{ color: 'green' }}><FontAwesome name="check"/> Confirmed</p>
														<FontAwesome name="money"/> Paid {booking.rate ? booking.rate : booking.classDetails.rate} AUD
													</p> :
													<p style={{ color: '#bf3836' }}><FontAwesome name="times"/> Declined</p>
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
		triggerFetchBookings: (page, limit) => dispatch(fetchBookings({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, bookings } = state;
	return { fetching, bookings };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookingsListing);
