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
    this.renderRow = this.renderRow.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const menuItems = [{'title': 'Home'}, {'title': 'Pictures'}, {'title': 'Measurements'}, {'title': 'Timeline'}, {'title': 'Progress'}, {'title': 'Settings'}, {'title': 'Help'}, {'title': 'Logout'}];
    this.state = {
      dataSource: ds.cloneWithRows(menuItems)
    };
  }

  handlePress(item) {
    if (item === 'Pictures') {
      console.log('hi')
      this.props.navigator.push({name: 'camera'});
    }
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={this.handlePress.bind(this, rowData.title)} style={menuStyles.menuItem} item={rowData.title}>
        <Text style={menuStyles.menuText}>{rowData.title}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={menuStyles.menu}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={menuStyles.separator} />}
      />
    )
  }
}

var menuStyles = StyleSheet.create({
  menuText: {
    fontSize: 16,
  },
  menuItem: {
    padding: 16
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  }
});

export default Menu;
