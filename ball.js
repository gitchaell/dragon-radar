class Ball {
  constructor ({ element }) {
    this.element = element;
    this.id = `ball.${element.dataset.stars}`;
    this.latitudeId = `${this.id}.latitude`;
    this.longitudeId = `${this.id}.longitude`;
    this.latitude = this.getLatitude();
    this.longitude = this.getLongitude();
    this.top = toAbsolutePosition({ latitude: this.latitude });
    this.left = toAbsolutePosition({ longitude: this.longitude });
    this.element.setAttribute('data-coords', `${this.latitude},${this.longitude}`);
    this.element.setAttribute('style', `top: ${this.top}px;left: ${this.left}px;`);
    this.element.addEventListener('click', () => {
      window.open(`https://maps.google.com/?q=${this.latitude},${this.longitude}`, '_blank');
    });
  }

  getLatitude() {
    const latitudeStored = localStorage.getItem(this.latitudeId);
    if (latitudeStored) return parseFloat(latitudeStored);
    const latitudeGenerated = randomLatitude();
    localStorage.setItem(this.latitudeId, latitudeGenerated);
    return latitudeGenerated;
  }

  getLongitude() {
    const longitudeStored = localStorage.getItem(this.longitudeId);
    if (longitudeStored) return parseFloat(longitudeStored);
    const longitudeGenerated = randomLongitude();
    localStorage.setItem(this.longitudeId, longitudeGenerated);
    return longitudeGenerated;
  }
}