import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images, Metrics } from '../../theme';
import styles from './RatingViewStyle';
import Modal from 'react-native-simple-modal';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { storyrate } from '../../redux/modules/myStories';
import StarRating from 'react-native-star-rating';

export default class RatingView extends Component {

  static contextTypes = {
    store: PropTypes.object
  };

  static propTypes = {
    dispatch: PropTypes.func,
  };

  constructor(){
    super();
    this.state = {
      open: false,
      kahani: [],
      starCount: null,
    }
  }

  /* refs value pass from Playview class */
  openRatingModel = (isOpen , kahaani) => {
    // console.log('kahaani ----- >> ', kahaani);
    this.setState({
      open: isOpen,
      kahani:kahaani,
      starCount: null,
    });
  };

  onPressCloseBtn = () => {
    this.setState({open: false });
  };

  onPressRateItBtn = () => {
    const { store: { dispatch }} = this.context;
    dispatch(storyrate(this.state.kahani.storyId, this.state.starCount));
    this.setState({open: false });
  };

  onStarRatingPress(rating){
    // console.log('rating ---- >> ', rating);
    this.setState({
      starCount: rating
    });
  }

  render(){

    return(
      <Modal
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        containerStyle={{  }}>
        <View style={{  }}>
          <View style={styles.subViewStyle}>
            <Text style={styles.titleTextStyle}>
              {this.state.kahani.title}
            </Text>
            <Text style={styles.discTextStyle}>
              {this.state.kahani.description}
            </Text>
          </View>
          <View style={styles.ratingStyle}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              starColor={'#F4BF27'}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={styles.closeBtnStyle}
                onPress={this.onPressRateItBtn}>
                <Text style={styles.closeTextStyle}>Rate It</Text>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor = {Colors.cloud}
                style={styles.closeBtnStyle}
                onPress={this.onPressCloseBtn}>
                <Text style={styles.closeTextStyle}>Close</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
