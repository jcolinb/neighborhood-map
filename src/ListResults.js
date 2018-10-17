import React, {Component} from 'react'

class ListResults extends Component {

    render() {
	return (
		<ol>
		{(!this.props.searchTerm) ? (
		    
		    this.props.places.map((place) => {
			place.marker.setMap(this.props.map);
			return (<li key={place.id}>{place.name}</li>)
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
