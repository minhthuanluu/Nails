import React, {Component} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Header, AppText} from '../../components';
import {services, colors} from '../../constants/theme';
import {getData} from '../../utils/misc';

import {addCart, getServicesInCart} from '../../utils/api';
export default class ServicesDetails extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    token: '',
    countServices: 0,
    currentSelect: 0,
    itemSelected: false,
  };

  async componentDidMount() {
    try {
      var token = await getData('token');
      var countServices = await getServicesInCart(token);
      console.log(countServices);
      this.setState({
        token,
        countServices: countServices.length,
      });
    } catch (error) {
      console.log(error);
    }
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  goCart = () => {
    this.props.navigation.navigate('CartScreen', {
      booking: true,
      titleHeader: 'cart',
    });
  };

  changeCount = value => {
    this.setState({
      countServices:
        this.state.countServices > -1 ? this.state.countServices + value : 0,
    });
  };

  changeImage = index => {
    this.setState({
      currentSelect: index,
    });
  };

  renderImage(image) {
    return image.map((value, index) =>
      value ? (
        <TouchableOpacity key={index} onPress={() => this.changeImage(index)}>
          <Image
            source={{uri: value}}
            style={{width: 65, height: 65, marginRight: 20}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : null,
    );
  }

  _addCart = async (token, idService) => {
    this.setState({itemSelected: !this.state.itemSelected});
    var url = 'https://nail2go-server.herokuapp.com/api/cart/updateCart';
    if (this.state.itemSelected) {
      url = 'https://nail2go-server.herokuapp.com/api/cart/deleteProductInCart';
    }
    try {
      var data = await addCart(token, idService, url);
      var response = await getServicesInCart(token);
      this.setState({countServices: response.length});
    } catch (error) {
      console.log(error);
    }
  };
  
  render() {
    const {item} = this.props.navigation.state.params;
    return (
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <View style={{flex: 1, width: '100%'}}>
          <View style={{position: 'absolute', zIndex: 1, width: '100%'}}>
            <Header
              i18nKey="services_nav"
              rightMenu={true}
              backScreen={true}
              whiteText={false}
              searchIcon={false}
              cartIcon={true}
              headerStyle={{paddingHorizontal: 24}}
              onClick={this.goBack}
              onPressCart={this.goCart}
              countServices={this.state.countServices}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Image
              source={{uri: item.image[this.state.currentSelect]}}
              style={{height: 193, marginBottom: 15}}
              resizeMode="cover"
            />
            <View style={services.detailsConten}>
              <Text style={services.detailsTitle}>
                {item.nameService[0].value}
              </Text>
              <Text style={services.detailsPrice}>${item.price}</Text>
              <TouchableOpacity
                onPress={() => this._addCart(this.state.token, item._id)}
                style={[
                  {
                    width: 103,
                    height: 36,
                    borderRadius: 8,
                    marginVertical: 20,
                  },
                  this.state.itemSelected
                    ? {
                        borderColor: colors.hover,
                        borderWidth: 1,
                        backgroundColor: 'white',
                      }
                    : {backgroundColor: colors.primary},
                ]}>
                <AppText
                  style={[
                    services.detailsBtnBook,
                    this.state.itemSelected ? {color: colors.hover} : null,
                  ]}
                  i18nKey="book"
                />
              </TouchableOpacity>
              <Text style={services.detailsContent}>
                {item.description[0].value}
              </Text>
              <ScrollView
                horizontal
                style={services.imageGallery}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {this.renderImage(item.image)}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
