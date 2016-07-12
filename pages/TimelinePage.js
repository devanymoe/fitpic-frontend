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
  Image,
  Alert
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
    setTimeout(() => {
      Service.getEventsByDates().then((data) => {
        this.setState({eventsByDates: data});
        Service.getUser().then(user => {
          this.setState({user: user});
        });
      });
    }, 200);
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

        if (!events.pictures && !events.measurements) {
          this.setState({dateCard: false});
        }

        this.setState({measurements: events.measurements});
        this.setState({pictures: events.pictures});
      });
    });
  }

  render() {
    if(!this.state.eventsByDates) {
      return (
        <View style={styles.container}></View>
      )
    }

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
          images.push(<TouchableHighlight onPress={this.setModalVisible.bind(this, true, pics[i].url)} onLongPress={this.deletePhoto.bind(this, pics[i].url)} key={i} style={styles.imageTouch}><Image source={{uri: pics[i].url}} style={styles.image}></Image></TouchableHighlight>)
        }

        var pics = (
          <View style={styles.imageContainer}>{images}</View>
        );
      }

      if (this.state.pictures && this.state.measurements) {
        var splitter = (
          <View style={styles.splitter}></View>
        );
      }

      if (this.state.measurements) {
        var meas = this.state.measurements;
        var measures = (
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
      var dCard = (
        <View style={styles.cardContainer}><View style={styles.card}>
          <Text>{this.state.displayDate}</Text>
          {pics}
          {splitter}
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}><View style={[styles.card, styles.calCard]}>
          <Calendar
          width={CALWIDTH}
          scrollEnabled={false}
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
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20
  },
  card: {
    paddingLeft: 20,
    paddingTop: 20,
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
  calCard: {
    padding: 20
  },
  cardContainer: {
    flexDirection: 'row',
    paddingBottom: 0,
    padding: 20
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
  measureUnit: {
    marginBottom: 2,
    color: '#FD704B',
    fontSize: 16
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  imageTouch: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 15
  },
  splitter: {
    height: 1,
    marginRight: 20,
    backgroundColor: '#eee',
    marginTop: 20,
    marginBottom: 7
  }
});

export default TimelinePage;
