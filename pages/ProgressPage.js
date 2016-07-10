import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import Chart from 'react-native-chart';
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

      if (pictures.first.front !== pictures.last.front) {
        imageSections.push(<View key="front"><Text>Front Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.front)}>
            <Image style={styles.image} source={{uri: pictures.first.front}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.front)}>
            <Image style={styles.image} source={{uri: pictures.last.front}}/>
          </TouchableHighlight>
        </View></View>)
      }
      if (pictures.first.side !== pictures.last.side) {
        imageSections.push(<View key="side"><Text>Front Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.side)}>
            <Image style={styles.image} source={{uri: pictures.first.side}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.side)}>
            <Image style={styles.image} source={{uri: pictures.last.side}}/>
          </TouchableHighlight>
        </View></View>)
      }
      if (pictures.first.back !== pictures.last.back) {
        imageSections.push(<View key="back"><Text>Front Progress</Text>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.first.back)}>
            <Image style={styles.image} source={{uri: pictures.first.back}}/>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.setModalVisible.bind(this, true, pictures.last.back)}>
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

        return(<View style={styles.cardContainer} key="measurements"><View  style={styles.card}><Text>Total Change: {totalDiff}{unitsLength}</Text><View style={styles.measureContainer}>
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
        </View></View></View>);
      }
    }
  }

  renderWeight() {
    if (this.state.weight && this.state.weight.length > 1) {
      var weight = this.state.weight;
      const data = [];

      for (var i = 0; i < weight.length; i++) {
        data.push([weight[i].date, weight[i].weight]);
      }

      return (
        <View key="weight-chart" style={styles.cardContainer}><View style={styles.card}>
          <Chart
            style={styles.chart}
            data={data}
            verticalGridStep={4}
            type="line"
            lineWidth={2}
            showDataPoint={true}
            xAxisHeight={16}
            yAxisWidth={30}
            color="#FD704B"
          />
        </View></View>
      )
    }
  }

  renderPieChart() {
    if (this.state.progress) {
      var measure = this.state.progress.measurements;
      if (measure.first && measure.last) {
        var neckDiff = measure.last.neck - measure.first.neck;
        var armDiff = measure.last.arm - measure.first.arm;
        var chestDiff = measure.last.chest - measure.first.chest;
        var waistDiff = measure.last.waist - measure.first.waist;
        var hipsDiff = measure.last.hips - measure.first.hips;
        var thighDiff = measure.last.thigh - measure.first.thigh;
        var calfDiff = measure.last.calf - measure.first.calf;
        var totalDiff = neckDiff + armDiff + chestDiff + waistDiff + hipsDiff + thighDiff + calfDiff;

        const data = [
          ['Neck', neckDiff],
          ['Arm', armDiff],
          ['Chest', chestDiff],
          ['Waist', waistDiff],
          ['Hips', hipsDiff],
          ['Thigh', thighDiff],
          ['Calf', calfDiff]
        ];

        return (
          <View key="progress-chart" style={styles.cardContainer}><View style={styles.card}>
            <Chart
              style={styles.chart}
              data={data}
              type="pie"
              showAxis={false}
            />
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
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  image: {
    width: ((width - 110) / 2),
    height: ((width - 110) / 2),
    resizeMode: 'cover',
    marginTop: 10,
    backgroundColor: '#eee'
  },
  chart: {
    width: width - 110,
    height: 160,
    marginTop: 10
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
  }
});

export default ProgressPage;
