import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Switch
} from 'react-native';


class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      metric: false
    }
  }

  componentDidMount() {
    Service.getUser().then(data => {
      this.setState({user: data});
      if (data.units === 'us') {
        this.state.metric = false;
      }
      else {
        this.state.metric = true;
      }
    });
  }

  render() {

    if (this.state.user) {
      var username = this.state.user.username;
      var email = this.state.user.email;
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              Email
            </Text>
          </View>
          <TextInput style={styles.input} underlineColorAndroid='rgba(0,0,0,0)' value={email} editable={false}/>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.label}>
            <Text style={styles.labelText}>
              Username
            </Text>
          </View>
          <TextInput style={styles.input} value={username} editable={false}/>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.switchLabel}>
            <Text style={styles.labelText}>
              Metric (default U.S.)
            </Text>
          </View>
          <Switch
            onValueChange={(value) => this.setState({metric: value})}
            value={this.state.metric} />
        </View>


      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    textAlign: 'right',
    height: 30,
    padding: 0,
  },
  inputContainer: {
    borderBottomColor: '#eee',
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
  switchLabel: {
    marginRight: 10,
    flex: 1
  },
  labelText: {
    fontSize: 16,
    color: '#1c1c1c'
  }
});

export default SettingsPage;
