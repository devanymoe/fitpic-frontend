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
  Modal
} from 'react-native';

class ProgressPage extends Component {
  constructor(props) {
    super(props);
    this.renderPictures = this.renderPictures.bind(this);
    this.renderMeasures = this.renderMeasures.bind(this);
    this.renderWeight = this.renderWeight.bind(this);
    this.renderPieChart = this.renderPieChart.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      activeUrl: '',
      modalVisible: false
    };
  }

  componentDidMount() {
    Service.getProgress().then(data => {
      console.log(data)
      this.setState({progress: data});
      Service.getUser().then(data => {
        this.setState({user: data});
        Service.getProgressWeight().then(data => {
          this.setState({weight: data});
        });
      });
    });
  }

  setModalVisible(visible, url) {
    this.setState({activeUrl: url});
    this.setState({modalVisible: visible});
  }

  renderPictures() {
    if (this.state.progress) {
      var pictures = this.state.progress.pictures;
      var imageSections = [];

      if (pictures.first.front && pictures.last.front && pictures.first.front !== pictures.last.front) {
        imageSections.push(<View key="front"><Text style={styles.title}>Front Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.front)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.first.front}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.front)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.last.front}}/>
          </TouchableHighlight>
        </View></View>)

        if ((pictures.first.side && pictures.last.side) || (pictures.first.back && pictures.last.back)) {
          imageSections.push(<View style={styles.splitter} key="split1"></View>);
        }
      }
      if (pictures.first.side && pictures.last.side && pictures.first.side !== pictures.last.side) {
        imageSections.push(<View key="side"><Text style={styles.title}>Side Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.side)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.first.side}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.side)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.last.side}}/>
          </TouchableHighlight>
        </View></View>)

        if (pictures.first.back && pictures.last.back) {
          imageSections.push(<View style={styles.splitter} key="split2"></View>);
        }
      }
      if (pictures.first.back && pictures.last.back && pictures.first.back !== pictures.last.back) {
        imageSections.push(<View key="back"><Text style={styles.title}>Back Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.back)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.first.back}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.back)} style={styles.imageTouch}>
            <Image style={styles.image} source={{uri: pictures.last.back}}/>
          </TouchableHighlight>
        </View></View>)
      }

      return(<View style={styles.cardContainer} key="pictures"><View style={styles.card}>{imageSections}</View></View>);
    }
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
      if (measure && measure.first.date !== measure.last.date) {
        var weightDiff = measure.last.weight - measure.first.weight;
        var neckDiff = measure.last.neck - measure.first.neck;
        var armDiff = measure.last.arm - measure.first.arm;
        var chestDiff = measure.last.chest - measure.first.chest;
        var waistDiff = measure.last.waist - measure.first.waist;
        var hipsDiff = measure.last.hips - measure.first.hips;
        var thighDiff = measure.last.thigh - measure.first.thigh;
        var calfDiff = measure.last.calf - measure.first.calf;
        var totalDiff = neckDiff + armDiff + chestDiff + waistDiff + hipsDiff + thighDiff + calfDiff;

        return(<View style={styles.cardContainer} key="measurements"><View  style={styles.card}><Text style={styles.title}>Total Change: {totalDiff}{unitsLength}</Text><View style={styles.splitter}></View><View style={styles.measureContainer}>
          <View style={[styles.measurement, styles.measurementFirst]}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{weightDiff}</Text><Text style={styles.measureUnit}>{unitsWeight}</Text>
            </View>
            <Text style={styles.measureTitle}>Weight</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{neckDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Neck</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{armDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Bicep</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{chestDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Chest</Text>
          </View>
          <View style={[styles.measurement, styles.measurementFirst]}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{waistDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Waist</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{hipsDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Hips</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{thighDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Thigh</Text>
          </View>
          <View style={styles.measurement}>
            <View style={styles.inline}>
              <Text style={styles.measureValue}>{calfDiff}</Text><Text style={styles.measureUnit}>{unitsLength}</Text>
            </View>
            <Text style={styles.measureTitle}>Calf</Text>
          </View>
        </View></View></View>);
      }
    }
  }

  renderWeight() {
    if (this.state.weight && this.state.weight.length > 1) {
      var weight = this.state.weight;
      var axis = '';
      var data = '';
      var low = 0;
      var high = 0;

      for (var i = weight.length - 1; i >= 0; i--) {
        if (low === 0 && high === 0) {
          low = weight[i].weight;
          high = weight[i].weight;
        }

        if (!data.length) {
          data += weight[i].weight;
        }
        else {
          data = data + ',' + weight[i].weight;
        }

        if (weight[i].weight < low) {
          low = weight[i].weight;
        }
        if (weight[i].weight > high) {
          high = weight[i].weight;
        }

        axis = axis + '|' + weight[i].date;
      }

      var chartUrl = 'http://chart.apis.google.com/chart?cht=bhg&chs=350x170&chd=t:' + data + '&chxt=x,y&chxl=1:' + axis + '&chxr=0,' + (low - 20) + ',' + (high + 20) + '&chds=' + (low - 20) + ',' + (high + 20) + '&chco=FD704B&chbh=35,0,15';
      console.log(chartUrl)

      return (
        <View key="weight-chart" style={styles.cardContainer}><View style={styles.card}>
          <Text style={[styles.title, styles.chartTitle]}>Weight by Date</Text>
          <Image source={{uri: chartUrl}} style={[styles.chart, styles.barChart]}/>
        </View></View>
      )
    }
  }

  renderPieChart() {
    if (this.state.progress && this.state.progress.measurements && this.state.progress.measurements.first.date !== this.state.progress.measurements.last.date) {
      var measure = this.state.progress.measurements;
      if (measure.first && measure.last) {
        var neckDiff = Math.abs(measure.last.neck - measure.first.neck);
        var armDiff = Math.abs(measure.last.arm - measure.first.arm);
        var chestDiff = Math.abs(measure.last.chest - measure.first.chest);
        var waistDiff = Math.abs(measure.last.waist - measure.first.waist);
        var hipsDiff = Math.abs(measure.last.hips - measure.first.hips);
        var thighDiff = Math.abs(measure.last.thigh - measure.first.thigh);
        var calfDiff = Math.abs(measure.last.calf - measure.first.calf);
        var totalDiff = Math.abs(neckDiff + armDiff + chestDiff + waistDiff + hipsDiff + thighDiff + calfDiff);

        var chartUrl = 'https://chart.googleapis.com/chart?cht=p&chd=t:' + `${hipsDiff},${armDiff},${chestDiff},${waistDiff},${neckDiff},${thighDiff},${calfDiff}` + '&chs=450x300&chl=Hips|Arm|Chest|Waist|Neck|Thigh|Calf&chxs=0,999999,16&chxt=x&chco=ff663e|ff7a57|ff8f72|ffab95|febfae|ffd1c5|ffe2db';

        return (
          <View key="progress-chart" style={styles.cardContainer}><View style={styles.card}>
            <Text style={[styles.title, styles.chartTitle]}>Difference by Measurement Type</Text>
            <Image source={{uri: chartUrl}} style={styles.chart}/>
          </View></View>
        )
      }
    }
  }

  render() {
    var cards = [];

    cards.push(this.renderPictures());
    cards.push(this.renderMeasures());
    cards.push(this.renderPieChart());
    cards.push(this.renderWeight());

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
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  image: {
    width: ((width - 98) / 2),
    height: ((width - 90) / 2),
    resizeMode: 'cover',
    backgroundColor: '#eee'
  },
  imageTouch: {
    marginTop: 10,
  },
  chart: {
    width: width - 80,
    height: (width - 80) / 1.5,
    resizeMode: 'contain'
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
  title: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: 'bold'
  },
  chartTitle: {
    marginBottom: 30
  },
  barChart: {
    marginTop: -26
  },
  splitter: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 24,
    marginBottom: 16
  }
});

export default ProgressPage;
