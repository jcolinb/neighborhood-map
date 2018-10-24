import React, {Component} from 'react'

class ListResults extends Component {

    toggleInfoWindow = (place) => { //controls map animations, displays info window, shifts focus to selected info window
	this.props.places.map((place) => place.infoWindow.close());
	this.props.places.map((place) => place.marker.setAnimation(null));
	place.infoWindow.open(this.props.map,place.marker);
	place.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
	this.props.toggleSideBar();
	setTimeout(() => document.getElementsByClassName('info-window')[0].focus());
    }

    componentDidUpdate = () => {
	this.props.places.map((place) => {
	    place.marker.setMap(this.props.map);
	    place.marker.addListener('click',() => this.toggleInfoWindow(place));
	});
    }
    


    render() {
	return (
	    <div id="list-results">
	      <ol>
		{
		    this.props.places.map((place) => {
			return (
				<li key={place.id}
			            onClick={() => this.toggleInfoWindow(place)}
			            onKeyPress={(e) => {if (e.key === 'Enter') {this.toggleInfoWindow(place);}}}
				    tabIndex="1">
				  {place.name}
			        </li>
			)			
		    })
		}
	      </ol>
	    </div>
	)
    }
}

export default ListResults
