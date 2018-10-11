import React, {Component} from 'react';
import SearchBar from './SearchBar'
class SideBar extends Component {
    state = {
	searchTerm: '',
	searchResults: []
    }

    updateTerm = (str) => {
	this.setState({searchTerm: str});
    }
    
    render() {
	return (
		<div id="sidebar">
		  <SearchBar searchTerm={this.state.searchTerm}
	                     updateTerm={this.updateTerm}/>
		</div>
	)
    }
}

export default SideBar
