import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import { initStore } from '../redux/store';

import NotFoundPage from '../components/NotFoundPage/';
import Admin from './Admin';
import AdminAccount from './AdminAccount';
import Dashboard from './Dashboard';
import Students from './Students';
import Teachers from './Teachers';

export default () => {
	return <Provider store={ initStore() }>
		<Router history={ browserHistory }>
			<Route path="/" component={Admin}/>
	
			<Route path="/adminAccount" strict={true} component={AdminAccount}>
				<Route path="/dashboard" component={Dashboard}/>
				<Route path='/students' component={Students}/>
				<Route path='/teachers' component={Teachers}/>
				{/* <Route path="/doctors" component={DoctorsListing}/>
				<Route path="/consultations" component={Consultation}/>
				<Route path="/addDoctor" component={AddDoctor}/>
				<Route path="/anxiometer" component={Anxiometer}/>
				<Route path="/feedbacks" component={FeedbackListing}/>
				<Route path="/ailments" component={Ailments} />
				<Route path="*" component={NotFoundPage}/> */}
			</Route>
		</Router>
	</Provider>
}
