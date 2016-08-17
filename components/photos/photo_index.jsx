var React = require('react');
var PhotoStore = require('../../stores/photo_store');
var ClientActions = require('../../actions/client_actions');
var PhotoItem = require('./photo_item');
var $ = require('jquery');

var PhotoIndex = React.createClass({
  getInitialState: function() {
    return({
      photos: PhotoStore.all(),
    })
  },
  componentDidMount: function() {
    ClientActions.fetchPopularPhotos(PhotoStore.nextPage());
    this.listener = PhotoStore.addListener(this._onChange);
    this.bottomListener = this.detectBottom();
  },
  componentWillUnmount: function() {
    this.listener.remove();
    this.bottomListener.remove();
  },
  _onChange: function() {
    this.setState({
      photos: PhotoStore.all()
    })
  },
  detectBottom: function() {
    $(window).scroll(function() {
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        ClientActions.fetchPopularPhotos(PhotoStore.nextPage());
      }
    })
  },
  render: function() {
    return(
      <div>
        {this.state.photos.map(function(photo) {
          return(
            <PhotoItem
              key={photo.id}
              photo={photo}
            />
          )
        }.bind(this))}
      </div>
    )
  }
});

module.exports = PhotoIndex;
