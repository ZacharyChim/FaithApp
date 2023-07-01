import React, { useEffect } from 'react'
import XDate from 'xdate'
import { Avatar, Card } from 'react-native-paper'
import { BookingStackScreenProps } from '../../types'
import { courseSeletor, getMyCourse } from '@slice/course'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
  } from 'react-native'
import { groupBy } from 'ramda'
import { size, Spacing } from '@starter'
import { useDispatch, useSelector } from 'react-redux'


const width = Dimensions.get('window').width

export default function BookingScreen({
  navigation,
}: BookingStackScreenProps<'BookingPage'>) {
  const dispatch = useDispatch<any>()

  useEffect(() => {
    dispatch(getMyCourse())  
  }, [])

  const { myCourses } = useSelector(courseSeletor)
  const groupedCourses = groupBy((c) => c.attributes.date, myCourses)

  return <ScrollView>
    <View style={styles.container}>
      {Object.keys(groupedCourses).map(k => {
        const date = new XDate(k)
        const courses = groupedCourses[k]
        return <>
          <View style={styles.bar}>
            <Text style={styles.bold}>{date.toString('ddd')}</Text>
            <Text>{date.toString('dd MMM YYYY')}</Text>
          </View>
          {courses.map(c => {
            return <Card style={{ margin: 20 }} key={c.id}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Avatar.Image size={50} source={{ uri: `https://admin.faithfitnesshk.com${c.attributes.course.data.attributes.trainer.data.attributes.image.data.attributes.url}` }} />
                  <Spacing width={size[4]} />
                  <View>
                    <Text style={styles.title}>{c.attributes.course.data.attributes.name}</Text>
                    <Text style={styles.smallText}>
                      {c.attributes.course.data.attributes.trainer.data.attributes.name}
                    </Text>
                    <Text style={styles.smallText}>
                      {`${c.attributes.course.data.attributes.start.substring(0, 5)} - ${c.attributes.course.data.attributes.end.substring(0, 5)}`}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          })}
        </>
      })}
    </View>
  </ScrollView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
