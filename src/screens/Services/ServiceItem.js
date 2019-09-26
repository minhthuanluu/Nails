import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {AppText} from '../../components';
import {services} from '../../constants/theme';

import {getData} from '../../utils/misc';
import {addCart} from '../../utils/api';
export default class ServiceItem extends Component {
  state = {
    itemSelected: false,
    token: '',
    idSlot: '',
    idService: '',
  };

  async componentDidMount() {
    try {
      var token = await getData('token');
      this.setState({token: token});
    } catch (error) {
      console.log(error);
    }
  }

  _addCart = async (token, idService) => {
    this.setState({itemSelected: !this.state.itemSelected});
    var url = 'https://nail2go-server.herokuapp.com/api/cart/updateCart';
    if (this.state.itemSelected) {
      url = 'https://nail2go-server.herokuapp.com/api/cart/deleteProductInCart';
    }
    try {
      var data = await addCart(token, idService, url);
      console.log(data);
      this.props.countServices(token);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {itemSelected} = this.state;
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={() => this.props.onClick(item)}>
        <View style={services.listItem}>
          <View
            style={[
              services.column,
              {
                flexDirection: 'row',
                flex: 2,
                marginRight: 20,
              },
            ]}>
            <Image
              style={{
                width: 44,
                height: 44,
                marginRight: 10,
                alignItems: 'center',
                borderRadius: 40,
              }}
              resizeMode="contain"
              source={{uri: item.image[0]}}
            />
            <View style={services.titleBG}>
              <Text style={services.title}>
                {item.nameService[0].value.length > 30
                  ? item.nameService[0].value.substring(0, 30) + '...'
                  : item.nameService[0].value}
              </Text>
              <Text style={services.description}>
                {item.description[0].value.length > 30
                  ? item.description[0].value.substring(0, 30) + '...'
                  : item.description[0].value}
              </Text>
            </View>
          </View>
          <View
            style={[services.column, {justifyContent: 'flex-end', flex: 1}]}>
            <Text
              style={[services.title, {marginBottom: 10, textAlign: 'right'}]}>
              CHF{item.price}
            </Text>
            <TouchableOpacity
              onPress={() => this._addCart(this.state.token, item._id)}
              style={[
                services.btnBook,
                itemSelected ? services.btnBookSelected : null,
              ]}>
              <AppText
                i18nKey="book"
                style={[
                  services.btnBookText,
                  itemSelected ? services.btnTextSelected : null,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
