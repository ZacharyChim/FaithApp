import * as XDate from 'xdate'
import ButtonToggle from '../../components/ButtonToggle'
import React, { useEffect, useState } from 'react'
import { Agenda } from 'react-native-calendars'
import { Avatar, Button, Card } from 'react-native-paper'
import { BookingStackScreenProps } from '../../types'
import { courseGet, courseSeletor } from '@slice/course'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'



export default function CalendarScreen({
  navigation,
}: BookingStackScreenProps<'CalendarPage'>) {
  const { courses } = useSelector(courseSeletor)
  const [selected, setSelected] = useState<Date>(new Date())

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

  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(courseGet())
  }, [])

  const renderItem = (item) => {
    console.log(item)
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
      }
    }
    return (
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
    )
  }

  if (isLogin) {
    return (
      <View style={{ flex: 1, marginTop: 40 }}>
        <Agenda
          selected={new XDate(selected).toString('yyyy-MM-dd')}
          onDayPress={(d) => {
            setSelected(new Date(d.dateString))
          }}
          renderEmptyData={() => {
            const date = selected.getDay()
            const month = selected.getMonth()
            const items = courses.filter(c => c.available_date.includes(date) && c.available_month.includes(month + 1))
            return <View>
              <Text style={styles.title}>{new XDate(selected).toLocaleDateString()}</Text>
              {items.map(i =>
                <Card style={{ marginRight: 10, marginTop: 17 }} key={i.id}>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar.Image size={50} source={{ uri: `http://165.22.255.85:1337${i.trainer.data.attributes.image.data.attributes.url}` }} />
                      <View>
                        <Text style={styles.title}>{i.name}</Text>
                        <Text style={styles.smallText}>{'60 mins'} {i.trainer.data.attributes.name}
                        </Text>
                      </View>
                      {/* {showButton()} */}
                    </View>
                  </Card.Content>
                </Card>)}
            </View>
          }}
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
    margin: 20,
    borderRadius: 10,
  },
})
