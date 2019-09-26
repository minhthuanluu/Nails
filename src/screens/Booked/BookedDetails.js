import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { cart } from "../../constants/theme";
import { ServicesData } from "../../constants/sampleData";
import { Header } from "../../components";

export default class CartScreen extends Component {
  static navigationOptions = {
    header: null
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  renderCartItems(item) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ServicesDetails", { item: item })
        }
      >
        <View style={cart.cartItem}>
          <Image style={cart.image} source={{ uri: item.images[0] }} />
          <Text style={cart.itemTitle}>{item.title}</Text>
          <Text style={cart.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          i18nKey="cart"
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
        <Text style={cart.title}> Services in Cart </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={ServicesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.renderCartItems(item)}
        />
        <View
          style={cart.amountContainer}
        >
          <View style={{ flex: 1 }}>
            <Text style={cart.summarytext}>Amount</Text>
            <Text style={cart.summarytext}>Tip</Text>
            <Text style={cart.summarytext}>Total</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "flex-end",
              alignItems: "flex-end",
              right: 0
            }}
          >
            <Text style={[cart.summarytext, { textAlign: "right" }]}>
              $2500
            </Text>
            <Text style={[cart.summarytext, { textAlign: "right" }]}>$10</Text>
            <Text style={[cart.summarytext, { textAlign: "right",paddingBottom: 0 }]}>
              $2510
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
