import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar'
class App extends Component {

    state = {
	google: {},
	map: {},
	places: []
    }

    apiKey = 'AIzaSyAGMxGp9l_6X9av7QFCayxjjIejqAdrHjk'
    
    getMap = () => {
	this.mapPromise = new Promise((res) => {
	    window.resolvePromise = () => {
		res(window.google);
		delete window.resolvePromise;
	    };

	    const script = document.createElement("script");

	    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&v=3&&callback=resolvePromise`;
	    script.async = true;
	    script.defer = true;
	    document.body.appendChild(script);
	});

    }

    fetchPlaces = () => {
	const url = 'https://api.foursquare.com/v2/venues/explore?';
	const date = new Date();
	const formattedDate = `${date.getFullYear()}${(date.getMonth() +1)}${date.getDate()}`;
	const clientId = 'ZRDNRR3NRFHOQ0EKGVZSCELHE1F4JS1Y1DFXHVSJFARU4GNR';
	const clientSecret = 'MEDYDO5VJ4F23YFQFYHNAWYCLLOB2FWOMER3YKYCVKLFALX1';
	return fetch(`${url}client_id=${clientId}&client_secret=${clientSecret}&v=${formattedDate}&limit=10&ll=40.014986,-83.011464&radius=1000&section=drinks`)
	    .then((res) => res.json())
	    .then(({response}) => response.groups[0].items.map(({venue}) => {
		return {
		    name: venue.name.toLowerCase(),
		    id: venue.id,
		    address: venue.location.formattedAddress,
		    lat: venue.location.lat,
		    lng: venue.location.lng
		};
	    }))
	    .catch((err)=> console.log(err));
    }
    
    componentWillMount = this.getMap

    componentDidMount = () => {
	Promise.all([
	    this.mapPromise.then((google) => {
		const map = new google.maps.Map(
		    document.getElementById('map'),
		    {
			center: {lat:40.014986, lng:-83.011464},
			zoom: 13
		    }
		);
		return [google,map];
	    }),
	    this.fetchPlaces()
	]).then(([[google,map],places]) => this.setState({google,map,places}));
    }
    
    render() {
	return (
		<div id="container">
		
		<div id="map"></div>
		<SideBar places={this.state.places}/>
		</div>
	)
    }
}

export default App
