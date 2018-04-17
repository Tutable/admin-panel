import React, { Component } from 'react'
import { ASSETS_MAPPING } from '../../constants';

/**
 * The defult assets loading component ot support all the major asset types
 * @param {Number} type represents the asset type
 * @param {String} url represents 
 */
export default ({ type, url }) => <section>
	<hr/>
	<h3>Upload preview</h3>
	<section className='text-center'>
	{ type === ASSETS_MAPPING.AUDIO ? 
		<audio controls type="audio/mpeg">
			<source src={url} />
		</audio>:
		type === ASSETS_MAPPING.IMAGE ?
			<img src={url} height={100}/>:
			type === ASSETS_MAPPING.VIDEO ?
				<video width={400} src={url} controls type="video/mp4">
				</video>: 
			undefined
	}
	</section>
	<hr/>
</section>