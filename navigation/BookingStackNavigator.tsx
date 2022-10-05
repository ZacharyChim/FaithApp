import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CalendarScreen from '../screens/BookingStackScreens/CalendarScreen'
import BookingScreen from '../screens/BookingStackScreens/BookingScreen'

import { BookingStackParamList } from '../types'

const BookingStack = createNativeStackNavigator<BookingStackParamList>()

function BookingStackNavigator() {
  return (
    <BookingStack.Navigator>
      <BookingStack.Screen
        name='CalendarPage'
        component={CalendarScreen}
        options={{
          title: 'Calendar',
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
      <BookingStack.Screen
        name='BookingPage'
        component={BookingScreen}
        options={{
          title: 'My Bookings',
          headerShadowVisible: false,
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          headerTitleStyle: {
            color: '#000',
          },
        }}
      />
    </BookingStack.Navigator>
  )
}

export default BookingStackNavigator
