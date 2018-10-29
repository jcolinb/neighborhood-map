import React, {Component} from 'react'

class ListResults extends Component {

    componentDidUpdate = () => { //set markers for new filtered list
	this.props.places.map((place) => {
	    place.marker.setMap(this.props.map);
	    place.marker.addListener('click',() => this.props.changeSelection(place));
	    return null;
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
			            onClick={() => this.props.changeSelection(place)}
			            onKeyPress={(e) => {if (e.key === 'Enter') {this.props.changeSelection(place);}}}
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
