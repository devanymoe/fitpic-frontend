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

class ProgressPage extends Component {
  constructor(props) {
    super(props);
    this.renderPictures = this.renderPictures.bind(this);
    this.renderMeasures = this.renderMeasures.bind(this);
    this.state = {};
  }

  componentDidMount() {
    Service.getProgress().then(data => {
      console.log(data)
      this.setState({progress: data});
      Service.getUser().then(data => {
        this.setState({user: data});
      });
    });
  }

  renderPictures() {

  }

  renderMeasures() {
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

    if (this.state.progress) {
      var measure = this.state.progress.measurements;
      if (measure.first && measure.last) {
        var weightDiff = measure.last.weight - measure.first.weight;
        var neckDiff = measure.last.neck - measure.first.neck;
        var armDiff = measure.last.arm - measure.first.arm;
        var chestDiff = measure.last.chest - measure.first.chest;
        var waistDiff = measure.last.waist - measure.first.waist;
        var hipsDiff = measure.last.hips - measure.first.hips;
        var thighDiff = measure.last.thigh - measure.first.thigh;
        var calfDiff = measure.last.calf - measure.first.calf;
        var totalDiff = neckDiff + armDiff + chestDiff + waistDiff + hipsDiff + thighDiff + calfDiff;

        return(<View key="measurements" style={styles.card}><Text>Total Change: {totalDiff}{unitsLength}</Text><View style={styles.measureContainer}>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{weightDiff}{unitsWeight}</Text>
          <Text style={styles.measureTitle}>Weight</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{neckDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Neck</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{armDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Bicep</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{chestDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Chest</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{waistDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Waist</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{hipsDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Hips</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{thighDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Thigh</Text>
          </View>
          <View style={styles.measurement}>
          <Text style={styles.measureValue}>{calfDiff}{unitsLength}</Text>
          <Text style={styles.measureTitle}>Calf</Text>
          </View>
        </View></View>);
      }
    }
  }

  render() {
    var cards = [];

    cards.push(this.renderPictures());
    cards.push(this.renderMeasures());

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}>
            {cards}
          </View>
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

export default ProgressPage;
