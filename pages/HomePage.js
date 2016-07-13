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
  Alert,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
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

      threeDates = dates.sort().reverse().slice(0, 3);

      for (var i = 0; i < threeDates.length; i++) {
        let images = [];
        let measures;
        let pics;
        if (events[threeDates[i]].pictures) {
          var pictures = events[threeDates[i]].pictures;
          pics = (
            <View style={styles.imageContainer}>{images}</View>
          );

          for (var x = 0; x < pictures.length; x++) {
            var picture = pictures[x];
            images.push(<TouchableHighlight onPress={this.setModalVisible.bind(this, true, picture.url)} onLongPress={this.deletePhoto.bind(this, picture.url)} key={x} style={styles.imageTouch}><Image source={{uri: picture.url}} style={styles.image}></Image></TouchableHighlight>)
          }
        }

        if (events[threeDates[i]].pictures && events[threeDates[i]].measurements) {
          var splitter = (
            <View style={styles.splitter}></View>
          );
        }

        if (events[threeDates[i]].measurements) {
          var meas = events[threeDates[i]].measurements;
          measures = (
            <View style={styles.measureContainer}>
              <View style={[styles.measurement, styles.measurementFirst]}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.weight}</Text><Text style={styles.measureUnit}>{unitsWeight}</Text>
                </View>
                <Text style={styles.measureTitle}>Weight</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.neck}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Neck</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.arm}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Bicep</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.chest}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Chest</Text>
              </View>
              <View style={[styles.measurement, styles.measurementFirst]}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.waist}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Waist</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.hips}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Hips</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.thigh}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Thigh</Text>
              </View>
              <View style={styles.measurement}>
                <View style={styles.inline}>
                  <Text style={styles.measureValue}>{meas.calf}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
                </View>
                <Text style={styles.measureTitle}>Calf</Text>
              </View>
            </View>
          );
        }

        cards.push((
          <View style={styles.cardContainer} key={i}><View style={styles.card}>
            <Text style={styles.date}>{events[threeDates[i]].displayDate}</Text>
            {pics}
            {splitter}
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
          <TouchableWithoutFeedback onPress={this.setModalVisible.bind(this, false, '')}>
            <View style={[styles.modalContainer, styles.modalBackground]}>
              <View style={styles.innerContainer}>
                <Image source={{uri: this.state.activeUrl}} style={styles.modalImage}/>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ScrollView style={styles.scrollView}>
          <View style={styles.tileContainer}>
            <View style={styles.boxRow}>
              <TouchableNativeFeedback onPress={this.handlePress.bind(this, 'pictures')}>
                <View style={[styles.box, styles.boxOne]}>
                  <Icon name='photo-camera' size={40} style={styles.icon}/>
                  <Text style={styles.boxText}>Pictures</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.handlePress.bind(this, 'measure')}>
                <View style={[styles.box, styles.boxTwo]}>
                  <Icon name='accessibility' size={40} style={styles.icon}/>
                  <Text style={styles.boxText}>Measurements</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.boxRow}>
              <TouchableNativeFeedback onPress={this.handlePress.bind(this, 'timeline')} >
                <View style={[styles.box, styles.boxThree]}>
                  <Icon name='event' size={40} style={styles.icon}/>
                  <Text style={styles.boxText}>Calendar</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback onPress={this.handlePress.bind(this, 'progress')}>
                <View style={[styles.box, styles.boxFour]}>
                  <Icon name='show-chart' size={40} style={styles.icon}/>
                  <Text style={styles.boxText}>Progress</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  tileContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  icon: {
    marginBottom: 8,
    color: '#fff'
  },
  card: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
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
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  measureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  measurement: {
    width: ((width - 80) / 4),
    marginTop: 10,
    justifyContent: 'space-between',
    paddingLeft: 14
  },
  measurementFirst: {
    paddingLeft: 0
  },
  measureTitle: {
    color: '#aaa'
  },
  measureValue: {
    fontSize: 24,
    color: '#FD704B'
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
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
  boxOne: {
    backgroundColor: '#ffa58e'
  },
  boxTwo: {
    backgroundColor: '#ffa58e'
  },
  boxThree: {
    backgroundColor: '#ffa58e'
  },
  boxFour: {
    backgroundColor: '#ffa58e'
  },
  scrollView: {
    paddingBottom: 20
  },
  sectionTitle: {
    marginLeft: 20,
    paddingBottom: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#aaa'
  },
  date: {
    color: '#aaa',
    fontSize: 16
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  measureUnit: {
    marginBottom: 2,
    color: '#FD704B',
    fontSize: 16
  },
  splitter: {
    height: 1,
    marginRight: 20,
    backgroundColor: '#eee',
    marginTop: 20,
    marginBottom: 7
  }
});

export default HomePage;
