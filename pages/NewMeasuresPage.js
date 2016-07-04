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
var date = dateObj.toISOString();

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
    var date = this.state.date;
    this.picker.showDatePicker(date, (d) => {
      this.setState({date: d});
    });
  }

  submitMeasures() {
    var form = {
      date: parseInt(this.state.date),
      weight: parseInt(this.state.weight),
      neck: parseInt(this.state.neck),
      arm: parseInt(this.state.arm),
      chest: parseInt(this.state.chest),
      waist: parseInt(this.state.waist),
      hips: parseInt(this.state.hips),
      thigh: parseInt(this.state.thigh),
      calf: parseInt(this.state.calf)
    }
    Service.postNewMeasure(form);
  }

  cancelMeasures() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Button onPress={this.showDatePicker} type="main" text="open this" />
          <DateTimePicker ref={(picker)=>{this.picker=picker}}/>

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
            <Button type="main" text="Submit" onPress={this.submitMeasures}/>
            <Button type="gray" text="Cancel" onPress={this.cancelMeasures}/>
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

  }
});

export default NewMeasuresPage;
