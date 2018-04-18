import React, { Component } from 'react';

import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	CardColumns,
	CardDeck,
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	Jumbotron,
} from 'reactstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import Dashboard from '../Dashboard';
import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';

// import UsersListing from '../UsersListing';

import AccountHeader from '../../components/AccountHeader';

// loading assets
import './index.scss';

class AdminIndex extends Component {
	constructor(props) {
		super(props);

		this.handleSwitch = this.handleSwitch.bind(this);
	}

	handleSwitch(e) {
		const { triggerSwitchNavigation } = this.props;
		e.preventDefault();
		browserHistory.push(`/${e.target.name}`);
		triggerSwitchNavigation(navigationIndexer[e.target.name]);
	}

	componentWillMount() {
		if (!localStorage.getItem('adminAccessToken')) {
			window.location = '/';
		}
	}

	componentDidMount() {
		document.title = 'Admin Account';
	}

	render() {
		const { active } = this.props;
		return <section>
				<AccountHeader type='admin'/>
				<br/>
				<Container fluid>
					<Row>
						<Col md={2} sm={2} xs={12}>
							<ListGroup>
							{/* <ListGroupItem disabled tag="a" href="#">Cras justo odio</ListGroupItem> */}
								<ListGroupItem name='dashboard' className={ active === navigationIndexer.dashboard ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="line-chart"/> Dashboard
								</ListGroupItem>
								<ListGroupItem name='students' className={ active === navigationIndexer.students ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="user"/> Students
								</ListGroupItem>
								<ListGroupItem name='teachers' className={ active === navigationIndexer.teachers ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="user-plus"/> Teachers
								</ListGroupItem>
								<ListGroupItem name='classes' className={ active === navigationIndexer.classes ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="book"/> Classes
								</ListGroupItem>
								<ListGroupItem name='bookings' className={ active === navigationIndexer.bookings ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="clock-o"/> Bookings
								</ListGroupItem>
								<ListGroupItem name='transactions' className={ active === navigationIndexer.transactions ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="money"/> Transactions
								</ListGroupItem>
								{/* <ListGroupItem name='categories' className={ active === navigationIndexer.categories ? 'active-menu' : '' } tag="a" href="#" onClick={this.handleSwitch}>
									<FontAwesome name="list"/> Categories
								</ListGroupItem> */}
							</ListGroup>
						</Col>
						<Col md={10} sm={10} xs={12}>
							{ this.props.children || <Dashboard/> }
						</Col>
					</Row>
				</Container>
		</section>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
	}
}

const mapStateToProps = state => {
	const { fetching, navigation: { active } } = state;
	return { fetching, active };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
// export default AdminIndex;