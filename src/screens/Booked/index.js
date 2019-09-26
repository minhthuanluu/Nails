import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../components';
import axios from 'axios';
import {booked} from '../../constants/theme';
import {getData} from '../../utils/misc';
import moment from 'moment';
import {AppText} from '../../components'
export default class BookedScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    bookingList: null,
    slot: 0,
    time: 0,
  };
  goDetails = item => {
    this.props.navigation.navigate('BookedDetails', {
      booking: false,
      titleHeader: 'details',
    });
  };

  async componentDidMount() {
    const token = await getData('token');
    this.getBooked(token, 0);
  }

  getBooked = async (token, page) => {
    try {
      var dataz = await axios({
        url: `https://nail2go-server.herokuapp.com/api/booking/getBooked?page=${page}`,
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      console.log(dataz.data);
      this.setState({
        bookingList: dataz.data.booked,
        isLoading: true,
      });
      console.log(dataz.data.booked);
    } catch (error) {
      console.log(error);
    }
  };

  renderItem(item) {
    return (
      <View style={booked.itemContainer}>
        <View style={booked.datetimeContainers}>
          <Text style={booked.date}>{moment(item.date).format('MMMM Do YYYY')}</Text>
          <Text style={booked.time}>{item.slots.slotName}</Text>
        </View>
        <Text style={booked.price}>CHF{item.total}</Text>
      </View>
    );
  }
  render() {
    const {bookingData} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        {bookingData ? (
          <View style={booked.header}>
            <Header
              i18nKey="booked_nav"
              style={{color: '#fff', paddingLeft: 24}}
            />
            <View style={booked.notification}>
              <View style={booked.datetime}>
                <Text style={booked.notifyTime}>10:00 - 12:00</Text>
                <Text style={booked.notifyDate}>Tuesday, August 20, 2019</Text>
              </View>
              <Text style={booked.bookingText}>Booking</Text>
            </View>
          </View>
        ) : (
          <Header i18nKey="booked_nav" style={{paddingLeft: 24}} />
        )}
        <View style={booked.container}>
          <Text style={booked.title}><AppText i18nKey="history"/></Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.bookingList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => this.renderItem(item)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
