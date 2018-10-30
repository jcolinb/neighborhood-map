import React, {Component} from 'react'

class ListResults extends Component {
    state = {visible:[]}
    
    changeSelection = (place) => {  //controls map animations, displays info window, shifts focus to selected info window
	this.props.places.map((place) => place.infoWindow.close());
	this.props.places.map((place) => place.marker.setAnimation(null));
	place.infoWindow.open(this.props.map,place.marker);
	place.marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
	setTimeout(() => document.getElementsByClassName('info-window')[0].focus());
	if (window.innerWidth <= 800 && document.getElementById('sidebar').className === 'sidebar-shown') { //hide menu in mobile
	    this.props.toggleSideBar();
	}
    }    


    
    componentDidUpdate = () => { //set markers for new filtered list
	let visible = this.props.places.map((place) => {
	    place.marker.setMap(null);
	    place.infoWindow.close();
	})
	    .filter((place) => this.props.searchTerm && place.name.includes(this.props.searchTerm) || true)
	
	    .map((place) => {
		place.marker.setMap(this.props.map);
		place.marker.addListener('click',() => this.changeSelection(place));
		return null;
	    });
	this.setState({visible});
    }
    


    render() {
	return (
	    <div id="list-results">
	      <ol>
		{
		    this.state.visible.map((place) => {
			return (
				<li key={place.id}
			            onClick={() => this.changeSelection(place)}
			            onKeyPress={(e) => {if (e.key === 'Enter') {this.changeSelection(place);}}}
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
