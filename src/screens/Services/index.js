import React, {Component} from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {Header,AppText} from '../../components';
import {services} from '../../constants/theme';
import {getData} from '../../utils/misc';
import ServiceItem from './ServiceItem';
import {getServicesInCart, getServices} from '../../utils/api';
export default class ServicesScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    token: '',
    data: null,
    countServices: 0,
    cartData: null,
    searchInput: false,
    newData: null,
    schedule: <AppText i18nKey="schedule" />
  };

  async componentDidMount() {
    try {
      const token = await getData('token');
      var data = await getServices(token);

      this.setState({
        data,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  goCart = () => {
    this.props.navigation.navigate('CartScreen', {
      booking: true,
      titleHeader: this.state.schedule
    });
  };

  changeStatusSearch = () => {
    this.setState({searchInput: !this.state.searchInput});
    if (this.state.searchInput) {
      this.setState({newData: null});
    }
  };

  goDetails = item => {
    this.props.navigation.navigate('ServicesDetails', {item});
  };

  changeCount = async token => {
    var response = await getServicesInCart(token);
    this.setState({
      countServices: response.length,
    });
  };
  onChangeSearch = value => {
    if (value !== '') {
      let newData = this.state.data.filter(
        item => item.nameService[0].value.indexOf(value) !== -1,
      );
      this.setState({
        newData: newData,
      });
    } else {
      this.setState({
        newData: null,
      });
    }
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={services.container}>
          <Header
            i18nKey="services_nav"
            rightMenu={true}
            searchIcon={true}
            onPressCart={this.goCart}
            cartIcon={true}
            searchInput={this.state.searchInput}
            onPressSearch={this.changeStatusSearch}
            countServices={this.state.countServices}
            onSearchChange={this.onChangeSearch}
          />
          {this.state.data ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={this.state.newData ? this.state.newData : this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <ServiceItem
                  item={item}
                  onClick={this.goDetails}
                  countServices={this.changeCount}
                />
              )}
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}
