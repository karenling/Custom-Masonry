var $ = require('jquery');

var Masonry = function(selector,padding) {
  this.$selector = $(selector);
  this.padding = padding;
  this.containerWidth = $(selector).width() - this.padding;
  this.$selector.css('padding', padding/2);
  this.resizeImages();
};

Masonry.prototype.resizeImages = function() {
  this.currentImages = [];
  this.currentRow = 0;
  this.$selector.find('> div > img').each(function(idx,img) {
    this.handleRow(idx,img);
  }.bind(this));
  this.resizeRow();
};

Masonry.prototype.handleRow = function(idx,img) {
  var ratio = $(img).data('ratio');
  this.currentImages.push(img);
  this.currentRow += ratio;
  if (this.currentRow >= this.getColumns()) {
    this.setupRow();
  }
};

Masonry.prototype.setupRow = function() {
  var totalMargins = (this.currentImages.length - 1) * this.padding;
  this.height = (this.containerWidth - totalMargins)/this.currentRow;
  this.resizeRow();
  this.currentImages = [];
  this.currentRow = 0;
};

Masonry.prototype.resizeRow = function() {
  this.currentImages.forEach(function(currentImg) {
    this.resizeImgContainer(currentImg);
  }.bind(this));
};

Masonry.prototype.resizeImgContainer = function(currentImg) {
  var ratio = $(currentImg).data('ratio');
  $(currentImg).parent().width(this.height * ratio);
  $(currentImg).parent().height(this.height);
  $(currentImg).parent().css('padding', this.padding/2);
};

Masonry.prototype.getColumns = function() {
  if (this.containerWidth < 544) {
    return 1;
  } else if (this.containerWidth < 768) {
    return 2;
  } else if (this.containerWidth < 992) {
    return 3;
  } else {
    return 4;
  }
};

KarenMasonry = function(selector,padding) {
  new Masonry(selector,padding);
};
