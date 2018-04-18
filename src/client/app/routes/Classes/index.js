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
	switchNavigation,
	fetchClasses,
} from '../../redux/actions';
import LitniteImage from '../../components/Image';

import './index.scss';

class ClassesListing extends Component {
	
	constructor(props) {
		super(props);

		this.handlePaginationBack = this.handlePaginationBack.bind(this);
		this.handlePaginationNext = this.handlePaginationNext.bind(this);
	}

	componentWillMount() {
		const { triggerSwitchNavigation, triggerFetchClasses } = this.props;
		triggerSwitchNavigation(navigationIndexer.classes);
		triggerFetchClasses();
	}

	componentDidUpdate() {
		document.title = 'Classes listing';
	}

	componentDidMount() {
		document.title = 'Classses listing';
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
		const { fetching, classes: { classesData } } = this.props;
		return <section>
			<ToastContainer />
			{LoadingOverlay({ show: fetching })}
			<h2>Classes</h2>
			<Table responsive striped hover className='application-table' style={{ zoom: 0.8 }}>
				<thead>
					<tr>
						<th>#</th>
						<th>Class</th>
						<th>Category</th>
						<th>Teacher</th>
						<th>Difficulty</th>
						<th>Price (AUD)</th>
						<th>Created</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{
						classesData ? 
							classesData.map((singleClass, index) => {
								const imageUrl = singleClass.teacher.picture ? singleClass.teacher.picture.indexOf('http') !== -1 ? singleClass.teacher.picture : `${SERVER_BASE_URL.substring(0, SERVER_BASE_URL.length-1)}${singleClass.teacher.picture}`: undefined;
								return <tr key={`class-${index}`}>
									<td>{index+1}</td>
									<td>{singleClass.name}</td>
									<td>{singleClass.category.title}</td>
									<td>
										<p style={{ position: 'absolute' }}><Image image={imageUrl}/></p>
										<p style={{ marginLeft: '60px', top: '0'}}>
											{singleClass.teacher.name}<br/>{singleClass.teacher.id}<br/>
											<a href={`mailto:${singleClass.teacher.email}?Subject=Query%20regarding%20${singleClass.name} class`} target="_top">Send Query Mail</a>
										</p>
									</td>
									<td>
										{
											singleClass.level === 1 ? 'Beginner' :
												singleClass.level === 2 ? 'Inetrmediate':
													singleClass.level === 3 ? 'Advanced' : ''
										}
									</td>
									<td>{singleClass.rate}</td>
									<td>{moment(singleClass.created).format('LLL')}</td>
									<td>
										<button className={ singleClass.deleted ? 'btn-sm app-btn recover' : 'btn-sm app-btn delete'}>
											{ singleClass.deleted ? 'Recover': 'Delete' }		
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
		triggerFetchClasses: (page, limit) => dispatch(fetchClasses({ page, limit })),
		triggerSwitchNavigation: active => dispatch(switchNavigation({ active })),
	};
}

const mapStateToProps = state => {
	console.log(state);
	const { fetching, classes } = state;
	return { fetching, classes };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassesListing);
