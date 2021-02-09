import React, {Component} from 'react'
import PropTypes from 'prop-types';
import './search.css'

export default class Search extends Component {
  
  state = {
    value: ""
  }
  
  onSearchChange = (evt) => {
    const {value} = evt.target;
    const {onSearch} = this.props;
    this.setState({value});
    onSearch(value);
  }
  
  render() {
    
    const { value } = this.state
    
    return (
      <input
        className="search"
        type="text"
        placeholder="Type to search..."
        value={value}
        onChange={this.onSearchChange}
      />
    );
  }
};

Search.defaultProps = {
  onSearch: () => {}
}

Search.propTypes = {
  onSearch: PropTypes.func
}
