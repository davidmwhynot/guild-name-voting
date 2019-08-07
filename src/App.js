import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import VotingForm from './components/VotingForm';
import Home from './components/Home';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container" style={{ marginTop: 50 }}>
						<Route exact path="/" component={Home} />
						<Route path="/vote" component={VotingForm} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
