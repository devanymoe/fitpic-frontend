import React, { Component } from 'react';
import Button from '../components/Button';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class EditMeasuresPage extends Component {
  constructor(props) {
    super(props);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  cancelEdit() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the edit measurements form</Text>
        <Text>{this.props.id}</Text>
        <Button text="Cancel" type="gray" onPress={this.cancelEdit}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default EditMeasuresPage;
