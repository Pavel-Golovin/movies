import React, {Component} from 'react'

export default class Search extends Component {
  
  state = {
    text: ""
  }
  
  onSearchChange = () => {
    console.log("onSearchChange()")
  }
  
  render() {
    
    const { text } = this.state
    
    return (
      <input
        className="search"
        type="text"
        placeholder="Type to search..."
        value={text}
        onChange={this.onSearchChange}
      />
    );
  }
};
