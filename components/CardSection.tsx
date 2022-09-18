import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';


const iconColor = '#6c5ce7';
const RestaurantCard = () => {
  // const { name, categories, deliveryTime, distance, image } = info;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.imageStyle} source={image} />
        {/* <View style={styles.infoStyle}>
          <Text style={styles.titleStyle}>{name}</Text>
          <Text style={styles.categoryStyle}>{categories}</Text>

        </View images = [
  'https://images.pexels.com/photos/5185150/pexels-photo-5185150.jpeg?cs=srgb&dl=pexels-cottonbro-5185150.jpg&fm=jpg',
  'https://images.pexels.com/photos/2585916/pexels-photo-2585916.jpeg?cs=srgb&dl=pexels-sanni-sahil-2585916.jpg&fm=jpg',
  'https://images.pexels.com/photos/6415/apple-desk-office-working.jpg?cs=srgb&dl=pexels-kaboompics-com-6415.jpg&fm=jpg',
]ew> */}
      </View>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#a29bfe',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default RestaurantCard;