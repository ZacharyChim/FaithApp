import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import { BookingStackScreenProps } from '../../types'
import { Card, Avatar, Button } from 'react-native-paper'

import trainer2 from '../../assets/images/trainers/course.png'

const item = {
  id: 2,
  title: '17:15泰拳小組訓練',
  dateTime: '2022-10-05T09:15:00+08:00',
  duration: '60min',
  trainer: '阿陳',
  image: trainer2,
  isFull: false,
  users: [1],
}

const width = Dimensions.get('window').width

export default function BookingScreen({
  navigation,
}: BookingStackScreenProps<'BookingPage'>) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.bold}>Wed</Text>
        <Text>1 Jun 2022</Text>
      </View>
      <Card style={{ margin: 20 }}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // width: '80%',
              alignItems: 'center',
            }}
          >
            <Avatar.Image size={50} source={item.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.smallText}>
                {item.duration} {item.trainer}
              </Text>
            </View>
            <Button
              style={{ borderRadius: 10 }}
              textColor='black'
              buttonColor='#28A745'
            >
              Booked
            </Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.bar}>
        <Text style={styles.bold}>Thu</Text>
        <Text>2 Jun 2022</Text>
      </View>
      <Card style={{ marginTop: 17, marginHorizontal: 20 }}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // width: '80%',
              alignItems: 'center',
            }}
          >
            <Avatar.Image size={50} source={item.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.smallText}>
                {item.duration} {item.trainer}
              </Text>
            </View>
            <Button
              style={{ borderRadius: 10 }}
              textColor='black'
              buttonColor='#28A745'
            >
              Booked
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: width,
  },
  bar: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  smallText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
})
