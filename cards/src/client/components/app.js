import './app.scss';
import React, {Component} from 'react';
import dialogTypes from './dialogs';

class AppContainer extends Component {
	componentDidMount() {
		console.log('Component Mounted');
	}

	render() {
		const {main, sidebar} = this.props;

		return (
			<div className={'c-application'}>
				<div className="inner">
					<div className="sidebar">
						{sidebar}
					</div>
					<div className="main">
						{main}
					</div>
				</div>
			</div>		
		);
	}

	_click() {
		console.log('Stuff');
	}
}

export default AppContainer;
