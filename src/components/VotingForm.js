import React from 'react';
import { Alert, Form } from 'reactstrap';
import './votingForm.css';
import getParams from '../utils/getParams';

const checkboxNames = [
	'pretentious',
	'boosted-idiots',
	'emphasis',
	'delirium',
	'classic-culture',
	'all-washed-up',
	'sunstep-and-friends',
	'hazardous',
	'tenure',
	'wheres-my-cut',
	'handled',
	'elysium',
	'ram-ranch',
	'hog-house',
	'cosmos-clearance',
	'can-i-get-that',
	'natus-vincere'
];
const checkboxLabels = {
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

export default class VotingForm extends React.Component {
	constructor() {
		super();

		this.state = {
			selected: [],
			error: '',
			success: '',
			loading: false
		};
	}

	select = e => {
		if (this.state.selected.includes(e.target.name)) {
			const selected = this.state.selected.filter(
				item => item !== e.target.name
			);
			console.log('selected', selected);
			this.setState({ selected });
		} else {
			if (this.state.selected.length < 10) {
				const selected = this.state.selected;
				selected.push(e.target.name);
				console.log('selected', selected);
				this.setState({ selected });
			}
		}
	};

	submit = async e => {
		e.preventDefault();
		this.setState({ error: '', success: '', loading: true });
		if (this.state.selected.length < 3) {
			this.setState({
				error: 'Please select at least 3 names from the list.',
				loading: false
			});
		} else {
			// get the code from the url
			const params = getParams();

			console.log('params', params);

			const res = await (await fetch('/.netlify/functions/vote', {
				method: 'POST',
				body: JSON.stringify({
					code: params.code,
					vote: this.state.selected
				}),
				headers: { 'Content-Type': 'application/json' }
			})).json();

			console.log('res', res);

			if (res.error) {
				this.setState({ error: res.error, loading: false });
			} else {
				this.setState({
					success: 'Your submission has been recorded. Thanks for voting!',
					loading: false
				});
			}
		}
	};

	render() {
		console.log('this.state', this.state);
		return (
			<div>
				{this.state.error === '' ? (
					''
				) : (
					<div>
						{this.state.error === 'invalid_grant' ? (
							<Alert color='danger'>
								Authentication expired. You have either already voted, or you
								need to{' '}
								<a
									className='text-success'
									href='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=email&response_type=code&client_id=447379049298-hr3cst7ggjnhkpcal5v51t95kdou5lfb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fguild-name-voting.netlify.com%2Fvote'
								>
									sign in again
								</a>
								.
							</Alert>
						) : (
							<Alert color='danger'>{this.state.error}</Alert>
						)}
					</div>
				)}
				{this.state.success === '' ? (
					''
				) : (
					<Alert color='success'>{this.state.success}</Alert>
				)}
				<Form>
					<div className='row'>
						{checkboxNames.map(checkbox => (
							<div className='col-12 col-md-6 col-xl-4'>
								<div className='custom-control custom-checkbox mt-1'>
									<input
										type='checkbox'
										checked={
											this.state.selected.includes(checkbox) ? true : false
										}
										onChange={this.select}
										name={checkbox}
										className='custom-control-input'
									/>
									<label
										className='custom-control-label'
										htmlFor='customCheck1'
									>
										{checkboxLabels[checkbox]}
									</label>
								</div>
							</div>
						))}
					</div>
					<h5 className='mt-3'>{this.state.selected.length} / 10 selected</h5>
					<button
						className={`mb-5 btn btn-primary btn-lg mt-3${
							this.state.selected.length > 2 ? '' : ' disabled'
						}`}
						onClick={this.submit}
						disabed={true}
						style={{ padding: '16px 32px' }}
					>
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
							'Submit'
						)}
					</button>
				</Form>
			</div>
		);
	}
}
