import React, {Component} from 'react';

class SearchBar extends Component {
    render() {
	return (
		<div id = "search-bar">
		<p onClick={this.props.toggleSideBar} style={{padding:'3px'}}>☰</p>
		<input type="text"
	               value={this.props.searchTerm}
	               placeholder="search places"
	               onChange={(e) => this.props.updateTerm(e.target.value)}
	               tabIndex="1"/>
		</div>
	)
    }
}

export default SearchBar
