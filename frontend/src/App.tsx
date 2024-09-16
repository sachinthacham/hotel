
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Layout from './layout/Layout'
import Register from './pages/Register'


function App() {

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
          <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
          <Route path="/register" element={<Layout><Register/></Layout>}/>
          <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        </Routes>
      </Router>
       
   
  )
}

export default App
