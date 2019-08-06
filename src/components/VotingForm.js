import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './votingForm.css';

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
	['pretentious']: 'Pretentious',
	['boosted-idiots']: 'Boosted Idiots',
	['emphasis']: 'Emphasis',
	['delirium']: 'Delirium',
	['classic-culture']: 'Classic Culture',
	['all-washed-up']: 'All Washed Up',
	['sunstep-and-friends']: 'Sunstep and Friends',
	['hazardous']: 'Hazardous',
	['tenure']: 'Tenure',
	['wheres-my-cut']: 'wheres my cut',
	['handled']: 'Handled',
	['elysium']: 'Elysium',
	['ram-ranch']: 'Ram Ranch',
	['hog-house']: 'Hog House',
	['cosmos-clearance']: 'Cosmos Clearance',
	['can-i-get-that']: 'CanIGetThat',
	['natus-vincere']: 'Natus Vincere'
};

export default class VotingForm extends React.Component {
	constructor() {
		super();

		this.state = {
			selected: []
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
			if (this.state.selected.length <= 10) {
				const selected = this.state.selected;
				selected.push(e.target.name);
				console.log('selected', selected);
				this.setState({ selected });
			}
		}
	};

	render() {
		console.log('this.state', this.state);
		return (
			<Form>
				<div className='row'>
					{checkboxNames.map(checkbox => (
						<div className='col-12 col-md-6 col-lg-3'>
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
								<label className='custom-control-label' htmlFor='customCheck1'>
									{checkboxLabels[checkbox]}
								</label>
							</div>
						</div>
					))}
				</div>
				<Button style={{ marginTop: 50 }}>Submit</Button>
			</Form>
		);
	}
}
