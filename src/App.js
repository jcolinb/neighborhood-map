import React, { Component } from 'react'
import './App.css'
import SideBar from './SideBar'

class App extends Component {

    state = {
	google: {},
	map: {},
	places: []
    }

    getMap = () => { 
	this.mapPromise = new Promise((res) => {
	    window.resolvePromise = () => {
		res(window.google);
		delete window.resolvePromise;
	    };

	    const script = document.createElement("script");
	    const apiKey = 'AIzaSyAGMxGp9l_6X9av7QFCayxjjIejqAdrHjk'

	    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3&&callback=resolvePromise`;
	    script.async = true;
	    script.defer = true;
	    document.body.appendChild(script);
	});
    }

    photoize = (places) => {
	return Promise.all(places.map((place) =>
				      fetch(`https://api.foursquare.com/v2/venues/${place.id}/photos?client_id=ZRDNRR3NRFHOQ0EKGVZSCELHE1F4JS1Y1DFXHVSJFARU4GNR&client_secret=MEDYDO5VJ4F23YFQFYHNAWYCLLOB2FWOMER3YKYCVKLFALX1&limit=1&v=20181010`).then((res) => res.json()))
			  ).then((photos) => photos.map(({response}) => response.photos.items[0].prefix + '300x300' + response.photos.items[0].suffix))
	    .then((photoURLs) => places.map((place,i) => {place.photo = photoURLs[i];return place}))
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
    
    markerize = ([[google,map],places])  => {
	const markerizedPlaces = places.map((place) => {
	    place.marker = new google.maps.Marker(
		{
		    position: {
			lat: place.lat,
			lng: place.lng
		    },
		    label: place.name
		}
	    );
	    place.infoWindow = new google.maps.InfoWindow(
		{
		    content: `<div class='info-window'>
	                        <h4>${place.name}</h4>
                                <div style='background-image:${place.photo}' class='venue-photo'></div>
	                        <p>${place.address[0]}</p>
	                        <p>${place.address[1]}</p>
	                        <p>${place.address[2]}</p>
	                      </div>`
		}
	    );
	    return place;
	});
	return [google,map,markerizedPlaces];
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
	    this.fetchPlaces().then(this.photoize)
	]).then(this.markerize)
	    .then(([google,map,places]) => this.setState({google,map,places}));
    }
    
    render() {
	return (
		<div id="container">
		  <div id="map" tabIndex="-1"></div>
		  <SideBar places={this.state.places}
	                   map={this.state.map}
	                   google={this.state.google}/>
		</div>
	)
    }
}

export default App
