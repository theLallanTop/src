import React, { Component, PropTypes } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Images, Fonts } from '../../theme';
import styles from './IntroFirstStyle';
export default class IntroFirstView extends Component {

  render(){
    return(
      <View style={styles.mainViewContainer}>
        <View style={styles.imageViewStyle}>
          <Image resizeMode="contain" style={styles.IntroIconStyle} source={Images.introFirstIcon} />
        </View>
        <View style={styles.DescripTextViewStyle}>
          {(Platform.OS == 'ios') ?
            <Text style={{...Fonts.style.WalkthroughWithoutTitleTextStyle}}>
              Jab Jab Yaad aaye Dadi Nani {'\n\t\t'} Suno Kahaani {'\n'} Kabhi nayee, Kabhi puranee
            </Text> :
            <Text style={{...Fonts.style.WalkthroughWithoutTitleTextStyle}}>
              Jab Jab Yaad aaye Dadi Nani {'\n\t\t\t\t\t\t\t'} Suno Kahaani {'\n'} Kabhi nayee, Kabhi puranee
            </Text>
          }
        </View>
      </View>
    )
  }
}
