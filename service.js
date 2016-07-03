import React, { Component } from 'react';

var user = {id: 1};
var pictures;
var measurements;
var allPicturesMeasures;

export default {
  getUser: function() {

  },
  getPictures: function() {
    if (pictures) {
      return Promise.resolve(pictures);
    }

    return fetch('http://192.168.0.106:3000/users/' + user.id + '/pictures', {
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

  }
}
