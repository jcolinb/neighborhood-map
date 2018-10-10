import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
	google: {},
	map: {}
    }
    
    getMap = () => {
	this.mapPromise = new Promise((res) => {
	    window.resolvePromise = () => {
		resolve(google);
		delete window.resolvePromise;
	    };

	    const script = document.createElement("script");
	    const apiKey = 'AIzaSyAUI-YMQ90J-_GUHUbqblgm3q1UyLNlXHg';

	    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3&&callback=resolvePromise`;
	    script.async = true;
	    script.defer = true;
	    document.body.appendChild(script);
	});
	return this.mapPromise;
    }

    componentWillMount = this.getMap

    componentDidMount = () => {
	this.mapPromise.then((google) => {
	    const map = new google.maps.Map(
		document.getElementById('map'),
		{
		    center: {lat:40.014986, lng:-83.011464},
		    zoom: 13
		}
	    );
	    this.setState({google,map});
	});
    }
    
    render() {
	return (
	    
	)
    }
}

export default App
