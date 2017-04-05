import React, { Component } from 'react';
import Slider from 'material-ui/Slider';

export default class FontSize extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value
		}
	}
	handleChange(value) {
		this.setState({value});
		this.props.onChange(value);
	}
	render() {
		return <div>
			Font Size 
			<Slider
				min={this.props.min}
				max={this.props.max}
				step={1}
				defaultValue={this.props.value}
				value={this.state.value}
				onChange={(event, value) => this.handleChange(value)} />

			{this.state.value}px
		</div>
	}
}