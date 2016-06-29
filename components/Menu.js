import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const menuItems = [{'title': 'Home'}, {'title': 'Pictures'}, {'title': 'Measurements'}, {'title': 'Timeline'}, {'title': 'Progress'}, {'title': 'Settings'}, {'title': 'Help'}, {'title': 'Logout'}];
    this.state = {
      dataSource: ds.cloneWithRows(menuItems)
    };
  }

  handlePress(item) {
    if (item === 'Pictures') {
      console.log('hi')
      // this.props.navigator.push({name: 'camera'});
    }
  }

  render() {


    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <TouchableHighlight onPress={this.handlePress.bind(this, rowData.title)} item={rowData.title}><Text style={menuStyles.menuItem}>{rowData.title}</Text></TouchableHighlight>}
        style={menuStyles.menu}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={menuStyles.separator} />}
      />
    )
  }
}

var menuStyles = StyleSheet.create({
  menu: {

  },
  menuItem: {
    fontSize: 14,
    padding: 14,
    paddingLeft: 20
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  }
});

export default Menu;
