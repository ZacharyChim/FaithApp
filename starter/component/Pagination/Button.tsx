import React, { FC, memo, useCallback } from 'react'
import { colors } from '../../themes/colors'
import { Icons } from '../../themes/icons'
import { Pressable, View } from 'react-native'
import { styles } from './styles'


interface IPaginationButton {
  direction: 'prev' | 'next'
  disabled: boolean
  onPress: (number: number) => void
  page: number
}

export const PaginationButton: FC<IPaginationButton> = memo(({ direction, onPress, disabled, page }) => {
  const isPrev = direction === 'prev'

  const handlePageChange = useCallback(() => {
    !disabled && onPress(isPrev ? page - 1 : page + 1)
  }, [disabled, onPress, isPrev, page])

  return (
    <Pressable onPress={handlePageChange}>
      <View style={[styles.box, styles.button]}>
        {direction === 'prev' ? (
          <Icons name='left' color={disabled ? colors.gray400 : colors.dark} />
        ) : (
          <Icons name='right' color={disabled ? colors.gray200 : colors.dark} />
        )}
      </View>
    </Pressable>
  )
})
