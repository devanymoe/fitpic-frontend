import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import PicturesPage from './pages/PicturesPage';
import CameraPage from './pages/CameraPage';
import MeasurePage from './pages/MeasurePage';
import TimelinePage from './pages/TimelinePage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import NewPicsPage from './pages/NewPicsPage';
import NewMeasuresPage from './pages/NewMeasuresPage';
import EditMeasuresPage from './pages/EditMeasuresPage';
import PhotoDraftPage from './pages/PhotoDraftPage';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Text,
  View,
  Navigator,
  StatusBar,
  Image,
  TouchableHighlight
} from 'react-native';



class App extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.handleMenuPress = this.handleMenuPress.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
  }

  handleMenuPress() {
    this._drawer.open();
  }

  handleNavigate() {
    if (this._drawer) {
      this._drawer.close();
    }
  }

  handleNewPhoto(navigator) {
    navigator.push({name: 'newPictures'});
  }

  handleNewMeasure(navigator) {
    navigator.push({name: 'newMeasures'});
  }

  renderScene(route, navigator) {
    var menu = <Menu navigator={navigator}/>;
    var content;

    if (route.name === 'home') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="FitPic"/><HomePage navigator={navigator} /></View>;
    }
    else if (route.name === 'pictures') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Pictures" right={<TouchableHighlight onPress={this.handleNewPhoto.bind(this, navigator)}><Icon name='add' size={30} color='#fff'/></TouchableHighlight>}/><PicturesPage navigator={navigator}/></View>;
    }
    else if (route.name === 'camera') {
      content = <CameraPage navigator={navigator} type={route.type} date={route.date}/>;
    }
    else if (route.name === 'photoDraft') {
      content = <PhotoDraftPage navigator={navigator} path={route.path} date={route.date} type={route.type}/>;
    }
    else if (route.name === 'measure') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Measurements" right={<TouchableHighlight onPress={this.handleNewMeasure.bind(this, navigator)}><Icon name='add' size={30} color='#fff'/></TouchableHighlight>}/><MeasurePage navigator={navigator}/></View>;
    }
    else if (route.name === 'timeline') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Timeline"/><TimelinePage navigator={navigator}/></View>;
    }
    else if (route.name === 'progress') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Progress"/><ProgressPage navigator={navigator}/></View>;
    }
    else if (route.name === 'settings') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Settings"/><SettingsPage navigator={navigator}/></View>;
    }
    else if (route.name === 'help') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Help"/><HelpPage navigator={navigator}/></View>;
    }
    else if (route.name === 'newMeasures') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="New Measurements"/><NewMeasuresPage navigator={navigator}/></View>;
    }
    else if (route.name === 'editMeasures') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="Edit Measurements"/><EditMeasuresPage navigator={navigator} id={route.id}/></View>;
    }
    else if (route.name === 'newPictures') {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="New Picture"/><NewPicsPage navigator={navigator} date={route.date} type={route.type} path={route.path}/></View>;
    }
    else {
      content = <View style={viewStyles}><Navbar onOpenMenu={this.handleMenuPress} title="FitPic"/><HomePage navigator={navigator} /></View>;
    }

    return (
      <Drawer
        type="overlay"
        content={menu}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        ref={(ref) => {this._drawer = ref}}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        {content}
      </Drawer>
    )
  }

  render() {
    return (
      <View style={viewStyles}>
        <StatusBar
          translucent={true}
          barStyle={'default'}
          backgroundColor={'rgba(0, 0, 0, 0.2)'}
        />
        <Navigator
          initialRoute={{name: 'home', index: 0}}
          renderScene={this.renderScene}
          onWillFocus={this.handleNavigate}
        />
      </View>
    )
  }
}

var drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    backgroundColor: '#fff',
    paddingTop: 40
  },
  main: {paddingLeft: 3}
}

var navStyles = {
  menuIcon: {
    width: 20,
    height: 20,
    right: 0
  }
}

var viewStyles = {
  flex: 1,
  backgroundColor: '#000'
}

export default App;
