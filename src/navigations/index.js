import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// Import Style
import theme from '../constants/theme';
import BookedScreen from '../screens/Booked';
import CartScreen from '../screens/Cart';
//Import Screen
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import ServicesScreen from '../screens/Services';
import ServicesDetails from '../screens/Services/ServicesDetails';
import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Welcome/Login';
import ScheduleScreen from '../screens/Services/Schedule';
// Import Language
import I18n from '../utils/i18n';
//Import Images
import {icons} from '../utils/images';
import AuthLoading from '../AuthLoading';
import ChangeLanguage from '../screens/Profile/ChangeLanguage';

//Welcome - Login Navigation
const WelcomeStack = createStackNavigator({
  WelcomeScreen: WelcomeScreen,
  ChangeLanguage: ChangeLanguage,
  LoginScreen:  LoginScreen,
});

//Home Navigation
const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  HotServicesDetails: {
    screen: ServicesDetails,
  },
});

//Services Navigation
const ServicesStack = createStackNavigator({
  ServicesScreen: {
    screen: ServicesScreen,
  },
  ServicesDetails: {
    screen: ServicesDetails,
  },
  CartScreen: {
    screen: CartScreen,
  },
  ScheduleScreen: {
    screen: ScheduleScreen,
  },
});

//Booked Navigation
const BookedStack = createStackNavigator({
  BookedScreen: {
    screen: BookedScreen,
  },
  BookedDetails: {
    screen: CartScreen,
  },
});

//Profile Navigation
const ProfileStack = createStackNavigator({
  ProfileScreen: {
    screen: ProfileScreen,
  },
  ChangeLanguage: ChangeLanguage,
});

//Bottom Navigation
const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('home_nav'),
      }),
    },
    Services: {
      screen: ServicesStack,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('services_nav'),
      }),
    },
    Booked: {
      screen: BookedStack,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('booked_nav'),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        tabBarLabel: I18n.t('profile_nav'),
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;
        let iconImage;
        if (routeName === 'Home') {
          iconImage = focused ? icons.home_focused : icons.home;
        } else if (routeName === 'Services') {
          iconImage = focused ? icons.services_focused : icons.services;
        } else if (routeName === 'Booked') {
          iconImage = focused ? icons.booked_focused : icons.booked;
        } else if (routeName === 'Profile') {
          iconImage = focused ? icons.profile_focused : icons.profile;
        }
        return <Image source={iconImage} style={{height: 20, width: 20}} />;
      },
    }),
    tabBarOptions: {
      initialRouteName: 'Home',
      activeTintColor: theme.colors.hover,
      inactiveTintColor: theme.colors.secondary_text,
    },
  },
);

//Switch Screen
const SwitchNav = createSwitchNavigator({
  Auth: AuthLoading,
  Welcome: WelcomeStack,
  Home: BottomNav,
});

const AppContainer = createAppContainer(SwitchNav);

export default AppContainer;
