import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GalleryByReactApp from './src/components/GalleryByReactApp'

//css
// import './src/styles/main.scss';

// var imageData = require('./src/data/imageData.json');

class TodoList extends Component{
	render(){
	var imageURL = require('./src/images/1.jpg');

	console.log(imageURL);
		return (
			<div>
				TODOLIST
				<img src={imageURL} />
			</div>
		)
	}
}

ReactDOM.render(
	<GalleryByReactApp />,
	document.getElementById('content')
);