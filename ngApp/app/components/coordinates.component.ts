import {Component} from "@angular/core";
import {Http} from "@angular/http";

@Component({
  template: `
    <h1>Coordinates</h1>
    <div *ngIf="!isLoaderActive">
      <div>
        <button (click)="autoCoords()">CLICK ME TO GET YOUR ADDRESS</button>
        or
        <button (click)="toggleManual()">CLICK TO MANUAL</button>
      </div>
      <div *ngIf="isManual">
        <label for="coordinates">Enter coordinates:</label>
        <input name="coordinates" [(ngModel)]="coordinates"/>
        <button (click)="coordinates2address(coordinates)">Click me</button>
      </div>
      <div>
        <span id="street" *ngIf="address">Your address: {{address}}</span>
      </div>
    </div>
    <div *ngIf="isLoaderActive">Please wait. Processing...</div>
  `
})
export class CoordinatesComponent {

  coordinates: String;
  address: String;
  isManual: Boolean;
  isLoaderActive: Boolean;

  constructor(private http: Http) {
    this.isManual = false;
    this.address = '';
  }

  public toggleLoader() {
    this.isLoaderActive = !this.isLoaderActive;
  }

  public coordinates2address(coords: String) {
    this.address = '';
    this.toggleLoader();
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}`)
      .subscribe(res => {
        this.address = res.json()['results'][0]['formatted_address'];
        this.toggleLoader();
      })
  }

  public autoCoords() {
    this.toggleLoader();
    navigator.geolocation.getCurrentPosition((callback) => {
      const s = `${callback.coords.latitude},${callback.coords.longitude}`;
      console.log(s);
      this.coordinates = s;
      this.coordinates2address(this.coordinates);
      this.toggleLoader();
    });
  }

  public toggleManual() {
    this.isManual = !this.isManual;
  }
}
