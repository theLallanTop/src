import React, { PropTypes, Component } from 'react';
import { View, Text, NetInfo, } from 'react-native';
import styles from './AboutUsStyle';
import { Metrics, Colors } from '../../theme';
import { Container, Content } from 'native-base';

export default class AboutUs extends Component {
  constructor(){
    super();
    this.state = {

    };
  }




  render() {
    return(
      <Container style={{ flex: 1, marginTop: Metrics.navBarHeight,backgroundColor: Colors.homeBackground, }}>
        <Content>
          <View style={styles.textviewContainer}>
            <Text style={styles.textaboutusStyle}>
              The wonder in our eyes and the curiosity on our faces, the amazement,
              the imagination... listening to stories transported us to a different world.
              We grew up on stories narrated to us by our grandparents, parents and other elders in the family.
              They were the good old days when we would lie beside our nanas and nanis,
              dadas and dadis, aajis and azobas, as they took us on fantasy journeys with their
              tales from the Panchatantra, the wit of Birbal, the righteousness of the Pandavas,
              the stories of Vikram and Betal et al. However, now, with technology invading our lives like never
              before, nuclear families and working parents overpowering the social set up, the art of story-telling
              has become rare. This unique and one of its kind app Fir Kya Hua brings back the good old era
              of storytelling in your and your children&#39;s lives in a language that is none other
              than our very own Hindi.
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
