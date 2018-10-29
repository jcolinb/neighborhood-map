import React, {Component} from 'react'
import SearchBar from './SearchBar'
import ListResults from './ListResults'

class SideBar extends Component {
    state = {
	searchTerm: '',
    }

    updateTerm = (str) => { //runs every time filter input changes & keeps searchbar value in sync with list 
	this.props.places.map((place) => { //close infoWindow and remove current markers from map
	    place.marker.setMap(null);
	    place.infoWindow.close();
	    return null;
	});
	if (document.getElementById('sidebar').className === 'sidebar-hidden' && str) { //If menu is collapsed when a search occurs, open it
	    this.toggleSideBar();
	}
	this.setState({searchTerm: str.toLowerCase()});
    }

    toggleSideBar = () => { //open and close menu in sidebar
	const SideBar = document.getElementById('sidebar');
	(SideBar.className === 'sidebar-hidden') ?
	    SideBar.className = 'sidebar-shown' :
	    SideBar.className = 'sidebar-hidden'
    }

    changeSelection = (place) => {  //controls map animations, displays info window, shifts focus to selected info window
	this.props.places.map((place) => place.infoWindow.close());
	this.props.places.map((place) => place.marker.setAnimation(null));
	place.infoWindow.open(this.props.map,place.marker);
	place.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
	setTimeout(() => document.getElementsByClassName('info-window')[0].focus());
	if (window.innerWidth <= 800 && document.getElementById('sidebar').className === 'sidebar-shown') {
	    this.toggleSideBar();
	}
    }
    
    render() {
	return (
		<div id="sidebar" className="sidebar-shown">
		  <SearchBar searchTerm={this.state.searchTerm}
	                     updateTerm={this.updateTerm}
	                     toggleSideBar={this.toggleSideBar}/>
		  <ListResults places={(!this.state.searchTerm) ?
				         this.props.places :
				         this.props.places.filter((place) => place.name.includes(this.state.searchTerm))}
	                       map={this.props.map}
	                       google={this.props.google}
	                       toggleSideBar={this.toggleSideBar}
	                       changeSelection={this.changeSelection}
		  />
		  <span>bar info provided by Foursquare</span>
		</div>
	)
    }
}

export default SideBar
