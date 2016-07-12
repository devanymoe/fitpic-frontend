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
import Slider from 'react-native-slider';

class CameraPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.state = {
      show: true,
      value: 0.4
    }
  }

  componentDidMount() {
    Service.getLastPhoto(this.props.type).then(data => {
      if (data.length) {
        this.setState({overlay: data[0].url});
      }
    });
    setTimeout(() => {
      this.setState({show: false});
      setTimeout(() => {
        this.setState({show: true});
      })
    }, 200);
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
    var camera;
    if (this.state.show) {
      camera = (
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fit}
          captureTarget={Camera.constants.CaptureTarget.disk}
          >
        </Camera>
      )
    }
    return (
      <View style={styles.container}>
        {camera}
        <Image style={[styles.cover, {opacity: this.state.value}]} source={{uri: this.state.overlay}}></Image>
        <View style={styles.camControls}>
          <Slider
          onValueChange={(value) => this.setState({value: value})}
          style={styles.slider}
          value={0.4}
          maximumValue={0.8}
          maximumTrackStyle="rgba(255, 255, 255, 0.2)"
          thumbStyle={{backgroundColor: '#fff'}}
          minimumTrackTintColor="#fff"
          />
          <Button style={styles.capture} onPress={this.takePicture.bind(this)} type="main" text="capture"/>
        </View>
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
    backgroundColor: '#000'
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
    // opacity: 0.3,
    height: width * 1.33,
    width: width,
    position: 'absolute',
    top: 0
  },
  slider: {
    width: 240,
    marginBottom: 20
  },
  camControls: {
    height: height - (width * 1.33),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CameraPage;
