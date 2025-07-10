import { useState } from 'react'
import './Calculator.css'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)

    setWaitingForOperand(false)
  }

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    if (!previousValue || !operation) return

    const inputValue = parseFloat(display)
    const newValue = calculate(previousValue, inputValue, operation)

    setDisplay(String(newValue))
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  const handlePercentage = () => {
    const currentValue = parseFloat(display)
    const newValue = currentValue / 100
    setDisplay(String(newValue))
  }

  const handlePlusMinus = () => {
    const currentValue = parseFloat(display)
    const newValue = -currentValue
    setDisplay(String(newValue))
  }

  const formatDisplay = (value) => {
    const num = parseFloat(value)
    if (isNaN(num)) return '0'
    
    // Handle large numbers and decimals
    if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-9 && num !== 0)) {
      return num.toExponential(6)
    }
    
    // Format with appropriate decimal places
    const stringNum = num.toString()
    const integerDigits = parseFloat(stringNum.split('.')[0])
    const decimalDigits = stringNum.split('.')[1]
    
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>Calculator + Graph </h1>
      </div>
      
      <div className="display">
        <div className="display-content">
          {formatDisplay(display)}
        </div>
      </div>
      
      <div className="keypad">
        <div className="keypad-row">
          <button className="key function" onClick={clearAll}>
            AC
          </button>
          <button className="key function" onClick={handlePlusMinus}>
            ±
          </button>
          <button className="key function" onClick={handlePercentage}>
            %
          </button>
          <button 
            className={`key operator ${operation === '÷' ? 'active' : ''}`}
            onClick={() => performOperation('÷')}
          >
            ÷
          </button>
        </div>
        
        <div className="keypad-row">
          <button className="key number" onClick={() => inputDigit(7)}>
            7
          </button>
          <button className="key number" onClick={() => inputDigit(8)}>
            8
          </button>
          <button className="key number" onClick={() => inputDigit(9)}>
            9
          </button>
          <button 
            className={`key operator ${operation === '×' ? 'active' : ''}`}
            onClick={() => performOperation('×')}
          >
            ×
          </button>
        </div>
        
        <div className="keypad-row">
          <button className="key number" onClick={() => inputDigit(4)}>
            4
          </button>
          <button className="key number" onClick={() => inputDigit(5)}>
            5
          </button>
          <button className="key number" onClick={() => inputDigit(6)}>
            6
          </button>
          <button 
            className={`key operator ${operation === '-' ? 'active' : ''}`}
            onClick={() => performOperation('-')}
          >
            −
          </button>
        </div>
        
        <div className="keypad-row">
          <button className="key number" onClick={() => inputDigit(1)}>
            1
          </button>
          <button className="key number" onClick={() => inputDigit(2)}>
            2
          </button>
          <button className="key number" onClick={() => inputDigit(3)}>
            3
          </button>
          <button 
            className={`key operator ${operation === '+' ? 'active' : ''}`}
            onClick={() => performOperation('+')}
          >
            +
          </button>
        </div>
        
        <div className="keypad-row">
          <button className="key number zero" onClick={() => inputDigit(0)}>
            0
          </button>
          <button className="key number" onClick={inputDecimal}>
            .
          </button>
          <button className="key equals" onClick={handleEquals}>
            =
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator 