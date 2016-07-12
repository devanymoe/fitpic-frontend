import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import groupBy from 'lodash.groupby';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Modal
} from 'react-native';

class PicturesPage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.deleteConfirmation = this.deleteConfirmation.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      activeUrl: '',
      modalVisible: false
    };
  }

  handlePress() {
    this.props.navigator.push({name: 'camera'});
  }

  componentDidMount() {
    Service.getPictures().then(data => {
      var pictures = groupBy(data, function(obj) {
        var picDate = new Date(obj.date);
        return (picDate.getMonth() + 1) + '/' + picDate.getDate() + '/' + picDate.getFullYear();
      });
      this.setState({pictures: pictures});
    });
  }

  setModalVisible(visible, url) {
    this.setState({activeUrl: url});
    this.setState({modalVisible: visible});
  }

  deletePhoto(url) {
    Alert.alert(
      'Delete Picture',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete Entry', onPress: () => this.deleteConfirmation(url)}
      ]
    )
  }

  deleteConfirmation(url) {
    Alert.alert(
      'Are you sure you want to delete this picture?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete Entry', onPress: () => this.deleteEntry(url)},
      ]
    )
  }

  deleteEntry(url) {
    Service.deletePicture(url).then((data) => {
      var pictures = groupBy(data, function(obj) {
        var picDate = new Date(obj.date);
        return (picDate.getMonth() + 1) + '/' + picDate.getDate() + '/' + picDate.getFullYear();
      });
      this.setState({pictures: pictures});
    });
  }

  renderGroup(groupName, arr) {
    var images = [];
    for (var i = 0; i < arr.length; i++) {
      images.push(<TouchableHighlight onPress={this.setModalVisible.bind(this, true, arr[i].url)} onLongPress={this.deletePhoto.bind(this, arr[i].url)} key={i} style={styles.imageTouch}><Image source={{uri: arr[i].url}} style={styles.image}></Image></TouchableHighlight>)
    }
    return (<View key={groupName} style={styles.cardContainer}><View style={styles.card}><Text style={styles.date}>{groupName}</Text><View style={styles.imageContainer}>{images}</View></View></View>)
  }

  render() {
    var cards = [];

    if (this.state.pictures) {
      for (var key in this.state.pictures) {
        cards.push(this.renderGroup(key, this.state.pictures[key]));
      }
    }

    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false, '')}}
          >
          <TouchableHighlight onPress={this.setModalVisible.bind(this, false, '')} style={[styles.modalContainer, styles.modalBackground]}>
            <View>
              <View style={styles.innerContainer}>
                <Image source={{uri: this.state.activeUrl}} style={styles.modalImage}/>
              </View>
            </View>
          </TouchableHighlight>
        </Modal>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {cards}
        </ScrollView>
      </View>
    )
  }
}

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20
  },
  image: {
    width: ((width - 110) / 3),
    height: ((width - 110) / 3),
    resizeMode: 'cover',
    backgroundColor: '#eee'
  },
  imageTouch: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 15
  },
  card: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 20,
    marginRight: 20
  },
  modalContainer: {
    backgroundColor: '#eee',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalImage: {
    width: width - 90,
    height: (width - 90) * 1.33
  },
  date: {
    color: '#aaa',
    fontSize: 16
  }
});

export default PicturesPage;
