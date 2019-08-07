import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import VotingForm from './components/VotingForm';
import Home from './components/Home';

class App extends Component {
	constructor() {
		super();
	}

	async componentDidMount() {
		// const res = await fetch('/.netlify/functions/server/auth', {
		// 	method: 'POST'
		// });

		// console.log('res', res);

		const res = await (await fetch('/.netlify/functions/server', {
			method: 'POST',
			body: JSON.stringify({ abc: 123 }),
			headers: { 'Content-Type': 'application/json' }
		})).json();

		console.log('res', res);
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container' style={{ marginTop: 50 }}>
						<Route exact path='/' component={Home} />
						<Route path='/vote' component={VotingForm} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
