import React, { Component } from 'react';

export default class MemeCanvas extends Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(props) { // I don't need to fuck with state.. 
		// but I'm also not sure if this is the correct way to go about this. 
		// in my head it makes sense. 
		if( !props.meme ) return;
		const canvas = this.refs.memeCanvas;
		const context = canvas.getContext('2d');

		const maxWidth = 640;
		const maxHeight = 480;

		let { naturalHeight: height, naturalWidth: width } = props.meme;

		while( height > maxHeight || width > maxWidth ) {
			height -= 1;
			width -= 1;
		}

		/* Draw the background image, scaled to the maxes */
		canvas.height = height;
		canvas.width = width;

		context.drawImage(props.meme, 0, 0, width, height);

		/* Draw the top text */
		if( props.topText ) {
		context.font = `bold ${props.topText.fontSize}px Roboto`; // make options for this shizznat.
		context.lineWidth = Math.max(0, Math.min(props.topText.fontSize/18, 8)); // clamp 0-8?
			context.fillStyle = props.topText.fillColor;
			context.strokeStyle = props.topText.strokeColor;
			const topLines = this.getLines(props.topText.text, width * 0.98 , context); // demo stuff
			topLines.forEach((line, index) => {
				context.fillText(line, width/2 - context.measureText(line).width/2, (index + 1) * props.topText.fontSize) // demo stuff
				context.strokeText(line, width/2 - context.measureText(line).width/2, (index + 1) * props.topText.fontSize) // demo stuff
			})
		}

		/* Draw the bottom text */
		if( props.bottomText ) {
		context.font = `bold ${props.bottomText.fontSize}px Roboto`; // make options for this shizznat.
		context.lineWidth = Math.max(0, Math.min(props.bottomText.fontSize/18, 8)); // clamp 0-8?
			context.fillStyle = props.bottomText.fillColor;
			context.strokeStyle = props.bottomText.strokeColor;
			const bottomLines = this.getLines(props.bottomText.text, width * 0.98 , context); // demo stuff
			bottomLines.reverse().forEach((line, index) => {
				context.fillText(line, width/2 - context.measureText(line).width/2, height - index * props.bottomText.fontSize - (props.bottomText.fontSize/3)) // demo stuff
				context.strokeText(line, width/2 - context.measureText(line).width/2, height - index * props.bottomText.fontSize - (props.bottomText.fontSize/3)) // demo stuff
			})
		}
	}

	getLines(text, maxWidth, context) { // this entire thing is terribly inefficient
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

	render() {
		return <canvas ref="memeCanvas" className="meme-canvas"></canvas>;
	}
}