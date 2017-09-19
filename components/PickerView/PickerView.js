import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, Picker } from 'react-native';
import styles from './PickerViewStyle';
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import { pickerViewUpdateStatus, pickerViewMonthValue, pickerViewYearValue } from '../../redux/modules/payment';

class PickerView extends Component {

  constructor() {
    super();
    this.state = {
      month: '01',
      year: '1',
      yearList: []
    }

  }


  static contextTypes = {
    store: PropTypes.object
  };

  closePickerView = () => {
    const { store: { dispatch }} = this.context;
    dispatch(pickerViewUpdateStatus(false, null));
  };

  componentWillMount() {
    var d = new Date();
    var n = d.getFullYear();
    let arr = [];

    for(i = n; i<=n+10; i++) {
      let m = i.toString();
      arr.push(m);
    }
    this.setState({
      year: n,
      yearList: arr
    })
  }

  selectMonthAndYear = () => {
    const { isMonth } = this.props;
    this.closePickerView();
    const { store: { dispatch }} = this.context;
    if(isMonth) {
      dispatch(pickerViewMonthValue(this.state.month, false));

    } else {
      dispatch(pickerViewYearValue(this.state.year, false))
    }



  };

 render() {

   const { isOpen, isMonth } = this.props;
   let serviceItems = this.state.yearList.map( (s, i) => {
     return <Picker.Item key={i} value={s} label={s} />
   });
   return (
     <Modal
       open={this.props.isOpen}
       modalDidOpen={() => console.log('modal did open')}
       modalDidClose={this.closePickerView}
       style={{alignItems: 'center'}}>
       {isMonth && <View>
         <View style={styles.okButtonView}>
         <TouchableOpacity
           style={styles.okButtonStyle}
           onPress={this.selectMonthAndYear}
         >
           <Text style={styles.okButtonTextColor}>Ok</Text>
         </TouchableOpacity>
         </View>
          <Picker
           selectedValue={this.state.month}
           onValueChange={(month) =>
             this.setState({month: month})
           }
           >
           <Picker.Item label="Jan(01)" value="01" />
           <Picker.Item label="Feb(02)" value="02" />
           <Picker.Item label="Mar(03)" value="03" />
           <Picker.Item label="Apr(04)" value="04" />
           <Picker.Item label="May(05)" value="05" />
           <Picker.Item label="Jun(06)" value="06" />
           <Picker.Item label="July(07)" value="07" />
           <Picker.Item label="Aug(08)" value="08" />
           <Picker.Item label="Sep(09)" value="09" />
           <Picker.Item label="Oct(10)" value="10" />
           <Picker.Item label="Nov(11)" value="11" />
           <Picker.Item label="Dec(12)" value="12" />
         </Picker>
       </View>}
       {!isMonth &&
       <View>
         <View style={styles.okButtonView}>
           <TouchableOpacity
             style={styles.okButtonStyle}
             onPress={this.selectMonthAndYear}
           >
             <Text style={styles.okButtonTextColor}>Ok</Text>
           </TouchableOpacity>
         </View>

       <Picker
         selectedValue={this.state.year}
         onValueChange={(year) =>
           this.setState({year: year})
         }
       >
         {serviceItems}
       </Picker>
     </View>
         }
     </Modal>
   );
 }
}

export default connect(state => ({
  isOpen: state.payment.pickerViewIsOpen,
  isMonth: state.payment.isMonth
}))(PickerView)