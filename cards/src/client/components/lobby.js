import './lobby.scss';
import React, {Component} from 'react';

class LobbyContainer extends Component {
	render() {
		return (
			<p>Lobby!</p>
		);
	}
}

class LobbySidebar extends Component {
	constructor(props) {
		super(props);

		this._login = () => {
			console.log("TODO: IMPLEMENT LOGIN");
		};

		this._createGame = () => {
			console.log("TODO: IMPLEMENT CREATE GAME");
		};
	}

	render() {
		const canLogin = true;
		const canCreateGame = true;
		const createGameInProgress = false;

		return (
			<section className="c-lobby-sidebar">
				<div className="m-sidebar-actions">
					{!canLogin ? null :
						<button className="m-button primary" onClick={this._login}>
							Login
						</button>}

					{!canCreateGame ? null :
						<button
							className="m-button good"
							disabled={createGameInProgress}
							onClick={this._createGame}>Create Game
						</button>}
				</div>
			</section>
		);
	}
}

export default {
	main: LobbyContainer,
	sidebar: LobbySidebar
};
