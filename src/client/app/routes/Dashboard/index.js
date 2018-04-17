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

// import { fetchStatistics } from '../../redux/actions';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		document.title = 'Dashboard';

		const { fetching, statistics, triggerFetchStatistics } = this.props;
		// fetch on mounting or tranistioning among pages
		// triggerFetchStatistics();
	}

	componentDidUpdate() {
		document.title = 'Dashboard';
		console.log('update');
		const { fetching, statistics, triggerFetchStatistics } = this.props;

		// console.log(fetching, statistics, triggerFetchStatistics);
		if (!fetching && !statistics) {
			console.log('stats fetching');
			// triggerFetchStatistics();
		}
	}

	render() {
		const { statistics, fetching } = this.props;
		return statistics ? <section>
			<CardColumns>
				<Card inverse color="danger">
					<CardBody className='text-center'>
						<CardTitle>Total Registered Doctors</CardTitle>
						<CardText>
							<h1>
								{statistics.doctor.total}
							</h1>
							from {statistics.doctor.specializations} specialization fields.
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="primary">
					<CardBody className='text-center'>
						<CardTitle>Total Consultation Requests</CardTitle>
						<CardText>
							<h1>
								{statistics.consultations.consultations}
							</h1>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="success">
					<CardBody className='text-center'>
						<CardTitle>Average consultations per doctor</CardTitle>
						<CardText>
							<h1>
								{Number.parseFloat(statistics.consultations.average).toPrecision(2)}
							</h1>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="info">
					<CardBody className='text-center'>
						<CardTitle>Patients Contacted</CardTitle>
						<CardText>
							<h1>
								{statistics.consultations.contacted}
							</h1>
						</CardText>
					</CardBody>
				</Card>
				<Card inverse color="warning">
					<CardBody className='text-center'>
						<CardTitle>Patients Contact Pending</CardTitle>
						<CardText>
							<h1>
								{statistics.consultations.pending}
							</h1>
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
		triggerFetchStatistics: () => dispatch(fetchStatistics()),
	};
};

const mapStateToProps = state => {
	// console.log(state);
	const { fetching, dashboard: { statistics } } = state;
	return { fetching, statistics };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);