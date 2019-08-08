import { Alert } from 'reactstrap';
import React, { Component } from 'react';
import './votingForm.css';

const labels = {
	pretentious: 'Pretentious',
	'boosted-idiots': 'Boosted Idiots',
	emphasis: 'Emphasis',
	delirium: 'Delirium',
	'classic-culture': 'Classic Culture',
	'all-washed-up': 'All Washed Up',
	'sunstep-and-friends': 'Sunstep and Friends',
	hazardous: 'Hazardous',
	tenure: 'Tenure',
	'wheres-my-cut': 'wheres my cut',
	handled: 'Handled',
	elysium: 'Elysium',
	'ram-ranch': 'Ram Ranch',
	'hog-house': 'Hog House',
	'cosmos-clearance': 'Cosmos Clearance',
	'can-i-get-that': 'CanIGetThat',
	'natus-vincere': 'Natus Vincere'
};

class Results extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			votes: []
		};
	}

	async componentDidMount() {
		try {
			this.setState({ error: '', loading: true });
			const res = await (await fetch('/.netlify/functions/results', {
				method: 'GET'
			})).json();

			console.log('res', res);

			if (res.error) {
				this.setState({ error: res.error, loading: false });
			} else {
				const votes = [];
				for (const vote of res.votes) {
					for (const item of vote) {
						const filteredVotes = votes.filter(
							votesItem => votesItem.name === item
						);
						console.log('filteredVotes', filteredVotes);
						if (filteredVotes.length > 0) {
							++votes[votes.indexOf(filteredVotes[0])].count;
						} else {
							votes.push({
								label: labels[item],
								name: item,
								count: 1
							});
						}
					}
				}
				console.log('votes', votes);
				votes.sort((a, b) => b.count - a.count);
				this.setState({
					votes,
					loading: false
				});
			}
		} catch (err) {
			this.setState({ error: err.message });
		}
	}

	render() {
		console.log('state', this.state);
		return (
			<div className='results'>
				{this.state.error === '' ? (
					''
				) : (
					<Alert color='danger'>{this.state.error}</Alert>
				)}
				{this.state.loading ? (
					<div className='loading loading-container'>
						<svg viewBox='0,0,100,100'>
							<circle
								className='inner'
								cx={50}
								cy={50}
								r={45}
								fill='none'
								strokeWidth={10}
							/>
							<circle
								className='outer'
								cx={50}
								cy={50}
								r={45}
								fill='none'
								strokeWidth={10}
							/>
						</svg>
					</div>
				) : (
					<div>
						<h1>Results</h1>

						<div className='row'>
							{this.state.votes.map(vote => (
								<div className='col-12 col-xl-6' key={vote.name}>
									<h5>
										{vote.label}: {vote.count}
									</h5>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Results;
