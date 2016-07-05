import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {

    }
  }

  componentDidMount() {
    Service.getLastPhoto(this.props.type).then(data => {
      if (data.length) {
        this.setState({overlay: data[0].url});
      }
    });
  }

  goBack() {
    this.props.navigator.pop();
  }

  takePicture() {
    this.camera.capture()
      .then((data) => this.props.navigator.push({name: 'photoDraft', path: data.path, type: this.props.type, date: this.props.date}))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fit}
          >
        </Camera>
        <Image style={styles.cover} source={{uri: this.state.overlay}}></Image>
        <Button style={styles.capture} onPress={this.takePicture.bind(this)} type="main" text="capture"/>
        <Button text="back" onPress={this.goBack} type="main"/>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    height: width * 1.33,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  cover: {
    opacity: 0.3,
    height: width * 1.33,
    width: width,
    position: 'absolute',
    top: 0
  }
});

export default CameraPage;
