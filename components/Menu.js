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
    if (item === 'Home') {
      this.props.navigator.push({name: 'home'});
    }
    else if (item === 'Pictures') {
      this.props.navigator.push({name: 'pictures'});
    }
    else if (item === 'Measurements') {
      this.props.navigator.push({name: 'measure'});
    }
    else if (item === 'Timeline') {
      this.props.navigator.push({name: 'timeline'});
    }
    else if (item === 'Progress') {
      this.props.navigator.push({name: 'progress'});
    }
    else if (item === 'Settings') {
      this.props.navigator.push({name: 'settings'});
    }
    else if (item === 'Help') {
      this.props.navigator.push({name: 'help'});
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
