var Store = require ('flux/utils').Store;
var dispatcher = require('../dispatcher/dispatcher');
var PhotoStore = new Store(dispatcher);
var PhotoConstants = require('../constants/photo_constants');

var _uniquePhotos = {};
var _photos = [];
var _currentPage = 0;
var _totalPages = 1000;

PhotoStore.all = function() {
  return _photos;
};

PhotoStore.nextPage = function() {
  return _currentPage + 1;
};

PhotoStore.totalPages = function() {
  return _totalPages;
};

PhotoStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PhotoConstants.PHOTOS_RECEIEVED:
      resetPhotos(payload.photos.photos);
      updateCurrentPage(payload.photos.current_page);
      updateTotalPages(payload.photos.total_pages);
      PhotoStore.__emitChange();
      break;
  }
};

var resetPhotos = function(photos) {
  photos.forEach(function(photo) {
    if (!_uniquePhotos.hasOwnProperty(photo.id)) {
      _uniquePhotos[photo.id] = photo;
      _photos.push(photo);
    }
  });
};

var updateCurrentPage = function(page) {
  _currentPage = page;
};

var updateTotalPages = function(totalPages) {
  _totalPages = totalPages;
};

module.exports = PhotoStore;
