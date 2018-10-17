import React, {Component} from 'react'
import SearchBar from './SearchBar'
import ListResults from './ListResults'

class SideBar extends Component {
    state = {
	searchTerm: '',
    }

    updateTerm = (str) => {
	this.props.places.map((place) => {
	    if (!place.name.includes(str)) {
		place.marker.setMap(null);
	    }
	    return null
	});
	this.setState({searchTerm: str.toLowerCase()});
    }

    render() {
	return (
		<div id="sidebar">
		  <SearchBar searchTerm={this.state.searchTerm}
	                     updateTerm={this.updateTerm}/>
		  <ListResults searchTerm={this.state.searchTerm}
	                       places={this.props.places}
	                       map={this.props.map}
	                       google={this.props.google}
		/>
		</div>
	)
    }
}

export default SideBar
