import React from "react";
import {Route, IndexRoute, Redirect, Link} from "react-router";

import AppContainer from "./components/app";
import Lobby from "./components/lobby";
import Game from "./components/game";

export default function() {
	return (
		<Route path="/" component={AppContainer}>
			<IndexRoute components={Lobby} />
			<Link to="/game/:gameId">Game</Link>
			<Route path="/game/:gameId" components={Game} />
			<Redirect from="*" to="/" />
		</Route>
	);
}