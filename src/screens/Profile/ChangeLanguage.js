import React, { Component } from 'react';
import { Text, View, Dimensions, SafeAreaView } from 'react-native';
import { Header } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { fonts } from '../../constants/theme';
import { langList } from '../../utils/misc';
var { width, height } = Dimensions.get('screen');
class ChangeLanguage extends Component {
  static navigationOptions = {
    header: null,
    isLoading: false,
  };

  setLanguage = async language => {
    await AsyncStorage.setItem('@language_key', language + '');
    this.props.setLanguage(language);
    this.props.navigation.navigate("LoginScreen");

    const params = this.props.navigation.getParam('profile');
    if(params==='profile'){
      this.props.navigation.navigate("Profile")
    }else{
      this.props.navigation.navigate("LoginScreen");
    }
    // if(this.props.navigation.goBack()){
    //   this.props.navigation.navigate("Profile")
    // }
    // this.props.navigation.goBack();
    
    // this.props.navigation.navigate("LoginScreen");

  };
  render() {
    return (
      <SafeAreaView>
          <Header i18nKey="language" style={{ paddingHorizontal: 24 }} />
          <View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: height / 9 }}>
            {langList.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => this.setLanguage(item.id)}>
                <Text style={{ padding: 15, fontFamily: fonts.regular }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLanguage: language => {
      dispatch(actions.changeLanguage(language));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangeLanguage);
