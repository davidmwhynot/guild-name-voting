import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import VotingForm from './components/VotingForm';
import Home from './components/Home';
import Results from './components/Results';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container' style={{ marginTop: 50 }}>
						<Route exact path='/' component={Home} />
						<Route path='/vote' component={VotingForm} />
						<Route path='/results' component={Results} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
