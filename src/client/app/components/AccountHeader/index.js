/**
 * the account index component
 * 
 */
import React, { Component } from 'react';

import { browserHistory } from 'react-router';
import Favicon from 'react-favicon';

// load assets
import './index.scss';
import Logo from '../../assets/images/tutable.png';

export default class AccountHeader extends Component {

	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(e) {
		e.preventDefault();
		const { type } = this.props;
		localStorage.removeItem('adminAccessToken');
		window.location = '/';
		
	}
	render() {
		return <section className='account-header'>
			<Favicon url={Logo}/>
			<img src={Logo} height={30}/>
			<span><a href onClick={this.handleLogout}>Logout</a></span>
		</section>;
	}
}