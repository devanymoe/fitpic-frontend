import React, { Component } from 'react';

var user = {id: 1, units: 'us'};
var pictures;
var measurements;
var allPicturesMeasures;
var url = 'http://192.168.0.106:3000'

export default {
  getUser: function() {
    return Promise.resolve(user);
  },
  getPictures: function() {
    if (pictures) {
      return Promise.resolve(pictures);
    }

    return fetch(url + '/users/' + user.id + '/pictures', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json().then(function(data) {
        pictures = data;
        return pictures;
      });
    });
  },
  getMeasurements: function() {
    if (measurements) {
      return Promise.resolve(measurements);
    }

    return fetch(url + '/users/' + user.id + '/measurements', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json().then(function(data) {
        measurements = data;
        return measurements;
      });
    });
  }
}
