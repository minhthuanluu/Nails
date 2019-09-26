import React, { Component } from 'react';
import { TouchableOpacity, Text, FlatList, View, Alert, Dimensions, ProgressBarAndroid,SafeAreaView } from 'react-native';
import { schedule } from "../../constants/theme";
import { Header, ButtonGradient } from "../../components";
import LinearGradient from 'react-native-linear-gradient';

export default class Schedule extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            GridViewItems: [
                { key: 1, slot: 1, begin: '08:00', end: '10:00', status: 0.5 },
                { key: 2, slot: 2, begin: '10:00', end: '12:00', status: 1 },
                { key: 3, slot: 3, begin: '12:00', end: '14:00', status: 0 },
                { key: 4, slot: 4, begin: '14:00', end: '16:00', status: 0.5 },
                { key: 5, slot: 5, begin: '16:00', end: '18:00', status: 1 },
                { key: 6, slot: 6, begin: '18:00', end: '20:00', status: 0.5 },
            ],
            progress: 1
        }
    }

    GetGridViewItem(item) {
        // Alert.alert(item.begin, item.end);
        if (item.status == 1) {
            Alert.alert('Khung giờ này đã đầy dịch vụ!');
        } else {
            Alert.alert(
                'Confirm',
                'Ban da book dich vu ' + item.key + ' vào lúc' + item.begin + ' - ' + item.end,
                [
                    {
                        text: 'OK',
                        onPress: () => {item.status+0.5}

                    },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                ],
                { cancelable: false },
            );
        }
    }
    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        const barWidth = Dimensions.get('screen').width / 2 - 30;
        // const titleHeader = this.props.navigation.getParam("titleHeader");
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header
                    i18nKey="schedule"
                    rightMenu={true}
                    backScreen={true}
                    whiteText={false}
                    searchIcon={false}
                    cartIcon={false}
                    middleTitle={true}
                    headerStyle={{ paddingHorizontal: 24 }}
                    onClick={this.goBack}
                    style={{ textAlign: "center" }}
                />
                <FlatList
                    data={this.state.GridViewItems}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={this.GetGridViewItem.bind(this, item)} style={schedule.container}>
                            <LinearGradient colors={['#FF00A9', '#DC008B']} style={schedule.container}>
                                <Text style={schedule.slotNum}>
                                    {item.key}
                                </Text>
                                <Text style={schedule.time}>{item.begin} - {item.end}</Text>
                                <ProgressBarAndroid
                                    width={barWidth}
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={item.status}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    }
                    numColumns={2}
                />

            </SafeAreaView>
        );
    }
}