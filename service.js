import React, { Component } from 'react';

var user = {id: 1, units: 'us', username: 'devanymoe', email: 'devanymoe@gmail.com'};
var pictures;
var measurements;
var allPicturesMeasures;
var url = 'http://192.168.0.106:3000';

// http://localhost:3000

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
  },
  postNewMeasure: function(form) {
    var obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'user_id': user.id,
        'date': form.date,
        'weight': form.weight,
        'neck': form.neck,
        'arm': form.arm,
        'chest': form.chest,
        'waist': form.waist,
        'hips': form.hips,
        'thigh': form.thigh,
        'calf': form.calf
      })
    };

    return fetch(url + '/users/' + user.id + '/measurements/new', obj)
      .then(function(res) {
        return res.json();
       })
      .then(function(resJson) {
        measurements.push(resJson[0]);
        return resJson;
       })
  },
  deleteMeasurement: function(measure_id) {
    var index = measurements.findIndex((item) => {return item.id === measure_id});

    var obj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': measure_id
      })
    };

    return fetch(url + '/users/' + user.id + '/measurements/' + measure_id + '/delete', obj)
      .then(function() {
        measurements.splice(index, 1);
        return measurements;
       })
  },
  getLastPhoto: function(type) {
    return fetch(url + '/users/' + user.id + '/pictures/' + type, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(function(response) {
      return response.json().then(function(data) {
        return data;
      });
    });
  },
  postPicture: function(path, type, date) {
    var formData = new FormData();

    formData.append('image', {uri: path, type: 'image/jpg', name: 'image.jpg'});
    formData.append('date', date);
    formData.append('type', type);

    var options = { method: 'POST' };
    options.body = formData;
    return fetch(url + '/users/' + user.id + '/pictures/new', options).then((response) => {
      console.log(response)
    });
  }
}
