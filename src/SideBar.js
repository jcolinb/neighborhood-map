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
	if (document.getElementById('sidebar').className === 'sidebar-hidden' && str) {
	    this.toggleSideBar();
	}
	this.setState({searchTerm: str.toLowerCase()});
    }

    toggleSideBar = () => {
	const SideBar = document.getElementById('sidebar');
	(SideBar.className === 'sidebar-hidden') ?
	    SideBar.className = 'sidebar-shown' :
	    SideBar.className = 'sidebar-hidden'
    }

    render() {
	return (
		<div id="sidebar" className="sidebar-shown">
		  <SearchBar searchTerm={this.state.searchTerm}
	                     updateTerm={this.updateTerm}
	                     toggleSideBar={this.toggleSideBar}/>
		  <ListResults places={(!this.state.searchTerm) ? this.props.places : this.props.places.filter((place) => place.name.includes(this.state.searchTerm))}
	                       map={this.props.map}
	                       google={this.props.google}
	                       toggleSideBar={this.toggleSideBar}
		/>
		</div>
	)
    }
}

export default SideBar
