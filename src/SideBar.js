import React, {Component} from 'react'
import SearchBar from './SearchBar'
import ListResults from './ListResults'

class SideBar extends Component {
    state = {
	searchTerm: '',
	searchResults: []
    }

    updateTerm = (str) => {
	this.setState({searchTerm: str.toLowerCase()});
    }

    render() {
	return (
		<div id="sidebar">
		  <SearchBar searchTerm={this.state.searchTerm}
	                     updateTerm={this.updateTerm}/>
		<ListResults searchTerm={this.state.searchTerm}
	                     places={this.props.places}
		/>
		</div>
	)
    }
}

export default SideBar
