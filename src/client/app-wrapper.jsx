import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import MemeCanvas from './components/meme-canvas';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftDrawerIsOpen: false,
			memeSource: null,
			topText: null
		};
	}

	toggleLeftDrawer() {
		this.setState({leftDrawerIsOpen: !this.state.leftDrawerIsOpen});
	}

	handleMemeSelection(memeSource) {
		this.toggleLeftDrawer();
		this.setState({memeSource})
	}

	handleKeypress(elm) {
		this.setState({topText: elm.value || null});
	}

	render() {

		const images = [
			<img src="https://i.imgur.com/04qujU7.png" />,
			<img src="https://i.imgur.com/0sGqmQt.png" />,
			<img src="https://i.imgur.com/1eiPZP9.jpg" />,
			<img src="https://i.imgur.com/iTPYaED.jpg" />,
			<img src="https://i.imgur.com/2lioI62.png" />
		]

		return <div className="app-wrapper">

			<AppBar title={`Lemonmeme`}
					onLeftIconButtonTouchTap={_ => this.toggleLeftDrawer()} />
			<Drawer ref="Drawer" 
					open={this.state.leftDrawerIsOpen} 
					docked={false}
					onRequestChange={leftDrawerIsOpen => this.setState({leftDrawerIsOpen})} >
				<h3>meme list</h3>
				{
					React.Children.map(images, child => {
						return <MenuItem onTouchTap={event=>this.handleMemeSelection(event.target)}>{child}</MenuItem>
					})
				}
			</Drawer>

			<MemeCanvas meme={this.state.memeSource} topText={this.state.topText} />

			<input type="text" onKeyUp={event => this.handleKeypress(event.target) } />

		</div>;
	}
} 