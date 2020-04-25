import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './Context/Auth';
import AuthRoute from './Utils/AuthRoute';
import UnAuthRoute from './Utils/UnAuthRoute';

import MenuBar from './Components/MenuBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Appointments from './Pages/Appointments';
import Patients from './Pages/Patients';
import NotFound from './Pages/404';

import './App.css';

const App = (props) => (
	<AuthProvider>
		<Router>
			<MenuBar>
				<Switch>
					<UnAuthRoute exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<UnAuthRoute exact path='/calendar' component={Appointments} />
					<UnAuthRoute exact path='/patients' component={Patients} />
					<Route component={NotFound} />
				</Switch>
			</MenuBar>
		</Router>
	</AuthProvider>
);

export default App;
