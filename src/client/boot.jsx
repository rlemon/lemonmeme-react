import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './app-wrapper';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const container = document.createElement('div');
container.id = 'app-container';
document.body.appendChild(container);

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, container);