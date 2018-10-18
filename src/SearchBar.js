import React, {Component} from 'react';

class SearchBar extends Component {
    render() {
	return (
		<input type="text"
	               value={this.props.searchTerm}
	               placeholder="search places"
	               onChange={(e) => this.props.updateTerm(e.target.value)}
		       tabIndex="1"/>
	)
    }
}

export default SearchBar
