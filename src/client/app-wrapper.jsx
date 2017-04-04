import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import MemeCanvas from './components/meme-canvas';

import getMemeList from './memes';

import './styles/style.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftDrawerIsOpen: false,
			memeSource: null,
			topText: null,
			bottomText: null
		};

	}

	toggleLeftDrawer() {
		this.setState({leftDrawerIsOpen: !this.state.leftDrawerIsOpen});
	}

	handleMemeSelection(elm) {
		this.setState({memeSource: elm, leftDrawerIsOpen: false}); // close the drawer while we're at it. 
	}

	handleTopLineInput(elm) {
		this.setState({topText: elm.value || null});
	}

	handleBottomLineInput(elm) {
		this.setState({bottomText: elm.value || null});
	}

	render() {

		const menuItems = [];
		const memelist = getMemeList();
		for( const category in memelist ) {
			menuItems.push(<h3 key={category}>{category}</h3>);
			for( const item of memelist[category] ) {
				menuItems.push(<MenuItem key={item} onTouchTap={event=>this.handleMemeSelection(event.target)}><img className='meme-list-item' src={`memes/${category}/${item}`} /></MenuItem>)
			}
		}

		return <div className="app-wrapper">

			<AppBar title={`Lemonmeme`}
					onLeftIconButtonTouchTap={_ => this.toggleLeftDrawer()} />
			<Drawer ref="Drawer" 
					open={this.state.leftDrawerIsOpen} 
					docked={false}
					onRequestChange={leftDrawerIsOpen => this.setState({leftDrawerIsOpen})} >
				<h3>meme list</h3>
				{menuItems}
			</Drawer>

			<div className="app-body">

				<div className="canvas-container">
					<MemeCanvas meme={this.state.memeSource} topText={this.state.topText} bottomText={this.state.bottomText} />
				</div>
				<div className="inputs-container">
					<TextField fullWidth={true} hintText='Top Line' onChange={event => this.handleTopLineInput(event.target)} />
					<TextField fullWidth={true} hintText='Bottom Line' onChange={event => this.handleBottomLineInput(event.target)} />
				</div>

			</div>

		</div>;
	}
}