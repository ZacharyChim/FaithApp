import ButtonToggle from '../../components/ButtonToggle'
import React, { useEffect, useState } from 'react'
import { Agenda } from 'react-native-calendars'
import { Avatar, Button, Card } from 'react-native-paper'
import { BookingStackScreenProps } from '../../types'
import { courseGet, courseSeletor } from '@slice/course'
import { ICourse } from '@slice/courseType'
import { size } from '../../starter/themes/size'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


const XDate = require('xdate')



export default function CalendarScreen({
  navigation,
}: BookingStackScreenProps<'CalendarPage'>) {
  const { courses } = useSelector(courseSeletor)
  const [selected, setSelected] = useState<Date>(new Date())
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(courseGet())
  }, [])

  const onPressBook = (course: ICourse) => {

  }

  const onPressMyBook = () => {
    navigation.navigate('BookingPage')
  }

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
          return <View style={styles.cartContainer}>
            <Text style={styles.title}>{new XDate(selected).toLocaleDateString()}</Text>
            {items.map(i =>
              <Card style={{ marginTop: 17 }} key={i.id}>
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
                      <Text style={styles.smallText}>{`${i.start.substring(0, 5)} to ${i.end.substring(0, 5)}`} </Text>
                      <Text style={styles.smallText}>{i.trainer.data.attributes.name}</Text>
                    </View>
                    <ButtonToggle
                      title='Book'
                      color='#28A745'
                      onPress={() => onPressBook(i)}
                    />
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
        onPress={onPressMyBook}
      >
        My Bookings
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartContainer: {
    padding: size[4]
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  button: {
    width: '90%',
    margin: 20,
    borderRadius: 10,
  },
})
