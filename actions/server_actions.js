var dispatcher = require('../dispatcher/dispatcher');
var Store = require('../stores/photo_store');
var PhotoConstants = require('../constants/photo_constants')

var ServerActions = {
  receiveAllPhotos: function(photos) {
    dispatcher.dispatch({
      actionType: PhotoConstants.PHOTOS_RECEIEVED,
      photos: photos
    });
  }
};

module.exports = ServerActions;
