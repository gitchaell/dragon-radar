class Arrow {
  constructor ({ element, latitude, longitude }) {
    this.element = element;
    this.id = `arrow`;
    this.latitudeId = `${this.id}.latitude`;
    this.longitudeId = `${this.id}.longitude`;
    this.latitude = latitude;
    this.longitude = longitude;
    this.element.setAttribute('data-coords', `${this.latitude},${this.longitude}`);
    this.element.addEventListener('click', () => {
      window.open(`https://maps.google.com/?q=${this.latitude},${this.longitude}`, '_blank');
    });
    this.show();
  }

  show() {
    this.element.style.opacity = 1;
  }
}