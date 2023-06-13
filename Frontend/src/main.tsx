import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store'

const root = ReactDOM.createRoot(document.getElementById('root')!)

const store = configureStore()

// Setup MSW mock server in development
if (process.env.NODE_ENV === 'development') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start()
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(<App />)
}
