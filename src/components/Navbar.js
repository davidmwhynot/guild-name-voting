import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar
					color='primary'
					dark
					expand={true}
					style={{ maxHeight: 50, padding: 16 }}
				>
					<div className='container'>
						<NavbarBrand href='/' style={{ fontSize: 20, marginRight: 16 }}>
							Guild Name Voting
						</NavbarBrand>
						<Nav className='mr-auto' navbar style={{ fontSize: 16 }}>
							<NavItem>
								<NavLink href='/results' style={{ padding: 10.75 }}>
									Results
								</NavLink>
							</NavItem>
						</Nav>
					</div>
				</Navbar>
			</div>
		);
	}
}
