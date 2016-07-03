import React, { Component } from 'react';
import Button from '../components/Button';
import Service from '../service';
import groupBy from 'lodash.groupby';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';

class PicturesPage extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.state = {};
  }

  handlePress() {
    this.props.navigator.push({name: 'camera'});
  }

  componentDidMount() {
    Service.getPictures().then(data => {
      var pictures = groupBy(data, function(obj) {
        var picDate = new Date(obj.date);
        return picDate.getFullYear() + '-' + picDate.getMonth() + '-' + picDate.getDate();
      });
      console.log(pictures);
      this.setState({pictures: pictures});
    })
  }

  renderGroup(groupName, arr) {
    var images = [];
    for (var i = 0; i < arr.length; i++) {
      images.push(<Image source={{uri: arr[i].url}} style={styles.image} key={i}></Image>)
    }
    return (<View key={groupName} style={styles.cardContainer}><View style={styles.card}><Text>{groupName}</Text>{images}</View></View>)
  }

  render() {
    var cards = [];

    if (this.state.pictures) {
      for (var key in this.state.pictures) {
        cards.push(this.renderGroup(key, this.state.pictures[key]));
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
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover'
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

export default PicturesPage;
