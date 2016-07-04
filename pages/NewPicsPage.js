import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Picker
} from 'react-native';

var dateObj = new Date();
var date = dateObj.toISOString();

class NewPicsPage extends Component {
  constructor(props) {
    super(props);
    this.postPicture = this.postPicture.bind(this);
    this.cancelPicture = this.cancelPicture.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.state = {
      date: date,
      type: 'Front'
    };
  }

  postPicture() {
    // post picture code here
    console.log('post picture')
  }

  cancelPicture() {
    this.props.navigator.pop();
  }

  takePicture() {
    this.props.navigator.push({name: 'camera'});
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Date
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.input} value={this.state.date} />
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
                <Button type="main" text="Take Picture" onPress={this.takePicture}/>
              </View>
            </View>
          </View>


          <View style={styles.buttonContainer}>
            <Button onPress={this.cancelPicture} type="main" text="Submit" />
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
  }
});

export default NewPicsPage;
