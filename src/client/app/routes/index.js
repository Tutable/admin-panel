import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { initStore } from '../redux/store';

import NotFoundPage from '../components/NotFoundPage/';
import Admin from './Admin';
import AdminAccount from './AdminAccount';
import DoctorsListing from './DoctorsListing';
import Dashboard from './Dashboard';
import AddDoctor from './AddDoctor';
import Consultation from './ConsultationsListing';
import Anxiometer from './Anxiometer';
import FeedbackListing from './Feedback';
import Ailments from './Ailments';

export default () => {
	return <Provider store={ initStore() }>
		<Router history={ browserHistory }>
			<Route path="/" component={Admin}/>
	
			<Route path="/adminAccount" strict={true} component={AdminAccount}>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path="/doctors" component={DoctorsListing}/>
				<Route path="/consultations" component={Consultation}/>
				<Route path="/addDoctor" component={AddDoctor}/>
				<Route path="/anxiometer" component={Anxiometer}/>
				<Route path="/feedbacks" component={FeedbackListing}/>
				<Route path="/ailments" component={Ailments} />
				<Route path="*" component={NotFoundPage}/>
			</Route>
		</Router>
	</Provider>
}
