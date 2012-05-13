/*global window, nodeca, jQuery, Handlebars, Backbone, $, _*/


"use strict";


// prevent the event from bubbling to ancestor elements
function stopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}


module.exports = Backbone.View.extend({
  el: '#toolbar',


  $download_btn:  null,
  $glyphs_count:  null,


  initialize: function () {
    var self = this, $glyph_size_value;

    // cache some inner elements
    this.$download_btn = this.$('#result-download');
    this.$glyphs_count = this.$('#selected-glyphs-count');

    // initialize glyph-size slider
    $glyph_size_value = $('#glyph-size-value');
    $('#glyph-size-slider').slider({
      orientation:  'horizontal',
      range:        'min',
      value:        nodeca.config.fontomas.glyph_size.val,
      min:          nodeca.config.fontomas.glyph_size.min,
      max:          nodeca.config.fontomas.glyph_size.max,
      slide:        function (event, ui) {
        /*jshint bitwise:false*/
        var val = ~~ui.value;
        $glyph_size_value.text(val + 'px');
      },
      change:       function (event, ui) {
        /*jshint bitwise:false*/
        var val = ~~ui.value;
        self.trigger("change:glyph-size", val);
      }
    });

    // bind download button click event
    this.$download_btn.click(function (event) {
      event.preventDefault();
      self.trigger('click:download');
    });

    // initial setup
    this.setGlyphsCount(0);
  },


  setGlyphsCount: function (count) {
    this.$download_btn.toggleClass('disabled', !count);
    this.$download_btn[!count ? 'on' : 'off']('click', stopPropagation);

    this.$glyphs_count.text(+count);
  }
});