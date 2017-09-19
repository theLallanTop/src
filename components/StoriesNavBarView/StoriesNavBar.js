import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Images } from '../../theme';
import { Badge, Col, Row, Icon } from 'native-base';

class StoriesNavBar extends Component{

  render() {
    return(
          <View style={styles.fixedSectionButtonView}>
            <View style={styles.fixedSectionBackButtonStyle}>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={styles.backNavigationStyle}
                onPress={this.onPressBackButton}>
                <Image style={{ height: 15, width: 20 }} source={Images.navigationBackIcon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.searchNavStyle}
              onPress={()=> console.log('')}>
              <Icon name="ios-search-outline" style={{ fontSize: 20, color: Colors.IntroUnselectedViewColor }}/>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.notificatioNavStyle}
              onPress={()=> console.log('')}>
              <Icon name="ios-notifications" style={{ fontSize: 20, color: Colors.IntroUnselectedViewColor }}/>
            </TouchableOpacity>
            <TouchableOpacity
              underlayColor = {Colors.cloud}
              style={styles.heartNavStyle}
              onPress={()=> console.log('')}>
              <Icon name="md-heart" style={{ fontSize: 20, color: Colors.IntroUnselectedViewColor }}/>
            </TouchableOpacity>
          </View>
    );
  }
}
export default StoriesNavBar;
