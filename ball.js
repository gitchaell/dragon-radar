class Ball {
  constructor ({ element }) {
    this.element = element;
    this.id = `ball.${element.dataset.stars}`;
    this.latitudeId = `${this.id}.latitude`;
    this.longitudeId = `${this.id}.longitude`;
    this.latitude = this.getLatitude();
    this.longitude = this.getLongitude();
    this.top = this.getTop({ latitude: this.latitude });
    this.left = this.getLeft({ longitude: this.longitude });
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

  getTop({ latitude }) {
    return (latitude + 180) * (mapHeight / 360);
  }

  getLeft({ longitude }) {
    return (longitude + 180) * (mapWidth / 360);
  }

  show() {
    this.element.style.opacity = 1;
  }

  hide() {
    this.element.style.opacity = +this.element.matches(':hover');
  }
}