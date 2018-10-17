import React,{Component} from 'react'

class InfoWindow extends Component {
    render() {
	    <div id="info-window">
	      <h4>{this.props.place.name}</h4>
	      <p>{this.props.place.address[0]}</p>
	      <p>{this.props.place.address[1]}</p>
	      <p>{this.props.place.address[2]}</p>
	    </div>
	    
    }
}

export default InfoWindow
