import React, { Component, PropTypes} from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Images, Fonts } from '../../theme';
import styles from './IntroThirdStyle';

export default class IntroThirdView extends Component {

  render(){
    return(
      <View style={styles.mainViewContainer}>
        <View style={styles.imageViewStyle}>
          <Image resizeMode="contain" style={styles.IntroIconStyle} source={Images.introThirdIcon} />
        </View>
        <View style={styles.DescripTextViewStyle}>
         <Text style={{...Fonts.style.WalkthroughTitleTextStyle}}>Lovely Narration</Text>
          {(Platform.OS == 'ios') ?
            <Text style={{ ...Fonts.style.WalkthroughDescriptionTextStyle }}>
              Child friendly app with lovely{'\n'}narration and no videos
            </Text> :
            <Text style={{ ...Fonts.style.WalkthroughDescriptionTextStyle }}>
              Child friendly app with lovely{'\n\t'}narration and no videos
            </Text>
          }
        </View>
      </View>
    )
  }
}