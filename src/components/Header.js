import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
} from 'react-native';
import {colors, sizes, fonts} from '../constants/theme';
// Import Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons} from '../utils/images';
import axios from 'axios';
import {AppText} from './';
import {services} from '../../src/constants/theme';
import {BASE_URL_ROUTE, getData} from '../utils/misc';
import {connect} from 'react-redux';
import I18n from '../utils/i18n';
class Header extends Component {
  state = {
    searchValue: '',
    searchText: 'Search',
    i18n: I18n,
  };

  componentDidMount() {
    const {language} = this.props;
    if (language) this.setMainLocaleLanguage(language);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.language !== prevState.language) {
      return {language: nextProps.language};
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      const {language} = this.state;
      this.setMainLocaleLanguage(language);
    }
  }

  setMainLocaleLanguage = language => {
    let i18n = this.state.i18n;
    i18n.locale = language;
    this.setState({i18n});
  };

  updateInput = value => {
    this.setState({searchValue: value});
    this.props.onSearchChange(value);
  };
  render() {
    const {
      rightMenu,
      headerStyle,
      backScreen,
      whiteText,
      searchIcon,
      cartIcon,
      middleTitle,
    } = this.props;
    return rightMenu ? (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          headerStyle,
        ]}>
        {backScreen ? (
          <TouchableOpacity
            onPress={() => this.props.onClick()}
            style={{width: 24}}>
            <Image
              source={whiteText ? icons.backIconWhite : icons.backIcon}
              style={{height: 20, marginVertical: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : this.props.searchInput ? (
          <TextInput
            placeholder={this.state.i18n.t('search')}
            style={{marginVertical: 10,minWidth:100}}
            placeholderTextColor="#9DA3B4"
            value={this.state.searchValue}
            autoCaptitalize={'none'}
            onChangeText={value => this.updateInput(value)}
          />  
        ) : (
          <AppText
            style={[styles.header, this.props.style]}
            i18nKey={this.props.i18nKey}
          />
        )}
        {middleTitle ? (
          <AppText
            style={[styles.header, this.props.style]}
            i18nKey={this.props.i18nKey}
          />
        ) : null}
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {searchIcon ? (
            <TouchableOpacity
              onPress={() => this.props.onPressSearch()}
              style={{marginRight: 20}}>
              <Ionicons
                name="ios-search"
                color={whiteText ? '#fff' : '#000'}
                size={sizes.h1}
              />
            </TouchableOpacity>
          ) : null}
          {cartIcon ? (
            <TouchableOpacity onPress={() => this.props.onPressCart()}>
              <Ionicons
                name="md-basket"
                color={whiteText ? '#fff' : '#000'}
                size={sizes.h1}
              />
              <View style={services.cartNum}>
                <Text style={services.numOfServices}>
                  {this.props.countServices ? this.props.countServices : 0}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    ) : (
      <AppText
        style={[styles.header, this.props.style]}
        i18nKey={this.props.i18nKey}
      />
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: colors.heading,
    fontFamily: fonts.black,
    fontSize: sizes.h1,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
});

const mapStateToProps = state => {
  return {
    language: state.languageReducer.language,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Header);