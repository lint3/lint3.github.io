function display_gps(elt) {
  if (!elt) return;
  
  var url = elt.getAttribute('data-gpx-source');
  var mapid = elt.getAttribute('data-map-target');
  if (!url || !mapid) return;
  
  function _t(t) { return elt.getElementsByTagName(t)[0]; }
  function _c(c) { return elt.getElementsByClassName(c)[0]; }
  
  var map = L.map(mapid);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
  }).addTo(map)
  
  var control = L.control.layers(null, null).addTo(map);
  
  new L.GPX(url, {
    async: true,
  }).on('loaded', function(e) {
    var gpx = e.target;
    map.fitBounds(gpx.getBounds());
    control.addOverlay(gpx, gpx.get_name());
    
    _t('h3').textContent = gpx.get_name();
    _c('start').textContent = gpx.get_start_time().toDateString() + ', '
      + gpx.get_start_time().toLocaleTimeString();
    _c('distance').textContent = gpx.get_distance_imp().toFixed(2);
    _c('duration').textContent = gpx.get_duration_string(gpx.get_moving_time());
    _c('pace').textContent     = gpx.get_duration_string(gpx.get_moving_pace_imp(), true);
    _c('elevation-gain').textContent = gpx.to_ft(gpx.get_elevation_gain()).toFixed(0);
    _c('elevation-loss').textContent = gpx.to_ft(gpx.get_elevation_loss()).toFixed(0);
    _c('elevation-net').textContent  = gpx.to_ft(gpx.get_elevation_gain()
      - gpx.get_elevation_loss()).toFixed(0);
      
  }).addTo(map);
  
  
  
}

display_gps(document.getElementByID('demo-map'));
