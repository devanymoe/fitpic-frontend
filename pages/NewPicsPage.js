import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import Spinner from 'react-native-loading-spinner-overlay';
var DateTimePicker = require('react-native-datetime').default;
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Picker,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

var dateObj = new Date();
var month = dateObj.getMonth() + 1;
var day = dateObj.getDate();
var year = dateObj.getFullYear();
var date = month + '/' + day + '/' + year;

class NewPicsPage extends Component {
  constructor(props) {
    super(props);
    this.postPicture = this.postPicture.bind(this);
    this.cancelPicture = this.cancelPicture.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.reviewPhoto = this.reviewPhoto.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.state = {
      date: this.props.date || date,
      type: this.props.type || 'front',
      buttonText: 'Take Picture',
      spinner: false,
    };
  }

  showDatePicker() {
    var date = new Date(this.state.date);
    this.picker.showDatePicker(date, (d) => {
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var year = d.getFullYear();
      var dateString = month + '/' + day + '/' + year;
      this.setState({date: dateString});
    });
  }

  postPicture() {
    this.setState({spinner: true});
    var dateString = new Date(this.state.date).toISOString();
    Service.postPicture(this.props.path, this.state.type, dateString).then(() => {
      this.setState({spinner: false});
      this.props.navigator.push({name: 'pictures'});
    });
  }

  cancelPicture() {
    this.props.navigator.pop();
  }

  takePicture() {
    this.props.navigator.push({name: 'camera', type: this.state.type, date: this.state.date});
  }

  reviewPhoto() {
    this.props.navigator.jumpBack();
  }

  render() {
    if(this.props.path) {
      var picture = (<TouchableHighlight onPress={this.reviewPhoto}><Image style={styles.picture} source={{uri: this.props.path}}></Image></TouchableHighlight>);
    }

    if(!this.props.path) {
      var camButton = (
        <TouchableWithoutFeedback onPress={this.takePicture}>
          <Icon name='photo-camera' size={30} style={styles.icon}/>
        </TouchableWithoutFeedback>
      )
    }

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinner} style={styles.spinner} overlayColor='rgba(0, 0, 0, 0.6)'/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <DateTimePicker ref={(picker)=>{this.picker=picker}} style={styles.picker}/>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Date
              </Text>
            </View>
            <Text onPress={this.showDatePicker}  style={styles.input}>{this.state.date}</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Type
              </Text>
            </View>
            <Picker
              selectedValue={this.state.type}
              style={styles.picker}
              onValueChange={(type) => this.setState({type: type})}>
              <Picker.Item label="Front" value="front" />
              <Picker.Item label="Side" value="side" />
              <Picker.Item label="Back" value="back" />
              <Picker.Item label="Front Flex" value="front-flex" />
              <Picker.Item label="Side Flex" value="side-flex" />
              <Picker.Item label="Back Flex" value="back-flex" />
            </Picker>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Picture
              </Text>
            </View>
            <View style={styles.photoButtonContainer}>
              <View style={styles.photoButton}>
                {picture}
                {camButton}
              </View>
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <Button onPress={this.postPicture} type="mainLarge" text="Submit" textStyle="large"/>
          </View>
          <View style={[styles.buttonContainer, styles.bottomButton]}>
            <Button onPress={this.cancelPicture} type="grayLarge" text="Cancel" textStyle="large"/>
            </View>
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1
  },
  scrollContainer: {
    // alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20
  },
  input: {
    flex: 1,
    textAlign: 'right',
    height: 30,
    padding: 0,
    color: '#000',
    marginTop: 8,
    fontSize: 15
  },
  inputContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    width: 100,
    marginRight: 10
  },
  labelText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold'
  },
  buttonContainer: {
    paddingTop: 16,
    paddingLeft: 14,
    paddingRight: 14
  },
  bottomButton: {
    marginTop: -4
  },
  photoButtonContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  photoButton: {
    justifyContent: 'flex-end'
  },
  picker: {
    width: 140,
    marginRight: -16
  },
  picture: {
    width: 200,
    height: 200,
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default NewPicsPage;
