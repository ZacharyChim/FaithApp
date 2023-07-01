import React, { useEffect, useState } from 'react'
import { Agenda, DateData } from 'react-native-calendars'
import {
  Alert,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { Avatar, Card } from 'react-native-paper'
import { BookingStackScreenProps } from '../../types'
import {
  courseBook,
  courseGet,
  courseSeletor,
  getMyCourse
  } from '@slice/course'
import { ICourse } from '@slice/courseType'
import { size } from '../../starter/themes/size'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoSeletor } from '@slice/userInfo'
import {
  Button,
  LoadingLottie,
  colors,
  t,
} from '@starter'
import { schedulePushNotification } from '../../helpers/notificationHelper'


const XDate = require('xdate')



export default function CalendarScreen({
  navigation,
}: BookingStackScreenProps<'CalendarPage'>) {
  const { courses, status, myCourses } = useSelector(courseSeletor)
  const { user } = useSelector(userInfoSeletor)
  const [selected, setSelected] = useState<Date>(new Date())
  const dispatch = useDispatch<any>()

  console.log(courses)

  useEffect(() => {
    dispatch(courseGet())
    dispatch(getMyCourse())
  }, [])

  const onPressBook = (course: ICourse) => {
    if (!user) {
      return
    }
    dispatch(courseBook({ course: course.id, starting: course.start, users_permissions_user: user.id, date: new XDate(selected).toString('yyyy-MM-dd') }))
    schedulePushNotification({title: '成功預約', body: '教練會盡快聯絡閣下，謝謝！'})
  }

  const onPressMyBook = () => {
    if (!user) {
      Alert.alert('Please login first', undefined, [
        {
          text: 'ok',
          // @ts-ignore
          onPress: () => navigation.navigate('Profile')
        }])
    } else {
      navigation.navigate('BookingPage')
    }
  }

  const onDayPress = (d: DateData) => {
    setSelected(new Date(d.dateString))
  }

  const renderEmptyData = () => {
    const date = selected.getDay()
    const month = selected.getMonth()
    const items = courses.filter(c => c.available_date.includes(date) && c.available_month.includes(month + 1))
    return <View style={styles.cartContainer}>
      <Text style={styles.title}>{new XDate(selected).toLocaleDateString()}</Text>
      {items.map(i => {
        const myCourse = myCourses.find(m => {
          const date = new XDate(m.attributes.date)
          const dateDiff = date.diffDays(selected)
          return m.attributes.course.data.id === i.id && dateDiff < 1 && dateDiff > 0
        })
        const isPassed = new XDate(new Date()).diffDays(selected) < 0
        return <Card style={{ marginTop: 17 }} key={i.id}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}
            >
              <Avatar.Image size={50} source={{ uri: `https://admin.faithfitnesshk.com${i.trainer.data.attributes.image.data.attributes.url}` }} />
              <View>
                <Text style={styles.title}>{i.name}</Text>
                <Text style={styles.smallText}>{`${i.start.substring(0, 5)} to ${i.end.substring(0, 5)}`} </Text>
                <Text style={styles.smallText}>{i.trainer.data.attributes.name}</Text>
              </View>
              <Button
                title={myCourse ? 'Booked' : 'Book'}
                color={isPassed ? colors.gray600 : myCourse ? '#FFC107' : '#28A745'}
                onPress={myCourse || isPassed ? () => {} : () => onPressBook(i)}
              />
            </View>
          </Card.Content>
        </Card>
      }
      )}
    </View>
  }

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Agenda
        selected={new XDate(selected).toString('yyyy-MM-dd')}
        onDayPress={onDayPress}
        renderEmptyData={renderEmptyData}
      />
      <Button
        style={{ padding: size[4] }}
        title={t('myBookings')}
        onPress={onPressMyBook}
      />
      <LoadingLottie isIndicator isVisible={status === 'loading'} />
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
})
