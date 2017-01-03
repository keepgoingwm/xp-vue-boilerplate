export default class Map {
  constructor (mapContainer, center, mapTypeId = 'ROADMAP', zoom = 15, mapOptions = {}) {
    this.mapContainer = mapContainer
    this.mapTypeId = mapTypeId
    this.center = center
    this.zoom = zoom
    this.mapOptions = mapOptions

    let lat = this.center.lat
    let lng = this.center.lng
    if (lat !== '' && lng !== '') {
      this.centerLatLng = new qq.maps.LatLng(lat, lng)
    } else {
      throw new Error('wrong center lat or lng')
    }

    this.map = null
    this.latlngBounds = new qq.maps.LatLngBounds()
  }

  createMap () {
    let mapConfig = {
      center: this.centerLatLng,
      mapTypeId: qq.maps.MapTypeId[this.mapTypeId],
      zoom: this.zoom
    }
    for (let key in this.mapOptions) {
      mapConfig[key] = this.mapOptions[key]
    }

    this.map = new qq.maps.Map(this.mapContainer, mapConfig)
  }

  getCenter () {
    return this.centerLatLng
  }

  addMarkers (positions, markerImages, onclick) {
    this.markers = []
    this.markersInfoWin = []
    positions.forEach((position, index) => {
      let marker = this.addMarker(position, markerImages[index], onclick)
      this.markers.push(marker)
    })
  }

  addMarker (position, markerImage, onclick, options) {
    let latLng = position ? new qq.maps.LatLng(position.lat, position.lng) : this.centerLatLng
    if (markerImage.size) {
      markerImage.size = new qq.maps.Size(markerImage.size[0], markerImage.size[1])
    }
    if (markerImage.scaleSize) {
      markerImage.scaleSize = new qq.maps.Size(markerImage.scaleSize[0], markerImage.scaleSize[1])
    }
    if (markerImage.origin) {
      markerImage.origin = new qq.maps.Point(markerImage.origin[0], markerImage.origin[1])
    }
    if (markerImage.anchor) {
      markerImage.anchor = new qq.maps.Point(markerImage.anchor[0], markerImage.anchor[1])
    }
    let icon = new qq.maps.MarkerImage(markerImage.url, markerImage.size, markerImage.origin, markerImage.anchor, markerImage.scaleSize, markerImage.shadowAngle)

    let markerShape = null
    if (options && options.markerShape) {
      markerShape = new qq.maps.MarkerImage(options.markerShape.coords, options.markerShape.type)
    }

    let marker = new qq.maps.Marker({
      position: latLng,
      title: '',
      icon: icon,
      map: this.map,
      markerShape: markerShape
    })
    this.latlngBounds.extend(latLng)
    // var infoWin = addMarkersInfoWin(marker, `<div style='font-size: small;'>可选网点：${info.name}</div>`)
    // if (onclick && (typeof onclick === 'function')) {
    //   qq.maps.event.addListener(marker, 'click', () => {
    //     onclick()
    //   })
    // }
    return marker
  }

  setMarkerPosition (marker, position) {
    let latLng = new qq.maps.LatLng(position.lat, position.lng)
    this.latlngBounds.extend(latLng)
    marker.setPosition(latLng)
  }

  addMarkersInfoWin (marker, content) {
    let infoWin = new qq.maps.InfoWindow({
      map: this.map
    })

    infoWin.setPosition(marker)
    infoWin.setContent(content)
    infoWin.open()

    return infoWin
  }

  resetLatlngBounds () {
    this.latlngBounds = new qq.maps.LatLngBounds()
    this.latlngBounds.extend(this.centerLatLng)
  }

  fitBounds () {
    if (!this.latlngBounds.isEmpty()) {
      this.map.fitBounds(this.latlngBounds)
    }
    this.map.setCenter(this.centerLatLng)
  }

  // zoom前最好将bounds清掉,否则效果可能并不是预期的
  zoomToMetre (metre) {
    let computeOffset = qq.maps.geometry.spherical.computeOffset
    this.latlngBounds.extend(computeOffset(this.centerLatLng, metre, -90))
    this.latlngBounds.extend(computeOffset(this.centerLatLng, metre, 90))
    this.latlngBounds.extend(computeOffset(this.centerLatLng, metre, 0))
    this.latlngBounds.extend(computeOffset(this.centerLatLng, metre, 180))

    this.fitBounds()
  }

  addCircle (center, radius, options) {
    center = center || this.centerLatLng
    radius = radius || 1000
    let fillColor = options.fillColor || '#00f'
    let strokeColor = options.strokeColor || '#000'
    let strokeWeight = options.strokeWeight || 5
    let strokeDashStyle = options.strokeDashStyle || 'solid'

    if (typeof fillColor === 'object') {
      fillColor = new qq.maps.Color(fillColor.red, fillColor.green, fillColor.blue, fillColor.alpha)
    }
    if (typeof strokeColor === 'object') {
      strokeColor = new qq.maps.Color(strokeColor.red, strokeColor.green, strokeColor.blue, strokeColor.alpha)
    }

    var circle = new qq.maps.Circle({
      map: this.map,
      center: center,
      radius: radius,
      fillColor: fillColor,
      strokeColor: strokeColor,
      strokeWeight: strokeWeight,
      strokeDashStyle: strokeDashStyle
    })

    return circle
  }
}
