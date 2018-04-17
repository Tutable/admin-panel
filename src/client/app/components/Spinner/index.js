/**
 * the in page loaders
 */
import React, { Component } from 'react';

import './index.scss';

export default class Spinner extends Component {
	render() {
		return <section>

			<div className="leftEye"></div>
			<div className="rightEye"></div>
			<div className="mouth"></div>
		</section>
	}
}