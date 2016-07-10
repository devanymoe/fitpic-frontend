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
  Dimensions
} from 'react-native';

const CALWIDTH = Dimensions.get('window').width - 80;

class TimelinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Service.getEventsByDates().then((data) => {
      this.setState({eventsByDates: data});
    });
  }

  render() {
    var dates = [];
    if (this.state.eventsByDates) {
      for (var key in this.state.eventsByDates) {
        dates.push(key);
      }
    }

    return (
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
      </ScrollView>
    )
  }
}

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
  }
});

export default TimelinePage;
