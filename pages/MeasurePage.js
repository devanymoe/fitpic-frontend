import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';

class MeasurePage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.clickMeasure = this.clickMeasure.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.deleteEntryConfirmation = this.deleteEntryConfirmation.bind(this);
    this.state = {};
  }

  handlePress() {
    this.props.navigator.push({name: 'newMeasure'});
  }

  componentDidMount() {
    Service.getMeasurements().then(data => {
      this.setState({measurements: data});
      Service.getUser().then(data => {
        this.setState({user: data});
      });
    });
  }

  clickMeasure(measure_id) {
    Alert.alert(
      'Update Measurements',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete Entry', onPress: () => this.deleteEntryConfirmation(measure_id)},
        {text: 'Edit Entry', onPress: () => this.editEntry(measure_id)},
      ]
    )
  }

  deleteEntryConfirmation(measure_id) {
    Alert.alert(
      'Are you sure you want to delete this entry?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete Entry', onPress: () => this.deleteEntry(measure_id)},
      ]
    )
  }

  deleteEntry(measure_id) {
    Service.deleteMeasurement(measure_id).then((data) => {
      this.setState({measurements: data});
    })
  }

  editEntry(measure_id) {
    this.props.navigator.push({name: 'editMeasures', id: measure_id});
  }

  render() {
    var cards = [];
    var measures = this.state.measurements;

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

    if (measures) {
      for (var i = 0; i < measures.length; i++) {
        var measureDate = new Date(measures[i].date);
        var date = (measureDate.getMonth() + 1) + '/' + measureDate.getDate() + '/' + measureDate.getFullYear();

        var weight = measures[i].weight;
        var neck = measures[i].neck;
        var arm = measures[i].arm;
        var chest = measures[i].chest;
        var waist = measures[i].waist;
        var hips = measures[i].hips;
        var thigh = measures[i].thigh
        var calf =  measures[i].calf;

        var renderDate = (
          <TouchableHighlight onLongPress={this.clickMeasure.bind(this, measures[i].id)} key={measures[i].id} style={styles.cardContainer} underlayColor="#eee"><View style={styles.card}><Text style={styles.date}>{date}</Text><View style={styles.measureContainer}>
            <View style={[styles.measurement, styles.measurementFirst]}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{weight}</Text><Text style={styles.measureUnit}>{unitsWeight}</Text>
              </View>
              <Text style={styles.measureTitle}>Weight</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{neck}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Neck</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{arm}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Bicep</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{chest}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Chest</Text>
            </View>
            <View style={[styles.measurement, styles.measurementFirst]}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{waist}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Waist</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{hips}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Hips</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{thigh}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Thigh</Text>
            </View>
            <View style={styles.measurement}>
              <View style={styles.inline}>
                <Text style={styles.measureValue}>{calf}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
              </View>
              <Text style={styles.measureTitle}>Calf</Text>
            </View>
          </View></View></TouchableHighlight>
        );

        cards.push(renderDate);
      }
    }

    return (
      <View style={styles.container}>
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
  measureUnit: {
    marginBottom: 2,
    color: '#FD704B',
    fontSize: 16
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  date: {
    color: '#aaa',
    fontSize: 16
  }
});

export default MeasurePage;
