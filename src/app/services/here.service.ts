import { Injectable } from '@angular/core';

/// <reference types="@types/heremaps" />

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class HereService {
  public platform: any;
  public geocoder: any;

  constructor() { 

    this.platform = new H.service.Platform({
    // 'app_id': 'AZ9I1rJD0uSCBlM1X7Jx',
    'apikey': 'GtrzkMGptaGakeGke_df33YXxzmJvrklzSsXxEFZlu0'
    });
    this.geocoder = this.platform.getGeocodingService();
  }

  public getAddress(query: string) {
  return new Promise((resolve, reject) => {
    this.geocoder.geocode({ searchText: query }, result => {
      if(result.Response.View.length > 0) {
        if(result.Response.View[0].Result.length > 0) {
          resolve(result.Response.View[0].Result);
          } else {
            reject({ message: "no results found" });
            }
        } else {
          reject({ message: "no results found" });
          }
        }, error => {
          reject(error);
        });
    });
  }

  public getAddressFromLatLng(query: string) {
    return new Promise((resolve, reject) => {
        this.geocoder.reverseGeocode({ prox: query, mode: "retrieveAddress" }, result => {
            if(result.Response.View.length > 0) {
                if(result.Response.View[0].Result.length > 0) {
                    resolve(result.Response.View[0].Result);
                } else {
                    reject({ message: "no results found" });
                }
            } else {
                reject({ message: "no results found" });
            }
        }, error => {
            reject(error);
        });
    });
  }

}
