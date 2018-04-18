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
	fetchTransactions,
	switchNavigation,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class TransactionsListing extends Component {
	
	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchTransactions } = this.props;
		triggerSwitchNavigation(navigationIndexer.transactions);
		triggerFetchTransactions();
	}

	componentDidUpdate() {
		document.title = 'Transactions';
	}

	componentDidMount() {
		document.title = 'Transactions';
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
		const { fetching, transactions: { transactionsData } } = this.props;
		return <section>
			<ToastContainer />
			{LoadingOverlay({ show: fetching })}
			<h2>Transactions</h2>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8 }}>
				<thead>
					<tr>
						<th>#</th>
						<th>Transaction Id</th>
						<th>Booking Id</th>
						<th>Stripe Charge Id</th>
						<th>Amount (AUD)</th>
						<th>Status</th>
						<th>Payout due</th>
					</tr>
				</thead>
				<tbody>
					{
						transactionsData ? 
							transactionsData.map((transaction, index) => {
								// const imageUrl = teacher.picture ? teacher.picture.indexOf('http') !== -1 ? teacher.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${teacher.picture}`: undefined;
								return <tr key={`transaction-${index}`}>
									<td>
										{index+1}
									</td>
									<td>
										{transaction._id}
									</td>
									<td>
										{transaction.bookingId}
									</td>
									<td>{transaction.stripeChargeId}</td>
									<td>
										{transaction.amount}
									</td>
									<td>
										{transaction.status}
									</td>
									<td>
										{
											transaction.refunded ?
												<p>
													Refunded on cancellation.<br/>
													Refund Id:&nbsp;
													<b>{transaction.refundResponse.id}</b>
												</p>:
												transaction.payoutDone ?
													<p>{moment(transaction.payoutTimestamp).format('LLL')}</p>:
													<p>{moment(transaction.payoutDue).format('LLL')}</p>
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
		triggerFetchTransactions: (page, limit) => dispatch(fetchTransactions({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, transactions } = state;
	return { fetching, transactions };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TransactionsListing);
