import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [amount, setAmount] = useState('0')
  const navigate = useNavigate()

  const handleNumberClick = (num) => {
    if (amount === '0') {
      setAmount(num)
    } else {
      setAmount(amount + num)
    }
  }

  const handleDecimalClick = () => {
    if (!amount.includes('.')) {
      setAmount(amount + '.')
    }
  }

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1))
    } else {
      setAmount('0')
    }
  }

  const handleClear = () => {
    setAmount('0')
  }

  const handleContinue = () => {
    if (parseFloat(amount) > 0) {
      navigate('/method', { state: { amount: parseFloat(amount) } })
    }
  }

  const formatAmount = (value) => {
    if (value === '0' || value === '') return '0'
    // 处理小数点显示
    if (value.endsWith('.')) {
      return value
    }
    // 移除前导零（除了小数点前）
    const num = parseFloat(value)
    if (isNaN(num)) return '0'
    // 如果是整数，不显示小数点
    if (Number.isInteger(num)) {
      return num.toString()
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 顶部提示文字 */}
          <div className="text-center pt-8 pb-4">
            <p className="text-gray-600 text-lg">Enter amount</p>
          </div>

          {/* 金额显示区域 */}
          <div className="text-center px-6 py-8">
            <div className="text-6xl font-bold text-gray-800">
              {formatAmount(amount)}
            </div>
          </div>

          {/* 数字键盘 */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-3 gap-3">
              {/* 第一行：1, 2, 3 */}
              <button
                onClick={() => handleNumberClick('1')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                1
              </button>
              <button
                onClick={() => handleNumberClick('2')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                2
              </button>
              <button
                onClick={() => handleNumberClick('3')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                3
              </button>

              {/* 第二行：4, 5, 6 */}
              <button
                onClick={() => handleNumberClick('4')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                4
              </button>
              <button
                onClick={() => handleNumberClick('5')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                5
              </button>
              <button
                onClick={() => handleNumberClick('6')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                6
              </button>

              {/* 第三行：7, 8, 9 */}
              <button
                onClick={() => handleNumberClick('7')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                7
              </button>
              <button
                onClick={() => handleNumberClick('8')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                8
              </button>
              <button
                onClick={() => handleNumberClick('9')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                9
              </button>

              {/* 第四行：., 0, 退格 */}
              <button
                onClick={handleDecimalClick}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                .
              </button>
              <button
                onClick={() => handleNumberClick('0')}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full text-2xl font-semibold text-gray-800 transition-colors flex items-center justify-center"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="w-full aspect-square bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full flex items-center justify-center transition-colors relative"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ml-1">
                  <svg
                    className="w-3 h-3 text-gray-800"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* 操作按钮 */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleClear}
                className="py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
              >
                清除
              </button>
              <button
                onClick={handleContinue}
                disabled={parseFloat(amount) <= 0}
                className={`py-3 px-4 font-semibold rounded-lg transition-colors ${
                  parseFloat(amount) > 0
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                继续
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home