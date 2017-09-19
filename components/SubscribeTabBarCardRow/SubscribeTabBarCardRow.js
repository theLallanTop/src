import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Colors, Fonts, Images } from '../../theme';
import { Grid, Row, Col, Card, Icon, Body, Button } from 'native-base';
import styles from './SubscribeTabBarCardRowStyle';
import { selectSubscriptionPackage } from '../../redux/modules/subscribe'
import { connect } from 'react-redux';
import moment from 'moment';

class SubscribeTabBarCardRow extends Component {

  static propTypes = {
    subscribecards: PropTypes.any,
    cards: PropTypes.any,
    rowID: PropTypes.any,
    selectedRow: PropTypes.any,
    selectedPackage: PropTypes.any,
    isMyPlan: PropTypes.any,
  };

  static contextTypes = {
    store: PropTypes.object
  };


  selectSubscribePackage = () => {
    const { store: { dispatch }} = this.context;
    dispatch(selectSubscriptionPackage(this.props.cards));
  };


  render() {
    const { selectedPackage } = this.props;
    const rowId = this.props.rowID;
    const cards = this.props.cards;
    let isSelected = false;
    if(selectedPackage !== null) {
      if(selectedPackage.id === cards.id) {
        isSelected = true
      }
    }
    if(this.props.isMyPlan) {
      return (
        <View style={styles.myPlanCardRowContainer}>
          <Col style={{ borderTopLeftRadius: 10 }}>
            <Card style={{ borderRadius: 5 }}>
              <View style={styles.titleViewStyle}>
                <Text style={styles.titleTextStyle}>
                  {cards.title.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.priceViewStyle,{ marginBottom: 10, marginTop: 5 }]}>
                {cards.priceINR !== null &&
                  <Text style={styles.pricetextStyle}>
                    INR {cards.priceINR}
                  </Text>
                }
                {cards.priceDollar !== null &&
                  <Text style={styles.pricetextStyle}>
                   $ {cards.priceDollar}
                  </Text>
                }
                {cards.createdAt !== null &&
                  <Text style={styles.pricetextStyle}> Created at: {moment(cards.createdAt, 'YYYY-MM-DD').format("DD MMM YYYY")}</Text>
                }
              </View>
            </Card>
          </Col>
        </View>

      );
    } else {
      return (
        <View style={styles.CardRowContainer}>
          <Col style={{ borderTopLeftRadius: 10 }}>
            <Card style={{ borderRadius: 5 }}>
              <View style={styles.titleViewStyle}>
                <Text style={styles.titleTextStyle}>
                  {cards.title.toUpperCase()}
                </Text>
              </View>
              <View style={styles.priceViewStyle}>
                <Text style={styles.pricetextStyle}>
                  INR {cards.priceINR}
                </Text>
                <Text style={styles.pricetextStyle}>
                  $ {cards.priceDollar}
                </Text>
              </View>
              <View style={styles.buttonViewStyle}>
                <Button
                  transparent
                  block
                  style={{ flex: 1, marginTop: 10, marginBottom: 10 }}
                  onPress={this.selectSubscribePackage}
                >
                  {isSelected && <Icon name="md-checkmark-circle" style={{ color: 'green', }}/>}
                  <Text
                    style={[styles.buttonTextStyle, { color: isSelected ? 'green' : Colors.BaseColor }]}
                  >
                    {isSelected ? 'SELECTED' : 'SELECT' }
                  </Text>
                </Button>
              </View>

            </Card>
          </Col>
        </View>

      );
    }
  }
}

export default connect(state => ({
  selectedPackage: state.subscribe.selectedSubScriptionPackage,

}))(SubscribeTabBarCardRow)