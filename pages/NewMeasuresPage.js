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
  ScrollView
} from 'react-native';

var dateObj = new Date();
var month = dateObj.getMonth() + 1;
var day = dateObj.getDate();
var year = dateObj.getFullYear();
var date = month + '/' + day + '/' + year;

class NewMeasuresPage extends Component {

  constructor(props) {
    super(props);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.submitMeasures = this.submitMeasures.bind(this);
    this.cancelMeasures = this.cancelMeasures.bind(this);
    this.state = {
      date: date
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

  submitMeasures() {
    var form = {
      date: new Date(this.state.date),
      weight: parseInt(this.state.weight),
      neck: parseInt(this.state.neck),
      arm: parseInt(this.state.arm),
      chest: parseInt(this.state.chest),
      waist: parseInt(this.state.waist),
      hips: parseInt(this.state.hips),
      thigh: parseInt(this.state.thigh),
      calf: parseInt(this.state.calf)
    }
    Service.postNewMeasure(form).then(() => {
      this.props.navigator.push({name: 'measure'});
    });
  }

  cancelMeasures() {
    this.props.navigator.pop();
  }

  render() {
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
                Weight
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({weight: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Neck
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({neck: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Bicep
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({arm: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Chest
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({chest: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Waist
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({waist: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Hips
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({hips: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Thigh
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({thigh: text})}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Calf
              </Text>
            </View>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' keyboardType="numeric" style={styles.input} onChangeText={(text) => this.setState({calf: text})}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button type="mainLarge" text="Submit" textStyle="large" onPress={this.submitMeasures}/>
          </View>
          <View style={[styles.buttonContainer, styles.bottomButton]}>
            <Button type="grayLarge" text="Cancel" textStyle="large" onPress={this.cancelMeasures}/>
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
    paddingLeft: 16,
    paddingRight: 16,
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
    color: '#666',
    fontWeight: 'bold'
  },
  buttonContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  bottomButton: {
    marginTop: -4
  },
  picker: {
    width: 200
  }
});

export default NewMeasuresPage;
