import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Service from '../service';
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
    const menuItems = [{'title': 'Home', 'icon': 'home'}, {'title': 'Pictures', 'icon': 'photo-camera'}, {'title': 'Measurements', 'icon': 'accessibility'}, {'title': 'Timeline', 'icon': 'event'}, {'title': 'Progress', 'icon': 'show-chart'}, {'title': 'Settings', 'icon': 'settings'}, {'title': 'Help', 'icon': 'help'}, {'title': 'Logout', 'icon': 'power-settings-new'}];
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
    else if (item === 'Logout') {
      Service.logout(this.props.onLogout);
    }
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={this.handlePress.bind(this, rowData.title)} style={menuStyles.menuItem} item={rowData.title}>
        <View style={menuStyles.rowView}>
          <View style={menuStyles.iconContainer}>
            <Icon name={rowData.icon} size={20} />
          </View>
          <Text style={menuStyles.menuText}>{rowData.title}</Text>
        </View>
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
    marginLeft: 14
  },
  menuItem: {
    padding: 16,
  },
  rowView: {
    flexDirection: 'row'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  iconContainer: {
    width: 30
  }
});

export default Menu;
