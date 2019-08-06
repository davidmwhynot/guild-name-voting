import React, { Component } from 'react';

import Navbar from './components/Navbar';
import VotingForm from './components/VotingForm';

class App extends Component {
	constructor() {
		super();
	}

	async componentDidMount() {
		const res = await (await fetch('/.netlify/functions/results', {
			method: 'POST',
			body: JSON.stringify({ abc: 123 }),
			headers: { 'Content-Type': 'application/json' }
		})).json();

		console.log('res', res);
	}

	render() {
		return (
			<div className='App'>
				<Navbar />
				<div className='container' style={{ marginTop: 50 }}>
					<VotingForm />
				</div>
			</div>
		);
	}
}

export default App;
