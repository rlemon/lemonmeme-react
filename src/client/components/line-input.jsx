import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ColorPicker from './color-picker';

export default class LineInput extends Component {
	constructor(props) {
		super(props);
		this.options = {
			fillColor: '#F5F5F5',
			strokeColor: '#242424',
			text: ''
		};
	}
	handleChange(prop, value) {
		this.options[prop] = value;
		this.props.onChange(this.options);
	}
	render() {
		return <div className="line-input-container">

				<TextField 
					fullWidth={true} 
					hintText={this.props.inputLabel} 
					onChange={event => this.handleChange('text', event.target.value)} />

				<ColorPicker
					color={this.options.fillColor}
					onChange={color => this.handleChange('fillColor', color.hex)}
					label='Fill Color' />

				<ColorPicker
					color={this.options.strokeColor}
					onChange={color => this.handleChange('strokeColor', color.hex)}
					label='Stroke Color' />

		</div>;
	}
}