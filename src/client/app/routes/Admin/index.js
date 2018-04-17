/**
 * @desc this is the admin component of the application.
 * @author gaurav sharma
 */
import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { adminLogin } from '../../redux/actions';
import { toast, ToastContainer } from 'react-toastify';

import HeaderComponent from '../../components/Header';
import LoadingOverlay from '../../components/LoadingOverlay';

//loading assets
import './index.scss';

class AdminComponent extends Component {
	constructor(props) {
		super(props);

		this.realignContent = this.realignContent.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.responseHandler = this.responseHandler.bind(this);
	}

	/** 
	 * trigger this to realign the window content
	*/
	realignContent() {
		const bodyContainer = document.getElementById('content');
		// const bodyContainer = document.getElementsByTagName('body')[0];
		const loginContainer = document.getElementById('admin-login');

		if (bodyContainer.clientWidth >= 720) {
			const loginMargin = (bodyContainer.clientHeight - loginContainer.clientHeight -100)/2;
			loginContainer.style.marginTop = `${loginMargin}px`;
		} else {
			loginContainer.style.marginTop='10px';
		}
	}

	componentDidMount() {
		this.realignContent();
		window.onresize = this.realignContent;

		document.title = 'PreR Admin';
	}

	onLogin(e) {
		e.preventDefault();
		const { triggerLoginAdmin } = this.props;

		triggerLoginAdmin(this.adminUname.value, this.adminPass.value);
	}

	/**
	 * handle the login payload response
	 */
	responseHandler() {
		const { login: { data: { code, message, accessToken }} } = this.props;
		toast.dismiss();
		if (code === 100) {
			toast.success(message);
			// setup the admin access token and redirect to admin account
			localStorage.setItem('adminAccessToken', accessToken);
			window.location = '/adminAccount';
		} else {
			toast.error(message);
		}
	}

	componentWillMount() {
		if (localStorage.getItem('adminAccessToken')) {
			window.location = '/adminAccount';
		}
	}

	render() {
		const { fetching, login } = this.props;
		{ login && this.responseHandler() }
		return <section className='content' id='content'>
			<LoadingOverlay fetching={fetching}/>
			<ToastContainer />
			<section className='transparent-overlay'></section>
			<HeaderComponent/><br/>
			<Container fluid>
				<Row>
					<Col md={4} sm={3} xs={2}></Col>
					<Col md={4} sm={6} xs={8}>
						<section className='admin-login' id='admin-login'>
							<Form>
								<FormGroup>
									<Label for="username">Username</Label>
									<input ref={adminUname => this.adminUname = adminUname} className='custom-field' placeholder='Username for admin'/>
								</FormGroup>
								<FormGroup>
									<Label for="username">Password</Label>
									<input ref={adminPass => this.adminPass = adminPass} type='password' className='custom-field' placeholder='Password for admin'/>
								</FormGroup>
								<p className='text-center'>
									<button className="litnite-btn" onClick={this.onLogin}>LOGIN</button>
								</p>
							</Form>
							<br/><br/><br/>
							<hr className='line-break'/>
							<p className='text-center'>tutable admin &copy;2018</p>
						</section>
					</Col>
					<Col md={4} sm={3} xs={2}></Col>
				</Row>
			</Container>
		</section>
	}
}

// handles the outgoing dispatches
const mapDispatchToProps = dispatch => {
	return {
		triggerLoginAdmin: (username, password) => dispatch(adminLogin({username, password}))
	};
}

// handles incoming state changes
const mapStateToProps = state => {
	const { fetching, login } = state;
	return { fetching, login };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);



