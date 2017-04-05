import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: this.props.color || '#000000',
			showInput: false,
			position: {}
		};
	}
	showInput() {
		const { top, left } = this.btn.getBoundingClientRect()
		this.setState({
			showInput: true,
			position: {
				top: `${top + 12}px`,
				left: `${left + 12}px`
			}
		});
	}
	hideInput() {
		this.setState({showInput: false});
	}
	handleChange(color) {
		this.setState({color: color.hex});
		this.props.onChange(color)
	}
	render() {
		// seriously how do you guys manage to make this not look like poo?
		return <div className='color-picker-input'>

				{ this.props.label ? 
					<div className='color-picker-label'>{this.props.label}</div> 
				: null }
				{ this.state.showInput ? 
					<div className='color-picker-canvas-wrapper' style={this.state.position}>
						<div className='overlay' onClick={_=>this.hideInput() } />
						<ChromePicker
							disableAlpha={true}
							color={this.state.color}
							onChange={this.handleChange.bind(this)} />
					</div>
				: null }
				<button onClick={_=>this.showInput()} ref={btn => this.btn = btn} className='color-picker-button'>
					<span style={{backgroundColor: this.state.color }}></span>
				</button>

		</div>;
	}
}