import { BookingStackScreenProps } from '../../types'

import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars'
import { Card, Avatar, Button } from 'react-native-paper'

import { Button as myButton } from '../../components/Button'

import { useSelector, useDispatch } from 'react-redux'
import { addClass, addStudent, removeStudent } from '../../redux/features/class'

import trainer1 from '../../assets/images/trainers/trainer.png'
import trainer2 from '../../assets/images/trainers/course.png'
import ButtonToggle from '../../components/ButtonToggle'

export default function CalendarScreen({
  navigation,
}: BookingStackScreenProps<'CalendarPage'>) {
  const classes = useSelector((state) => state.class.value)
  const users = useSelector((state) => state.user.value)
  let currentUser
  let isLogin = false
  if (users.length > 0) {
    currentUser = users.find((user) => user.isLogin)
    if (currentUser) {
      isLogin = true
    }
  }

  const dispatch = useDispatch()

  // items.map((item) => {
  //   dispatch(addClass(item))
  // })
  // function loadItems(day): void {}

  const renderItem = (item) => {
    const showButton = () => {
      if (item.isFull) {
        return (
          <Button
            style={{ borderRadius: 10 }}
            buttonColor='#6C757D'
            textColor='black'
          >
            Full
          </Button>
        )
      } else if (item.users.includes(currentUser.userId)) {
        return (
          <ButtonToggle
            buttonText='Booked'
            textColor='black'
            buttonColor='#28A745'
            item={item}
            currentUser={currentUser}
          />
        )
      } else {
        return (
          <ButtonToggle
            buttonText='Book'
            textColor='white'
            buttonColor='black'
          />
        )

        // if (status === 'Booked') {
        //   return (
        //     <Button
        //       buttonColor='#28A745'
        //       textColor='black'
        //       onPress={handlePress}
        //     >
        //       {booked}
        //     </Button>
        //   )
        // } else {
        //   return (
        //     <Button
        //       buttonColor='#28A745'
        //       textColor='black'
        //       onPress={() => {
        //         dispatch(
        //           removeStudent({
        //             classId: item.id,
        //             studentId: currentUser.userId,
        //             date: item.dateTime.split('T', 1)[0],
        //           })
        //         )
        //       }}
        //     >
        //       Cancel?
        //     </Button>
        //   )
        //   }
        // } else {
        //   return (
        //     <Button
        //       buttonColor='black'
        //       textColor='white'
        //       onPress={() => {
        //         dispatch(
        //           addStudent({
        //             classId: item.id,
        //             studentId: currentUser.userId,
        //             date: item.dateTime.split('T', 1)[0],
        //           })
        //         )
        //       }}
        //     >
        //       book
        //     </Button>
        //   )
      }
    }
    return (
      // <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
      <Card style={{ marginRight: 10, marginTop: 17 }}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
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
            {showButton()}
          </View>
        </Card.Content>
      </Card>
      // </TouchableOpacity>
    )
  }
  if (isLogin) {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <Agenda
          items={classes}
          // loadItemsForMonth={loadItems}
          selected={'2022-10-05'}
          renderItem={renderItem}
        />
        <Button
          style={styles.button}
          buttonColor='black'
          textColor='white'
          onPress={() => {
            navigation.navigate('BookingPage')
          }}
        >
          My Bookings
        </Button>
      </View>
    )
  } else {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.empty}>Your are not logged in</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    fontSize: 20,
  },
  button: {
    width: '90%',
    // marginHorizontal: 20,
    margin: 20,
    borderRadius: 10,
  },
})
