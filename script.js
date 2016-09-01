/**
 * Constructor
 *
 * @param {object} component
 * @param {function} callback
 * @property {object} me
 * @property {object} cookie
 * @property {object} component
 * @property {string} type
 * @property {string} link
 * @property {object} config
 *
 */
var SmartAppBanner = function(component, callback){
  var me = this;
  this.cookie     = _.cookie; // global
  this.component  = component;
  this.type       = this.getType();
  this.link       = this.getLink(this.type);
  this.config     = {
      scope           : "html",
      button          : ".smartbanner-button",
      close           : ".smartbanner-close",
      classShow       : "smartbanner-show",
      cookieClosed    : "smartbanner-closed",
      cookieInstalled : "smartbanner-installed"
  }
  /**
   * Verification
   * @property {string} type
   * @property {string} link
   * @property {string} cookie (smartbanner-closed)
   * @property {string} cookie (smartbanner-installed)
   */
  if( this.type && this.link && this.component && !this.cookie.get( this.config.cookieClosed ) && !this.cookie.get( this.config.cookieInstalled ) ){

    callback( this.template() );

    document.querySelector( this.config.button ).addEventListener("click", this.install );
    document.querySelector( this.config.close ).addEventListener("click", function(event){
      event.preventDefault();
      me.close();
    });

    this.show();
  }
};
/**
 * Get type
 *
 * @property {string} type
 * @returns {string} type
 *
 */
SmartAppBanner.prototype.getType = function(){
  var type = false;

  if ( navigator.userAgent.match(/Safari/i) && navigator.userAgent.match(/iPhone|iPod|iPad/i) ) {
      type = "ios";
  } else {
      if ( navigator.userAgent.match(/Android/i) ) {
          type = "android";
      }
  }

  return type;
};
/**
 * Template
 *
 * @property {array} content
 * @returns {string} content
 *
 */
SmartAppBanner.prototype.template = function(){
  var content = [
    '<div class="smartbanner smartbanner-'+this.type+'">',
        '<div class="smartbanner-container">',
            '<button class="smartbanner-close" type="button">×</button>',
            '<figure class="smartbanner-image">',
              '<img class="smartbanner-image-icon" src="http://images.submarino.io/spacey/2016/08/30/logo-suba.png" width="50" height="50" />',
            '</figure>',
            '<div class="smartbanner-info">',
                '<span class="smartbanner-info-text">'+this.component.label+'</span>',
            '</div>',
            '<div class="smartbanner-actions">',
              '<a class="smartbanner-button" href="'+this.link+'">usar</a>',
            '</div>',
        '</div>',
    '</div>'
  ];

  return content.join("");
};
/**
 * Hide
 */
SmartAppBanner.prototype.hide = function() {
  document.querySelector( this.config.scope ).classList.remove( this.config.classShow );
};
/**
 * Show
 */
SmartAppBanner.prototype.show = function() {
  document.querySelector( this.config.scope ).classList.add( this.config.classShow );
};
/**
 * Close
 */
SmartAppBanner.prototype.close = function() {
  this.hide();
  this.cookie.set( this.config.cookieClosed , "true", {
    path: "/",
    expires: +new Date + 864E5 * 15 // 15 days hidden
  })
};
/**
 * Install
 */
SmartAppBanner.prototype.install = function() {
  this.hide();
  this.cookie.set( this.config.cookieInstalled , "true", {
    path: "/",
    expires: +new Date + 864E5 * 90 // 90 days reminder
  })
};
/**
 * Template
 *
 * @property {object} os
 * @property {string} metaTag
 * @returns {string}
 *
 */
SmartAppBanner.prototype.getLink = function(type) {
    var os = {
        ios: {
            link: "itms-apps://"
        },
        android: {
            link: "market://"
        }
    };

    return os[type].link;
};
/**
 * Create new instance
 *
 * @property {object} component
 * @property {function} cb
 *
 */




new SmartAppBanner(this.component, cb);
