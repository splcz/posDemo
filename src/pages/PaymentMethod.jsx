import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const amount = location.state?.amount || 0

  useEffect(() => {
    if (!amount || amount <= 0) {
      navigate('/')
    }
  }, [amount, navigate])

  const paymentMethods = [
    { 
      id: 'redotpay', 
      name: 'RedotPay', 
      icon: 'P', 
      color: 'bg-red-500', 
      paylinkBase: '60ed5b1dc83e55acf15da968bf620229', 
    },
    { 
      id: 'metamask', 
      name: 'MetaMask', 
      icon: '🦊', 
      color: 'bg-orange-500', 
      paylinkBase: 'https://cryptopaymentdemobyjacksonlau.vercel.app' 
    },
    { 
      id: 'phantom', 
      name: 'Phantom', 
      icon: '👻', 
      color: 'bg-purple-500', 
      paylinkBase: 'https://cryptopaymentdemobyjacksonlau.vercel.app'
    }
  ]

  const handleContinue = () => {
    if (selectedMethod) {
      const selectedMethodInfo = paymentMethods.find(m => m.id === selectedMethod)
      
      // 构建带 amount 参数的 paylink
      let paylink = ''
      const baseUrl = selectedMethodInfo?.paylinkBase || ''
      
      if (selectedMethod === 'redotpay') {
        // RedotPay 使用 ID
        paylink = baseUrl
      } else if (selectedMethod === 'metamask') {
        // MetaMask: https://link.metamask.io/dapp/https://cryptopaymentdemobyjacksonlau.vercel.app?amount=xxx
        const targetUrl = `${baseUrl}?amount=${amount}`
        paylink = `https://link.metamask.io/dapp/${targetUrl}`
      } else if (selectedMethod === 'phantom') {
        // Phantom: https://phantom.app/ul/browse/ + encodeURIComponent(https://cryptopaymentdemobyjacksonlau.vercel.app?amount=xxx)
        const targetUrl = `${baseUrl}?amount=${amount}`
        paylink = `https://phantom.app/ul/browse/${encodeURIComponent(targetUrl)}`
      }
      
      navigate('/pay', { 
        state: { 
          method: selectedMethod, 
          amount,
          deepLink: selectedMethodInfo?.deepLink,
          paylink
        } 
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-4">
            <p className="text-gray-500 text-sm mb-1">支付金额</p>
            <p className="text-3xl font-bold text-gray-800">{amount.toFixed(2)} USD</p>
          </div>
          <p className="text-xl text-gray-800 mt-5 mb-2">选择支付方式</p>

          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMethod === method.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {method.icon}
                    </div>
                    <span className="font-semibold text-gray-800">{method.name}</span>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
              selectedMethod
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            继续支付
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
