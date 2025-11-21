import { useEffect, useMemo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'

function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const amount = location.state?.amount || 0
  const paymentMethod = location.state?.method || 'redotpay'
  const paylink = location.state?.paylink

  const methodInfo = {
    redotpay: { name: 'RedotPay', icon: 'C', color: 'bg-red-500' },
    metamask: { name: 'MetaMask', icon: '🦊', color: 'bg-orange-500' },
    phantom: { name: 'Phantom', icon: '👻', color: 'bg-purple-500' },
  }[paymentMethod] || { name: 'RedotPay', icon: 'C', color: 'bg-red-500' }

  // 将 paylink 进行 URL 编码并拼接到 deepLink 后面
  const qrCodeUrl = useMemo(() => {
    return paylink || ''
  }, [paylink])

  // 根据支付方式返回扫码提示文字（带样式）
  const getScanHint = () => {
    if (paymentMethod === 'redotpay') {
      return (
        <>
          请使用 <span className="font-bold text-gray-900">RedotPay App</span> 扫描二维码
        </>
      )
    } else {
      return (
        <>
          请使用 <span className="font-bold text-gray-900">系统相机/扫码器</span> 扫描二维码
        </>
      )
    }
  }

  useEffect(() => {
    if (!location.state?.method) {
      navigate('/method')
    }
  }, [location.state?.method, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto pt-8">

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 ${methodInfo.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-3`}>
              {methodInfo.icon}
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{methodInfo.name}</h1>
            <div className="mt-4">
              <p className="text-gray-500 text-sm mb-1">支付金额</p>
              <p className="text-3xl font-bold text-gray-800">${amount.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            {qrCodeUrl && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">{getScanHint()}</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-sm text-gray-600">或者 Tap to Pay</p>
                  <svg 
                    className="w-6 h-6 text-indigo-600" 
                    viewBox="0 0 1024 1024" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M620 828.2l-77.8-35.1C582.6 703.6 603 609 603 511.8c0-97-20.4-191.6-60.8-281l77.8-35c45.3 100.5 68.3 206.8 68.3 316 0.1 109.3-22.9 215.8-68.3 316.4zM797.1 913.6l-77.8-35.1c52.6-116.6 79.3-239.9 79.3-366.5s-26.7-249.9-79.3-366.5l77.8-35.1c57.5 127.7 86.8 262.8 86.8 401.6 0 138.7-29.2 273.9-86.8 401.6zM361 705.3L226.5 490.1v192.6h-85.3V341.3l78.9-22.6 168.2 269.2c5.6-22.8 8.9-50.4 8.9-89.1 0-66.5-19.5-139.7-38.9-182.6l77.8-35.1c21.4 47.5 46.4 133.1 46.4 217.7 0 100-21 145.9-41.4 190.3l-5.1 11.1-75 5.1z"></path>
                  </svg>
                </div>
                <div className="flex justify-center bg-white p-4 rounded-lg border-2 border-gray-200">
                  <QRCodeSVG 
                    value={qrCodeUrl} 
                    size={256}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-4 break-all px-2">
                  {qrCodeUrl}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
