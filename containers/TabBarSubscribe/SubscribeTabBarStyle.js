import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  myStoriesTabBarMainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  textStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
  },
  textBtnColorStyle: {
    color: Colors.BaseColor
  },
  textStatusViewStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  viewMainStatusStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    backgroundColor: Colors.white,
    flexDirection: 'row'
  },
  textStatusRemainStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  ramainTextStyle: {
    textAlign: 'right',
    paddingRight: 20,
    color: Colors.BaseColor,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium
  },
  choosePlanViewStyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    flexDirection: 'row'
  },
  choosePlanTextStyle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    textAlign: 'left',
  },
  continueViewStyle: {
    height: 50,
    borderTopWidth: 0.5,
    borderTopColor: Colors.charcoallight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.white
  },
  continueBtnStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight : 20,
    marginBottom: 15
  },

  continueBtnViewStyle: {
    flex: 1,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  continueIconStyle: {
    resizeMode: 'contain',
    width: 14,
    height: 10
  },


  continueTextStyle: {
    textAlign: 'left',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    color: Colors.BaseColor,
    fontWeight: '400'
  },
  textStatusStyle: {
    color: Colors.charcoal,
    paddingLeft: 10,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.Walkthrough.medium,
    fontWeight: '400'
  },

  textRightPositionStyle: {
    textAlign: 'right',
    paddingRight: 20,
  },
  textLeftPositionStyle: {
    textAlign: 'left',
    paddingRight: 20,
  }
});