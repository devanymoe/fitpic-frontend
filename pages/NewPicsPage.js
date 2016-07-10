import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
var DateTimePicker = require('react-native-datetime').default;
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Picker,
  Image
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
      buttonText: 'Take Picture'
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
    var dateString = new Date(this.state.date).toISOString();
    Service.postPicture(this.props.path, this.state.type, dateString).then(() => {
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

    return (
      <View style={styles.container}>
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
            <Text style={styles.input}>{this.state.type}</Text>
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
                <Button type="main" text={this.state.buttonText} onPress={this.takePicture}/>
              </View>
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <Button onPress={this.postPicture} type="main" text="Submit" />
            <Button onPress={this.cancelPicture} type="gray" text="Cancel" />
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
    padding: 0
  },
  inputContainer: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 10,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    width: 100,
    marginRight: 10
  },
  labelText: {
    fontSize: 16,
    color: '#1c1c1c'
  },
  buttonContainer: {

  },
  photoButtonContainer: {
    flex: 1
  },
  photoButton: {
    justifyContent: 'flex-end'
  },
  picker: {
    width: 200
  },
  picture: {
    width: 200,
    height: 200,
  },
  picker: {
    width: 200
  }
});

export default NewPicsPage;
