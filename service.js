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
  getToken: function() {
    if (userToken) {
      return Promise.resolve(userToken);
    }

    return AsyncStorage.getItem('userToken').then(function(data) {
      userToken = data;
      return userToken;
    });
  },
  getUser: function() {
    if (user) {
      return Promise.resolve(user);
    }
    return AsyncStorage.getItem('user').then(function(data) {
      user = JSON.parse(data);
      return user;
    });
  },
  getPictures: function() {
    if (pictures) {
      return Promise.resolve(pictures);
    }

    return this.getToken().then(function(token) {
      return fetch(url + '/users/pictures', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        return response.json().then(function(data) {
          pictures = data;
          return pictures;
        });
      });
    })
  },
  getMeasurements: function() {
    if (measurements) {
      return Promise.resolve(measurements);
    }

    return this.getToken().then(function(token) {
      return fetch(url + '/users/measurements', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        return response.json().then(function(data) {
          measurements = data;
          return measurements;
        });
      });
    });
  },
  postNewMeasure: function(form) {
    return this.getToken().then(function(token) {
      var obj = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
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
      });
    });
  },
  deleteMeasurement: function(measure_id) {
    var index = measurements.findIndex((item) => {return item.id === measure_id});

    return this.getToken().then(function(token) {
      var obj = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'id': measure_id
        })
      };

      return fetch(url + '/users/measurements/' + measure_id + '/delete', obj)
      .then(function() {
        measurements.splice(index, 1);
        return measurements;
      });
    });
  },
  getLastPhoto: function(type) {
    return this.getToken().then(function(token) {
      return fetch(url + '/users/pictures/' + type, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      });
    });
  },
  postPicture: function(path, type, date) {
    return this.getToken.then(function(token) {
      var formData = new FormData();

      formData.append('image', {uri: path, type: 'image/jpg', name: 'image.jpg'});
      formData.append('date', date);
      formData.append('type', type);

      var options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
      options.body = formData;
      return fetch(url + '/users/pictures/new', options).then((response) => {
        console.log(response)
      });
    });
  },
  showLogin: function(onLoggedIn) {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      userToken = token.idToken;
      AsyncStorage.setItem("userToken", token.idToken);

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
        AsyncStorage.setItem("user", JSON.stringify(resJson)).then(function() {
          onLoggedIn();
        });
      });
    });
  },
  isLoggedIn() {
    return AsyncStorage.getItem('userToken').then(function(token) {
      if (!token) {
        return false;
      }
      else {
        return true;
      }
    })
  },
  logout(handleLogout) {
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('userToken').then(function() {
      user = null;
      handleLogout();
    })
  },
  getProgress() {
    return this.getToken().then(function(token) {
      return fetch(url + '/users/progress', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      });
    });
  },
  getProgressWeight() {
    return this.getToken().then(function(token) {
      return fetch(url + '/users/progress/weight', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(function(response) {
        return response.json().then(function(data) {
          return data;
        });
      });
    });
  }
}
