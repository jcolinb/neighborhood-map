import React, {Component} from 'react'

class ListResults extends Component {

    toggleInfoWindow = (place) => {
	this.props.places.map((place) => place.infoWindow.close());
	this.props.places.map((place) => place.marker.setAnimation(null));
	place.infoWindow.open(this.props.map,place.marker);
	place.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
	this.props.toggleSideBar();
	setTimeout(() => document.getElementsByClassName('info-window')[0].focus());
    }

    componentDidUpdate = () => this.props.places.map((place) => place.infoWindow.close())
    
    render() {
	return (
	    <div id="list-results">
	      <ol>
		{(!this.props.searchTerm) ? (
		    
		    this.props.places.map((place) => {
			place.marker.setMap(this.props.map);
			place.marker.addListener('click',() => this.toggleInfoWindow(place));
			return (
				<li key={place.id}
			            onClick={() => this.toggleInfoWindow(place)}
			    onKeyPress={(e) => {if (e.key === 'Enter') {this.toggleInfoWindow(place);}}}
				    tabIndex="1">
				  {place.name}
			        </li>
			)
		    })
					 
					 )
		 :(
		     
		     this.props.places.filter((place) =>
					      place.name.includes(this.props.searchTerm)
					     )
			 .map((place) => {
			     place.marker.setMap(this.props.map);
			     return (<li key={place.id}
				         onClick={() => this.toggleInfoWindow(place)}
				     onKeyPress={(e) => {if (e.key === 'Enter') {this.toggleInfoWindow(place);}}}				     
				         tabIndex="1">{place.name}</li>)
			 })
		     
		 )
		}
	      </ol>
	    </div>
	)
    }
}

export default ListResults
