// https://github.com/tinuzz/leaflet-messagebox/

function get_gpx_urls() {
  datas = [];
  for (element of document.getElementsByClassName("hikes-list")) {
    for (item of element.children) {
      datas.push(item.getAttribute("data"));
    }
  }
  return datas;
}

function add_all_gpx(gpxes, add_to_map, add_to_layer_control) {
  
  for (url of gpxes) {
      new L.GPX(url, {
        async: true,
        marker_options: {
          startIconUrl: '/assets/icons/pin-icon-start.png',
          endIconUrl: '/assets/icons/pin-icon-end.png',
          shadowUrl: '/assets/icons/pin-shadow.png',
          wptIconUrls: {
            '': '/assets/icons/pin-icon-wpt.png'
          }
        },
      }).on('loaded', function(e) {
        var gpx = e.target;
        add_to_layer_control.addOverlay(gpx, gpx.get_name());
      }).addTo(add_to_map);
  }
}

L.Control.Messagebox = L.Control.extend({
  options: {
    position: 'topleft',
    timeout: 7200000
  },
  
  onAdd: function (map) {
    this._container = L.DomUtil.create('div', 'leaflet-control-messagebox');
    //L.DomEvent.disableClickPropagation(this._container);
    return this._container;
  },
  
  show: function (message, timeout) {
    var elem = this._container;
    elem.innerHTML = message;
    elem.style.display = 'block';
    
    timeout = timeout || this.options.timeout;
    
    if (typeof this.timeoutID == 'number') {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(function () {
      elem.style.display = 'none';
    }, timeout);
  }
});

L.Map.mergeOptions({
  messagebox: false
});

L.Map.addInitHook(function () {
  if (this.options.messagebox) {
    this.messagebox = new L.Control.Messagebox();
    this.addControl(this.messagebox);
  }
});

L.control.messagebox = function (options) {
  return new L.Control.Messagebox(options);
};

function display_gps(elt) {
  if (!elt) return;
  
  var mapid = elt.getAttribute('data-map-target');
  if (!mapid) return;
  
  function _t(t) { return elt.getElementsByTagName(t)[0]; }
  function _c(c) { return elt.getElementsByClassName(c)[0]; }
  

  
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
  });
  
  var otm = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  var map = L.map(mapid, {
    layers: [osm]
  });
  
  var options = { timeout: 7200000 };
  var box = L.control.messagebox(options).addTo(map);
  
  box.show( 'Click/tap to toggle interaction' );
  map.scrollWheelZoom.disable();
  map.dragging.disable();
  
  map.on('click', function() {
    
    if (map.scrollWheelZoom.enabled()) {
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      box.show( 'Click/tap to toggle interaction' );
      box.addTo(map);
    }
    else {
      map.scrollWheelZoom.enable();
      map.dragging.enable();
      box.remove();
    }
    
  });
  
  var maplayers = {
    "OpenStreetMap": osm,
    "OpenTopoMap": otm
  };
  
  var layerControl = L.control.layers(maplayers).addTo(map);
  
  add_all_gpx(get_gpx_urls(), map, layerControl);
  
  if(elt.classList.contains("topo")) {
    otm.addTo(map);
    osm.remove();
  }
}

// display_gps(document.getElementById('map-embed'));
