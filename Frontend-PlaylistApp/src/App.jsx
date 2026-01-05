
import { RouterProvider } from 'react-router-dom';
import Header from './components/Header.jsx'
import router from './router.jsx'

function App() {
  
  return (
    <>
      <main>
        <Header></Header>
        <RouterProvider router = { router}/>
      </main>
      
    </>
  )
}

export default App
