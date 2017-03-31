import React from 'react';
import ReactDOM from 'react-dom';

import App from './app-wrapper';

const container = document.createElement('div');
container.id = 'app-container';
document.body.appendChild(container);

ReactDOM.render(<App />, container);