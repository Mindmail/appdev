import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import affirmationsReducer from './reducers/affirmations'
import buddyReducer from './reducers/buddy'
import goalsReducer from './reducers/goals'
import imagesReducer from './reducers/images'
const rootReducer = combineReducers({
  affirmations: affirmationsReducer,
  buddy: buddyReducer,
  goals: goalsReducer,
  images: imagesReducer,
})

export type AppState = ReturnType<typeof rootReducer>

const configureStore = (): any => {
  const middlewares = [thunkMiddleware]
  const middleWareEnhancer = applyMiddleware(...middlewares)
  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  )

  return store
}

export default configureStore
