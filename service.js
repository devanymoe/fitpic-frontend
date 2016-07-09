import React, { Component } from 'react';
import Secret from './secrets';
var pictures;
var measurements;
var allPicturesMeasures;
import { AsyncStorage } from 'react-native';
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: Secret.clientId, domain: Secret.domain});
var url = 'http://192.168.0.106:3000';

var user;

var userToken;
// http://localhost:3000

export default {
  getUser: function() {
    return Promise.resolve(user);
  },
  getPictures: function() {
    if (pictures) {
      return Promise.resolve(pictures);
    }

    return fetch(url + '/users/pictures', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
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

    return fetch(url + '/users/measurements', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
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
        'Authorization': 'Bearer ' + userToken
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

    return fetch(url + '/users/measurements/new', obj)
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
        'Authorization': 'Bearer ' + userToken
      },
      body: JSON.stringify({
        'id': measure_id
      })
    };

    return fetch(url + '/users/measurements/' + measure_id + '/delete', obj)
      .then(function() {
        measurements.splice(index, 1);
        return measurements;
       })
  },
  getLastPhoto: function(type) {
    return fetch(url + '/users/pictures/' + type, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
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

    var options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    };
    options.body = formData;
    return fetch(url + '/users/pictures/new', options).then((response) => {
      console.log(response)
    });
  },
  showLogin: function(onLoggedIn) {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      userToken = token.idToken;

      var obj = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + userToken
        },
        body: JSON.stringify({
          'email': profile.email,
          'username': profile.nickname,
        })
      };

      return fetch(url + '/login', obj).then(function(res) {
        return res.json();
       })
      .then(function(resJson) {
        user = resJson;
        AsyncStorage.setItem("id", resJson.id).then(function() {
          onLoggedIn();
        });
      });
    });
  },
  isLoggedIn() {
    return AsyncStorage.getItem('id').then(function(id) {
      if (!id) {
        return false;
      }
      else {
        return true;
      }
    })
  },
  logout(handleLogout) {
    AsyncStorage.removeItem('id').then(function() {
      user = null;
      handleLogout();
    })
  },
  getProgress() {
    return fetch(url + '/users/progress', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      }
    }).then(function(response) {
      return response.json().then(function(data) {
        return data;
      });
    });
  }
}
