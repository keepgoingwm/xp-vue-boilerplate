export default class Map {
  constructor (mapContainer, center, mapTypeId = 'ROADMAP', zoom = 15, mapOptions = {}) {
    this.mapContainer = mapContainer
    this.mapTypeId = mapTypeId
    this.center = center
    this.zoom = zoom
    this.mapOptions = mapOptions

    this.createMap()
  }

  static getLatLng (location) {
    if (!location || !location.lat || !location.lng) {
      console.log(location)
      throw new Error('wrong location')
    } else {
      let lat = location.lat
      let lng = location.lng
      return new qq.maps.LatLng(lat, lng)
    }
  }

  static getSize (size) {
    if (size) {
      return new qq.maps.Size(size[0], size[1])
    } else {
      return null
      // throw new Error('wrong size')
    }
  }

  static getPoint (point) {
    if (point) {
      return new qq.maps.Point(point[0], point[1])
    } else {
      return null
      // throw new Error('wrong point')
    }
  }

  static getMarkerImage (icon) {
    if (typeof icon === 'string') {
      return new qq.maps.MarkerImage(icon)
    } else {
      let url = icon.url
      let size = Map.getSize(icon.size)
      let scaleSize = Map.getSize(icon.scaleSize)
      let origin = Map.getPoint(icon.origin)
      let anchor = Map.getPoint(icon.anchor)
      let shadowAngle = icon.shadowAngle
      return new qq.maps.MarkerImage(url, size, scaleSize, origin, anchor, shadowAngle)
    }
  }

  createMap () {
    this.map = null
    this.latlngBounds = new qq.maps.LatLngBounds()

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
    return this.center
  }

  get centerLatLng () {
    return Map.getLatLng(this.center)
  }

  setCenter (center) {
    if (center.lat === this.center.lat && center.lng === this.center.lng) {
      return
    }
    this.center = center
    this.map.setCenter(this.centerLatLng)
  }

  addMarkers (positions, markerImages, onclick) {
    this.markers = []
    this.markersInfoWindow = []
    positions.forEach((position, index) => {
      let marker = this.addMarker(position, markerImages[index], onclick)
      this.markers.push(marker)
    })
  }

  addMarker (position, icon, options) {
    let latLng = position ? Map.getLatLng(position) : this.centerLatLng
    let markerImage = Map.getMarkerImage(icon)

    let markerShape = null
    if (options && options.markerShape) {
      markerShape = new qq.maps.MarkerImage(options.markerShape.coords, options.markerShape.type)
    }

    let marker = new qq.maps.Marker({
      position: latLng,
      title: '',
      icon: markerImage,
      map: this.map,
      markerShape: markerShape
    })
    // var infoWin = addMarkersInfoWindow(marker, `<div style='font-size: small;'>可选网点：${info.name}</div>`)
    // if (onclick && (typeof onclick === 'function')) {
    //   qq.maps.event.addListener(marker, 'click', () => {
    //     onclick()
    //   })
    // }
    return marker
  }

  setMarkerPosition (marker, position) {
    let latLng = Map.getLatLng(position)
    marker.setPosition(latLng)
  }

  addMarkersInfoWindow (marker, content) {
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
    this.markers.forEach((ele) => {
      this.latlngBounds.extend(ele.getPosition())
    })
    if (!this.latlngBounds.isEmpty()) {
      this.map.fitBounds(this.latlngBounds)
    }
    this.map.setCenter(this.centerLatLng)
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

  getCircleCenter (circle) {
    return circle.getCenter()
  }

  setCircleCenter (circle, center) {
    circle.setCenter(Map.getLatLng(center))
  }

  setCircleRadius (circle, radius) {
    circle.setRadius(radius)
  }
}
