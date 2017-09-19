import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Images, Fonts } from '../../theme';
import styles from './IntroSecondStyle';
export default class IntroSecondView extends Component {

  render(){
    return(
      <View style={styles.mainViewContainer}>
        <View style={styles.imageViewStyle}>
         <Image resizeMode="contain" style={styles.IntroIconStyle} source={Images.introSecondIcon} />
        </View>
        <View style={styles.DescripTextViewStyle}>
          <Text style={{...Fonts.style.WalkthroughTitleTextStyle}}>Manage App</Text>
          {(Platform.OS == 'ios') ?
            <Text style={{ ...Fonts.style.WalkthroughDescriptionTextStyle }}>
              Manage the app with special{'\n'}
              <Text style={{ textAlign: 'center' }}>parent and child modes</Text>
            </Text> :
            <Text style={{ ...Fonts.style.WalkthroughDescriptionTextStyle }}>
              Manage the app with special{'\n\t\t'}parent and child modes
            </Text>
          }
        </View>
      </View>
    )
  }
}