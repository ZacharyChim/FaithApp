import React, { FC, memo, useCallback } from 'react'
import { colors } from '../../themes/colors'
import { Pressable, View } from 'react-native'
import { styles } from './styles'
import { Text } from '../Text'


interface IPaginationNumber {
  isCurrentPage: boolean
  onPress: (page: number) => void
  page: number | null
}

export const PaginationNumber: FC<IPaginationNumber> = memo(({ page, isCurrentPage, onPress }) => {
  const handlePageChange = useCallback(() => {
    onPress(page!)
  }, [onPress, page])

  const isSpacer = page === null

  return isSpacer ? (
    <View style={styles.spacer}>
      <Text>...</Text>
    </View>
  ) : (
    <Pressable onPress={handlePageChange}>
      <View style={[styles.box, styles.number]}>
        {!!page && <Text
          style={{
            color: isCurrentPage ? colors.primary : colors.dark,
            textDecorationLine: isCurrentPage ? 'underline' : 'none',
          }}
        >
          {page.toString()}
        </Text>}
      </View>
    </Pressable>
  )
})
