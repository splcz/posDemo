import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PaymentMethod from './pages/PaymentMethod'
import Payment from './pages/Payment'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/method" element={<PaymentMethod />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App