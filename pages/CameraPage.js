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
    this.handlePress = this.handlePress.bind(this);
    this.state = {

    }
  }

  handlePress() {
    this.props.navigator.pop();
  }

  componentDidMount() {
    Service.getLastPhoto(this.props.type).then(data => {
      if (data.length) {
        this.setState({overlay: data[0].url});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        <Image style={styles.cover} source={{uri: this.state.overlay}}></Image>
        <Button text="back" onPress={this.handlePress} type="main"/>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

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
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // opacity: 0.5,
    position: 'absolute',
    top: 0
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
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0
  }
});

export default CameraPage;
