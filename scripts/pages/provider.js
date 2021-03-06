/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const MapView = require('sf-core/ui/mapview');
const Image = require('sf-core/ui/image');
const Router = require("sf-core/ui/router");
const Common = require("../lib/common");
const System = require("sf-core/device/system");
const ProviderDesign = require('ui/ui_provider');
const Application = require("sf-core/application");
const config = require("../settings.json").config;

const Provider = extend(ProviderDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.button1.onPress = () => Common.callPhone("19000000");
    this.button2.onPress = () => {
      if (System.OS === "Android") {
        Application.call("https://www.google.com/maps/dir/", {
          "api": "1",
          "travelmode": "walking",
          "dir_action": "navigate",
          "destination": "37.4488259,-122.1600047",
        });
      }
      else {
        Application.call("http://maps.apple.com/", {
          "daddr": "37.4488259,-122.1600047",
          "dirflg": "w"
        });
      }
    };
    this.backButton.onTouchEnded = () => Router.goBack();
  });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
  superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
  superOnLoad();
  renderMap(this);
}

const renderMap = (page) => {
  const mapView1 = page.mapView1;
  mapView1.onCreate = () => {
    mapView1.centerLocation = {
      latitude: 37.4488259,
      longitude: -122.1600047
    };

    mapView1.touchEnabled = false;
    mapView1.rotateEnabled = false;

    mapView1.zoomLevel = 13;
    const myPin = new MapView.Pin({
      location: {
        latitude: 37.4488259,
        longitude: -122.1600047
      },
      image: config.theme.currentTheme == 'helloTheme' ? Image.createFromFile("images://map_pin.png", 150, 150) : Image.createFromFile("images://map_pin_orange.png", 150, 150),
    });
    mapView1.addPin(myPin);
  }
}

module && (module.exports = Provider);
