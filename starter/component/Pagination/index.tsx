import React, { memo } from 'react'
import { View } from 'react-native'

import { PaginationButton } from './Button'
import { calculatePages } from './helpers'
import { PaginationNumber } from './Number'

export interface IPagination {
  /**
   * The number of current page.
   **/
  currentPage: number
  onPageChange: (page: number) => void
  /**
   * The totlat number of all pages.
   **/
  totalPages: number
}

export const Pagination = memo(({ currentPage, totalPages, onPageChange }: IPagination) => {
  if (currentPage < 1) {
    throw new Error('`currentPage` must be bigger than 0 (zero)')
  }
  if (currentPage > totalPages) {
    throw new Error('`currentPage` must be smaller or equal to `totalPages`')
  }
  if (totalPages < 1) {
    throw new Error('`totalPages` must be bigger than 0 (zero)')
  }
  const pages = calculatePages({ currentPage, totalPages })
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
      <PaginationButton direction='prev' page={currentPage} disabled={currentPage === 1} onPress={onPageChange} />
      {pages.map((page, index) => {
        return (
          <PaginationNumber
            key={`Page-${page}-${index}`}
            page={page}
            isCurrentPage={page === currentPage}
            onPress={onPageChange}
          />
        )
      })}
      <PaginationButton
        direction='next'
        page={currentPage}
        disabled={currentPage === totalPages}
        onPress={onPageChange}
      />
    </View>
  )
})
