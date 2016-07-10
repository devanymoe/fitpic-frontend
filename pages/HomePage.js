import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  Alert
} from 'react-native';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.deleteConfirmation = this.deleteConfirmation.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      activeUrl: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    Service.getEventsByDates().then((data) => {
      this.setState({eventsByDates: data});
      Service.getUser().then(user => {
        this.setState({user: user});
      });
    });
  }

  handlePress(item) {
    if (item === 'pictures') {
      this.props.navigator.push({name: 'pictures'});
    }
    else if (item === 'measure') {
      this.props.navigator.push({name: 'measure'});
    }
    else if (item === 'timeline') {
      this.props.navigator.push({name: 'timeline'});
    }
    else if (item === 'progress') {
      this.props.navigator.push({name: 'progress'});
    }
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
      Service.getEventsByDates().then((events) => {
        this.setState({eventsByDates: events});
      });
    });
  }

  render() {
    if (this.state.user) {
      var unitsWeight;
      var unitsLength;

      if (this.state.user.units === 'us') {
        unitsWeight = 'lb';
        unitsLength = 'in';
      }
      else {
        unitsWeight = 'kg';
        unitsLength = 'cm';
      }
    }

    if (this.state.eventsByDates) {
      var events = this.state.eventsByDates;
      var dates = [];
      var threeDates = [];
      var cards = [];

      for (var key in events) {
        dates.push(key);
      }

      threeDates = dates.sort().slice(0, 3);

      for (var i = 0; i < threeDates.length; i++) {
        if (events[threeDates[i]].pictures) {
          var pictures = events[threeDates[i]].pictures;
          var images = [];
          var pics = (
            <View style={styles.imageContainer}>{images}</View>
          );

          for (var x = 0; x < pictures.length; x++) {
            var picture = pictures[x];
            images.push(<TouchableHighlight onPress={this.setModalVisible.bind(this, true, picture.url)} onLongPress={this.deletePhoto.bind(this, picture.url)} key={x}><Image source={{uri: picture.url}} style={styles.image}></Image></TouchableHighlight>)
          }
        }

        if (events[threeDates[i]].measurements) {
          var meas = events[threeDates[i]].measurements;
          var measures = (
            <View style={styles.measureContainer}>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.weight}{unitsWeight}</Text>
                <Text style={styles.measureTitle}>Weight</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.neck}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Neck</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.arm}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Bicep</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.chest}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Chest</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.waist}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Waist</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.hips}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Hips</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.thigh}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Thigh</Text>
              </View>
              <View style={styles.measurement}>
                <Text style={styles.measureValue}>{meas.calf}{unitsLength}</Text>
                <Text style={styles.measureTitle}>Calf</Text>
              </View>
            </View>
          );
        }

        cards.push((
          <View style={styles.cardContainer} key={i}><View style={styles.card}>
            <Text>{events[threeDates[i]].displayDate}</Text>
            {pics}
            {measures}
          </View></View>
        ))
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
        <ScrollView>
          <View style={styles.tileContainer}>
            <View style={styles.boxRow}>
              <TouchableHighlight onPress={this.handlePress.bind(this, 'pictures')}>
                <View style={styles.box}>
                  <Icon name='photo-camera' size={30} style={styles.icon}/>
                  <Text style={styles.boxText}>Pictures</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.handlePress.bind(this, 'measure')}>
                <View style={styles.box}>
                  <Icon name='accessibility' size={30} style={styles.icon}/>
                  <Text style={styles.boxText}>Measurements</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.boxRow}>
              <TouchableHighlight onPress={this.handlePress.bind(this, 'timeline')} >
                <View style={styles.box}>
                  <Icon name='event' size={30} style={styles.icon}/>
                  <Text style={styles.boxText}>Timeline</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this.handlePress.bind(this, 'progress')}>
                <View style={styles.box}>
                  <Icon name='show-chart' size={30} style={styles.icon}/>
                  <Text style={styles.boxText}>Progress</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {cards}
        </ScrollView>
      </View>
    )
  }
}

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  box: {
    margin: 10,
    width: ((width - 60) / 2),
    height: ((width - 60) / 2),
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxText: {
    color: '#000',
  },
  tileContainer: {
    marginBottom: 10,
    paddingBottom: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 16
  },
  card: {
    padding: 20,
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
  cardContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0
  },
  measureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  measurement: {
    width: ((width - 80) / 4),
    marginTop: 10
  },
  measureTitle: {

  },
  measureValue: {
    fontSize: 20,
    color: '#aaa'
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
    width: width - 110,
    height: (width - 110) * 1.33
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  image: {
    width: ((width - 110) / 3),
    height: ((width - 110) / 3),
    resizeMode: 'cover',
    marginTop: 10,
    backgroundColor: '#eee'
  }
});

export default HomePage;
