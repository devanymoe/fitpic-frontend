import React, { Component } from 'react';
import Secret from './secrets';
var pictures;
var measurements;
var allPicturesMeasures;
import { AsyncStorage } from 'react-native';
var Auth0Lock = require('react-native-lock');
var lock = new Auth0Lock({clientId: Secret.clientId, domain: Secret.domain});

var url = 'https://fitpic.herokuapp.com';
// http://localhost:3000
// http://192.168.0.106:3000


var user;
var userToken;

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
        measurements.unshift(resJson[0]);
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
  deletePicture: function(picUrl) {
    var index = pictures.findIndex((item) => {return item.url === picUrl});

    return this.getToken().then(function(token) {
      var obj = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          'url': picUrl
        })
      };

      return fetch(url + '/users/pictures/delete', obj)
      .then(function() {
        pictures.splice(index, 1);
        return pictures;
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
    return this.getToken().then(function(token) {
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
      return fetch(url + '/users/pictures/new', options).then((res) => {
        return res.json().then((data) => {
          if (pictures) {
            pictures.push(data);
          }
          return data;
        });
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
  },
  getEventsByDates() {
    return this.getPictures().then((pictures) => {
      return this.getMeasurements().then((measures) => {
        var data = {};

        for (var i = 0; i < pictures.length; i++) {
          var dateObj = new Date(pictures[i].date)
          var yearPic = dateObj.getFullYear();
          var monthPic = dateObj.getMonth() + 1;
          if (monthPic < 10) {
            monthPic = '0' + monthPic;
          }
          var dayPic = dateObj.getDate();
          if (dayPic < 10) {
            dayPic = '0' + dayPic;
          }
          var picDate = yearPic + '-' + monthPic + '-' + dayPic;

          if (!data[picDate]) {
            data[picDate] = {
              displayDate: monthPic + '/' + dayPic + '/' + yearPic,
              pictures: [pictures[i]]
            }
          }
          else {
            data[picDate].pictures.push(pictures[i]);
          }
        }

        for (var x = 0; x < measures.length; x++) {
          var dateObj = new Date(measures[x].date)
          var yearMeasure = dateObj.getFullYear();
          var monthMeasure = dateObj.getMonth() + 1;
          if (monthMeasure < 10) {
            monthMeasure = '0' + monthMeasure;
          }
          var dayMeasure = dateObj.getDate();
          if (dayMeasure < 10) {
            dayMeasure = '0' + dayMeasure;
          }
          var measureDate = yearMeasure + '-' + monthMeasure + '-' + dayMeasure;

          if (!data[measureDate]) {
            data[measureDate] = {
              displayDate: monthMeasure + '/' + dayMeasure + '/' + yearMeasure,
              measurements: measures[x]
            }
          }
          else {
            data[measureDate].measurements = measures[x];
          }
        }

        return data;
      });
    });
  }
}
