var React = require('react');
var ClientActions = require('../../actions/client_actions');
var $ = require('jquery');

var PhotoItem = React.createClass({
  getInitialState: function() {
    return({
      liked: false,
      loaded: false
    })
  },
  handleClick: function() {
    this.setState({
      liked: !this.state.liked
    })
    ClientActions.likePhoto(this.state.liked);
  },
  heartClass: function() {
    if (this.state.liked) {
      return 'fa-heart'
    } else {
      return 'fa-heart-o'
    }
  },
  opacity: function(e) {
    this.setState({
      loaded: true
    })
  },
  render: function() {
    return(
      <div
        className={'img-item liked-' + this.state.liked + ' loaded-' + this.state.loaded}
        onClick={this.handleClick}
        onMouseOver={this.toggleViews}>
        <img
          onLoad={this.opacity}
          data-ratio={this.props.photo.width / this.props.photo.height}
          alt={this.props.photo.name}
          src={this.props.photo.image_url}
        />
        <div className='view-count'>
          {this.props.photo.times_viewed}
        </div>
        <div className='img-desc'>
          <div className='img-name'>
            {this.props.photo.name}
          </div>
          <div className='img-like'>
            <i className={'fa ' + this.heartClass()}></i>
            {}
          </div>
        </div>
      </div>
    )
  }
});

module.exports = PhotoItem;
