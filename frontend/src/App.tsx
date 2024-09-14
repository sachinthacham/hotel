
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Layout from './layout/Layout'

function App() {

  return (
   
      <Router>
        <Routes>
          <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
          <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
          <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
          <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        </Routes>
      </Router>
       
   
  )
}

export default App
