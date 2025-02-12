/**
 * The application loading component
 * @author gaurav sharma
 * @since 9th january 2018
 */
import React from 'react';

import './index.sass';

export default ({ show = false, key=Math.random()*1000 }) => {
	return <section style={{display: show ? "block" : "none"}} className="loader-container">
		{/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
			<defs>
				<filter id="goo">
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
				<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" result="goo" />
				<feBlend in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
			</defs>
		</svg> */}
		<div className="loader">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</section>
}