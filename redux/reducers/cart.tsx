const cartReducer = (state= [], action){
  switch(action.type){
    case 'ADD':
      return [...state, action.payload.product]
      case 'DEL':
        return state.filter(product => product.Id !== action.payload.product.Id)
  }
}