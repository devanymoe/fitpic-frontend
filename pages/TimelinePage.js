import React, { Component } from 'react';
import Button from '../components/Button';
import Calendar from 'react-native-calendar';
import Service from '../service';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Modal,
  Image
} from 'react-native';

const CALWIDTH = Dimensions.get('window').width - 80;

class TimelinePage extends Component {
  constructor(props) {
    super(props);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.deleteConfirmation = this.deleteConfirmation.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      dateCard: false,
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

  onDateSelect(date) {
    if (this.state.eventsByDates[date.substring(0, 10)]) {
      var day = this.state.eventsByDates[date.substring(0, 10)];
      this.setState({displayDate: day.displayDate});
      if (day.measurements) {
        this.setState({measurements: day.measurements});
      }
      if (day.pictures) {
        this.setState({pictures: day.pictures});
      }
      this.setState({dateCard: true});
    }
    else {
      this.setState({dateCard: false});
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
    var dates = [];
    if (this.state.eventsByDates) {
      for (var key in this.state.eventsByDates) {
        dates.push(key);
      }
    }

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

    if (this.state.dateCard) {
      if (this.state.pictures) {
        var pics = this.state.pictures;
        var images = [];

        for (var i = 0; i < pics.length; i++) {
          images.push(<TouchableHighlight onPress={this.setModalVisible.bind(this, true, pics[i].url)} onLongPress={this.deletePhoto.bind(this, pics[i].url)} key={i}><Image source={{uri: pics[i].url}} style={styles.image}></Image></TouchableHighlight>)
        }

        var pics = (
          <View style={styles.imageContainer}>{images}</View>
        );
      }
      if (this.state.measurements) {
        var meas = this.state.measurements;
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
      var dCard = (
        <View style={styles.cardContainer}><View style={styles.card}>
          <Text>{this.state.displayDate}</Text>
          {pics}
          {measures}
        </View></View>
      )
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
        <ScrollView style={styles.container}>
        <View style={styles.cardContainer}><View style={styles.card}>
        <Calendar
        width={CALWIDTH}
        scrollEnabled={true}
        showControls={true}
        titleFormat={'MMMM YYYY'}
        prevButtonText={'Prev'}
        nextButtonText={'Next'}
        onDateSelect={(date) => this.onDateSelect(date)}
        eventDates={dates}
        customStyle={{
          day: {fontSize: 15, textAlign: 'center'},
          monthContainer: {width: CALWIDTH},
          dayButton: {width: CALWIDTH / 7},
          dayButtonFiller: {width: CALWIDTH / 7},
          calendarContainer: {backgroundColor: '#fff'},
          currentDayText: {color: '#FD704B'},
          currentDayCircle: {backgroundColor: '#FD704B'},
          selectedDayCircle: {backgroundColor: '#FD704B'}
        }}
        weekStart={0}
        />
        </View></View>
        {dCard}
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

export default TimelinePage;
