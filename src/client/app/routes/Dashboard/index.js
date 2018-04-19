import React,  { Component } from 'react';
import {
	CardColumns,
	CardDeck,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Jumbotron,
	Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { fetchStatistics } from '../../redux/actions';

import './index.scss';
class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		document.title = 'Dashboard';

		const { fetching, statistics, triggerFetchStatistics } = this.props;
		// fetch on mounting or tranistioning among pages
		triggerFetchStatistics();
	}

	componentDidUpdate() {
		document.title = 'Dashboard';
		console.log('update');
		const { fetching, statistics, triggerFetchStatistics } = this.props;

		// console.log(fetching, statistics, triggerFetchStatistics);
		if (!fetching && !statistics) {
			console.log('stats fetching');
			triggerFetchStatistics();
		}
	}

	render() {
		const { statistics, fetching } = this.props;
		return statistics ? <section className='dashboard-container'>
			<CardColumns>
				<Card inverse color="danger">
					<CardBody className='text-center'>
						<CardTitle>Total Active Teachers</CardTitle>
						<CardText>
							<h1>
								{statistics.teachers.active}
							</h1>
							<br/>
							<span className='field-container'>Total {statistics.teachers.total}</span>&nbsp;&nbsp;&nbsp;<span className='field-container'>{statistics.teachers.deleted} Deleted</span>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="primary">
					<CardBody className='text-center'>
						<CardTitle>Total Active Students</CardTitle>
						<CardText>
							<h1>
								{statistics.students.active}
							</h1>
							<br/>
							<span className='field-container'>Total {statistics.students.total}</span>&nbsp;&nbsp;&nbsp;<span className='field-container'>{statistics.students.deleted} Deleted</span>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="success">
					<CardBody className='text-center'>
						<CardTitle>Total Active Classes</CardTitle>
						<CardText>
							<h1>
								{statistics.classes}
							</h1>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="info">
					<CardBody className='text-center'>
						<CardTitle>Bookings</CardTitle>
						<CardText>
							<h1>
								{statistics.bookings.total}
							</h1>
							<br/>
							<span className='field-container'>{statistics.bookings.confirmed} Confirmed</span> <span className='field-container'>{statistics.bookings.cancelled} Cancelled</span>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="warning">
					<CardBody className='text-center'>
						<CardTitle>Transactions</CardTitle>
						<CardText>
							<h1>
								{statistics.transactions.total}
							</h1>
							<span className='field-container'>Refunded {statistics.transactions.refunded}</span>&nbsp;&nbsp;&nbsp;
							<span className='field-container'>{statistics.transactions.pendingPayouts} Payouts due</span><br/><br/>
							<span className='field-container'>{statistics.transactions.completedPayouts} Payouts completed</span>
						</CardText>
					</CardBody>
				</Card>
			</CardColumns>
		</section>:
			fetching ? <p>Loading..</p>: <p>'Nothing'</p>;
	}
};

const mapDispatchToProps = dispatch => {
	return {
		triggerFetchStatistics: () => dispatch(fetchStatistics({})),
	};
};

const mapStateToProps = state => {
	// console.log(state);
	const { fetching, dashboard: { statistics } } = state;
	return { fetching, statistics };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);