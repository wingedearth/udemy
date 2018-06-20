import {Children, Component, PropTypes} from 'react';

export class StoreProvider extends Component {
	static PropTypes = {
		stores: PropTypes.object.isRequired,
		services: PropTypes.object.isRequired
	};
	
	static childContextTypes = {
		stores: PropTypes.object.isRequired,
		services: PropTypes.object.isRequired
	};
	
	render() {
		return Children.only(this.props.children);
	}
	
	getChildContext() {
		const {stores, services} = this.props;
		return {stores, services};
	}
}
