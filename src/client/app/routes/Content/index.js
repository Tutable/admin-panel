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
	fetchContent,
	saveContent,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class Content extends Component {
	
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const {
			triggerSwitchNavigation,
			triggerFetchContent
		} = this.props;

		triggerSwitchNavigation(navigationIndexer.content);
		triggerFetchContent();
	}

	componentDidUpdate() {
		document.title = 'Update Web Content';
	}

	componentDidMount() {
		document.title = 'Update Web Content';
	}

	render() {
		const { content, triggerSaveContent } = this.props
		console.log(content && content.about);
		console.log(content && content.help);
		return <section>
			<h2>About, Help, Terms & Conditions</h2><hr/>
			About us<br/>
			<textarea ref={ about => this.about = about } className='app-textarea' placeholder='Add about us description'>
			</textarea><br/>
			Help<br/>
			<textarea ref={ help => this.help = help } className='app-textarea' placeholder='Add Help text'>
			</textarea><br/>
			Terms and Conditions<br/>
			<textarea ref={ terms => this.terms = terms } className='app-textarea' placeholder='Add Terms and conditions'>
				
			</textarea><br/>
			<button className='btn app-btn' onClick={() => {
				let about = this.about.value;
				let help = this.help.value;
				let terms = this.terms.value;
				if (!about.trim().length)
					about = undefined;
				if (!help.trim().length)
					help = undefined;
				if (!terms.trim().length)
					terms = undefined;

				triggerSaveContent(about, terms, help);
			}}>SAVE CONTENT</button><br/><br/>
		</section>
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
		triggerFetchContent: () => dispatch(fetchContent()),
		triggerSaveContent: (about, terms, help) => dispatch(saveContent({ about, terms, help }))
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, content } = state;
	return { fetching, content };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Content);
