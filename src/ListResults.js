import React, {Component} from 'react'

class ListResults extends Component {

    toggleInfoWindow = (place) => {
	console.log(`${place.name}`);
	this.props.places.map((place) => place.infoWindow.close());
	place.infoWindow.open(this.props.map,place.marker);
    }
    
    render() {
	return (
		<ol>
		{(!this.props.searchTerm) ? (
		    
		    this.props.places.map((place) => {
			place.marker.setMap(this.props.map);
			return (
				<li key={place.id}
			            onClick={() => this.toggleInfoWindow(place)}>
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
			     return (<li key={place.id}>{place.name}</li>)
			 })
		     
		 )
		}
	    </ol>
	)
    }
}

export default ListResults
