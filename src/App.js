import React, { Component } from 'react'
import './App.css'
import SideBar from './SideBar'

class App extends Component {

    state = {
	google: {},
	map: {},
	places: []
    }

    getMap = () => { //returns promise for googleMaps service. Adapted from tremby's solution @ https://stackoverflow.com/questions/48493960/using-google-map-in-react-component
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

    photoize = (places) => { //takes array of places objects and fetches and sets photo from foursquare
	return Promise.all(places.map((place) => //waits for all requests to return
			       fetch(`https://api.foursquare.com/v2/venues/${place.id}/photos?client_id=ZRDNRR3NRFHOQ0EKGVZSCELHE1F4JS1Y1DFXHVSJFARU4GNR&client_secret=MEDYDO5VJ4F23YFQFYHNAWYCLLOB2FWOMER3YKYCVKLFALX1&limit=1&v=20181010`)
				      .then(this.handleErrors)
				     )
			  )
	    .then((photos) => photos.map(({response}) => response.photos.items[0].prefix + '300x300' + response.photos.items[0].suffix)) //convert response to image URL
	    .then((photoURLs) => places.map((place,i) => {place.photo = photoURLs[i];return place})) //set photo URL to photo property of place

    }
    
    fetchPlaces = () => { //fetch bar locations for neighborhood from foursquare, return formatted array of place objects
	const url = 'https://api.foursquare.com/v2/venues/explore?';
	const date = new Date(); //get current date and format for request URL
	const day = (date.getDate()<10) ? `0${date.getDate()}` : `${date.getDate()}`;
	const formattedDate = `${date.getFullYear()}${(date.getMonth() +1)}${day}`;
	const clientId = 'ZRDNRR3NRFHOQ0EKGVZSCELHE1F4JS1Y1DFXHVSJFARU4GNR';
	const clientSecret = 'MEDYDO5VJ4F23YFQFYHNAWYCLLOB2FWOMER3YKYCVKLFALX1';
	return fetch(`${url}client_id=${clientId}&client_secret=${clientSecret}&v=20181101&limit=5&ll=40.014986,-83.011464&radius=1000&section=drinks`)
	    .then(this.handleErrors)
	    .then(({response}) => response.groups[0].items.map(({venue}) => { //pick venues out of response
		return { //format to local data structure
		    name: venue.name.toLowerCase(),
		    id: venue.id,
		    address: venue.location.formattedAddress,
		    lat: venue.location.lat,
		    lng: venue.location.lng
		};
	    })) //returns array of places objects

    }
    
    markerize = ([[google,map],places])  => { //adds marker and infoWindow to each place in places array

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
		    content: `<div class='info-window' tabIndex='1'>
	                        <h3>${place.name}</h3>
                                <div style='background-image:url(${place.photo})' 
                                     class='venue-photo'
                                     role='img'
                                     aria-label='an image of ${place.name}'></div>
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

    handleErrors = (res) => {
	if (res.ok) { 
	    return res.json();
	}
	else {
	    throw Error('an error occurred while loading data from Foursquare');
	}
    }
    
    componentWillMount = this.getMap //start googleMaps service loading, returns a promise for map service

    componentDidMount = () => {
	Promise.all([
	    this.mapPromise.then((google) => { //resolve map promise
	        const map = new google.maps.Map(
		    document.getElementById('map'),
		    {
			center: {lat:40.014986, lng:-83.011464},
			zoom: 16,
			mapTypeControl: false
		    }
		);
		return [google,map];
	    }),
	    this.fetchPlaces().then(this.photoize) //fetch places and photos
	]).then(this.markerize) //once all requests resolve, add markers to places
	    .then(([google,map,places]) => this.setState({google,map,places})) //store data in state
	    .catch((err) => alert(err.message)); 
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
