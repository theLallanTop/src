import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Grid, Col, Row, Icon } from 'native-base';
import styles from './MyStroriesListRowStyle';
import { Colors, Fonts } from '../../theme';
import { Actions as NavActions } from 'react-native-router-flux';
import config from '../../config/appconfig';
import SnackBar from 'react-native-snackbar-dialog';

export default class MyStoriesListRow extends Component {

  static propTypes = {
    mystories: PropTypes.any,
    rowID: PropTypes.any,
  };

  onPressCellClickBtn = () => {
    if(config.AuthToken) {
      const {mystories} = this.props;
      if(mystories.ButtonName === 'Recent Downloads'){
        NavActions.topstories({Header: mystories.ButtonName});
      }
      else if(mystories.ButtonName === 'All Stories'){
        NavActions.topstories({Header: mystories.ButtonName});
      }
      else if(mystories.ButtonName === 'My Likes'){
        NavActions.topstories({Header: mystories.ButtonName});
        // NavActions.wishlist()
      }
      else {
        const data = mystories;
        console.log('mystories === >>>', mystories);
        NavActions.categoriesitemlist({Categories_Kahaani:this.props.mystories.data});
      }

    }else {
       SnackBar.show('To see the stories, you have to login first.', {
         style: { marginBottom: 20, justifyContent: 'center' },
         backgroundColor: Colors.snackBarColor,
         textColor: Colors.white
       });
      }
  };

  render() {
    const { mystories } = this.props;
    // const rowId = this.props.rowID;
    return(
      <View style={styles.myStoriesTabBarRowMainContainer}>
          <TouchableOpacity
            underlayColor={Colors.cloud}
            onPress={this.onPressCellClickBtn}>
            <Row style={{ borderBottomWidth: 0.2, borderBottomColor: Colors.charcoal }}>
              <Col style={styles.colViewStyle}>
                 <Text style={styles.rowTextStyle}>{mystories.ButtonName}</Text>
              </Col>
              <Col style={styles.arrowRowStyle}>
                 <Icon name="ios-arrow-forward-outline" style={{ color: Colors.coal, fontSize: 20 }} />
              </Col>
            </Row>
          </TouchableOpacity>
      </View>
    );
  }
}