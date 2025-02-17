import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import './App.scss'
import { CustomizedSnackbar } from './components/shared/CustomizedSnackbar'
import { DataLoader } from './components/shared/DataLoader'
import { Routing } from './Routing'
import { store } from './store/store'

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <div className="flex flex-row h-full w-full">
            <CustomizedSnackbar />
            <DataLoader />
            <Routing />
          </div>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

export default App
