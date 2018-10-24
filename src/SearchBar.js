import React, {Component} from 'react';

class SearchBar extends Component {

    render() {
	return (
		<div id = "search-bar">
		  <p tabIndex="1"
	             onClick={this.props.toggleSideBar}
	             onKeyPress={(e)=>{if(e.key==="Enter"){this.props.toggleSideBar();}}}>
		    ☰
	          </p>
		  <input type="text"
	                 aria-label="find a place" 
	                 value={this.props.searchTerm}
	                 placeholder="find a place"
	                 onChange={(e) => this.props.updateTerm(e.target.value)}
	                 tabIndex="1"/>
		</div>
	)
    }
}

export default SearchBar
