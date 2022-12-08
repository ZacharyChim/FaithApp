const PAGINATION_WINDOW_SIZE = 3 // !! Doesn't support other window sizes. Just a variable.
const ITEMS_AROUND_WINDOW_MIDDLE = (PAGINATION_WINDOW_SIZE - 1) / 2

const createPagesArray = (totalPages: number) => {
  return Array.from(Array(totalPages).keys()).map((key) => {
    return key + 1
  })
}

const getStartSliceIndex = (currentPage: number) => {
  return currentPage - ITEMS_AROUND_WINDOW_MIDDLE - 1 < 0
    ? 0
    : currentPage - ITEMS_AROUND_WINDOW_MIDDLE - 1
}

const getEndSliceIndex = (currentPage: number, totalPages: number) => {
  return currentPage + ITEMS_AROUND_WINDOW_MIDDLE + 1 > totalPages
    ? totalPages
    : currentPage + ITEMS_AROUND_WINDOW_MIDDLE
}

const createNumberWindow = (currentPage: number, totalPages: number) => {
  // Create non 0-based array: [1,2,3,4..totalPages]
  const availablePages = createPagesArray(totalPages)

  // Decide where to slice it up, if page is 7, we get [6,7,8] (window size of 3)
  const startSliceIndex = getStartSliceIndex(currentPage)
  const endSliceIndex = getEndSliceIndex(currentPage, totalPages)

  return availablePages.slice(startSliceIndex, endSliceIndex)
}

export const calculatePages = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}): (number | null)[] => {
  const currentWindow = createNumberWindow(currentPage, totalPages)

  const firstItemInWindow = currentWindow[0]
  let lastItemInWindow = currentWindow[currentWindow.length - 1]

  // Beginning: add 1 in front if needed
  const beginning = []
  if (firstItemInWindow! > 1) {
    beginning.push(1)
  }

  // Beginning: Our window size can be too small. [2 (current)] should become [2 (current),3]
  if (
    currentWindow.length < PAGINATION_WINDOW_SIZE &&
    lastItemInWindow < totalPages
  ) {
    currentWindow.push(PAGINATION_WINDOW_SIZE)
    // Reset lastItemInWindow because the items have changed
    lastItemInWindow = currentWindow[currentWindow.length - 1]
  }

  // Ending: Our window size can be too small. [6,7 (current)] should become [5,6,7 (current)]
  if (currentWindow.length < PAGINATION_WINDOW_SIZE) {
    // Don't add if not bigger than 1
    if (currentPage - 2 > 1) {
      currentWindow.unshift(currentPage - 2)
    }
  }

  // Beginning spacer (...)
  if (currentWindow[0] > 2) {
    // Spacer betwen 1 and the next item if the current page is bigger than 3
    // [1] ... [3] [4 (current)] [5]
    beginning.push(null)
  }

  // Ending: add totalPages at end if needed
  const ending = []
  if (lastItemInWindow! < totalPages) {
    ending.unshift(totalPages)
  }

  // Ending spacer (...)
  if (totalPages - currentWindow[currentWindow.length - 2] > 2) {
    // Spacer betwen the last item in the window and the last item if the current page is less than last - 3
    // [3] [4 (current)] [5] ... [7]
    ending.unshift(null)
  }

  return beginning.concat(currentWindow).concat(ending)
}
