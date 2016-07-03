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
  Dimensions
} from 'react-native';

class MeasurePage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {};
  }

  handlePress() {
    this.props.navigator.push({name: 'newMeasure'});
  }

  componentDidMount() {
    Service.getMeasurements().then(data => {
      console.log(data);
      this.setState({measurements: data});
      Service.getUser().then(data => {
        console.log(data)
        this.setState({user: data});
      });
    });
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
          <View key={i} style={styles.cardContainer}><View style={styles.card}><Text>{date}</Text><View style={styles.measureContainer}>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{weight}{unitsWeight}</Text>
              <Text style={styles.measureTitle}>Weight</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{neck}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Neck</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{arm}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Bicep</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{chest}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Chest</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{waist}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Waist</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{hips}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Hips</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{thigh}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Thigh</Text>
            </View>
            <View style={styles.measurement}>
              <Text style={styles.measureValue}>{calf}{unitsLength}</Text>
              <Text style={styles.measureTitle}>Calf</Text>
            </View>
          </View></View></View>
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
  measureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0
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
  }
});

export default MeasurePage;
