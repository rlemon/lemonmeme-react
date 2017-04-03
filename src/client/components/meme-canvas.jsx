import React, { Component } from 'react';

export default class MemeCanvas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meme: null,
			topText: '',
			bottomText: '',
			settings: {

			}
		};
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(props) {
		let { meme, topText, bottomText, settings } = props;
		this.setState({ meme, topText, bottomText, settings }, this.draw);
	}

	getLines(text, maxWidth, context) {
		const words = text.split(' ');
		const lines = [];
		let line = '';
		if( context.measureText(text).width < maxWidth ) {
			return [text];
		}
		while( words.length > 0 ) {
			while( context.measureText(words[0]).width >= maxWidth ) {
				const tmp = words[0];
				words[0] = tmp.slice(0, -1);
				if( words.length > 1 ) {
					words[1] = tmp.slice(-1) + words[1];
				} else {
					words.push(tmp.slice(-1));
				}
			}
			if( context.measureText(line + words[0]).width < maxWidth ) {
				line += `${words.shift()} `;
			} else {
				lines.push(line);
				line = '';
			}
			if( words.length === 0 ) {
				lines.push(line);
			}
		}
		return lines;
	}

	draw() {
		if( !this.state.meme ) return;
		const canvas = this.refs.memeCanvas;
		const context = canvas.getContext('2d');

		const maxWidth = canvas.width = 640;
		const maxHeight = canvas.height = 480;

		let { height, width } = this.state.meme;
		while( height > maxHeight || width > maxWidth ) {
			height -= 1;
			width -= 1;
		}

		/* Draw the background image, scaled to the container */

		context.drawImage(this.state.meme, (maxWidth-width)/2, (maxHeight-height)/2, width, height);

		/* Draw the top text */
		if( this.state.topText ) {
			context.font = '24px Roboto'; // make options for this shizznat.
			const topLines = this.getLines(this.state.topText, maxWidth * 0.9 , context); // demo stuff
			topLines.forEach((line, index) => {
				context.fillText(line, maxWidth/2 - context.measureText(line).width/2, (index + 1) * 20) // demo stuff
			})
		}

		/* Draw the bottom text */
		if( this.state.bottomText ) {

		}
	}

	render() {
		return <canvas ref="memeCanvas" style={{outline: '1px solid red'}}></canvas>;
	}
}