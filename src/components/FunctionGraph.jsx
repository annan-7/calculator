import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Grid
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import './FunctionGraph.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Grid
)

const FunctionGraph = () => {
  const [functionExpression, setFunctionExpression] = useState('x^2')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [data, setData] = useState({ labels: [], datasets: [] })
  const [error, setError] = useState('')

  // Safe evaluation of mathematical expressions
  const evaluateFunction = (expression, x) => {
    try {
      // Replace common mathematical functions and operators
      let safeExpression = expression
        .replace(/x/g, `(${x})`)
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E')

      // Only allow safe mathematical operations
      const allowedChars = /^[0-9+\-*/().,Math\s]+$/
      if (!allowedChars.test(safeExpression)) {
        throw new Error('Invalid characters in expression')
      }

      const result = eval(safeExpression)
      return isFinite(result) ? result : null
    } catch (err) {
      return null
    }
  }

  const generateData = () => {
    try {
      setError('')
      const points = []
      const step = (xMax - xMin) / 200 // 200 points for smooth curve

      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateFunction(functionExpression, x)
        if (y !== null && isFinite(y) && Math.abs(y) < 1000) {
          points.push({ x, y })
        }
      }

      if (points.length === 0) {
        setError('No valid points generated. Check your function expression.')
        return
      }

      const chartData = {
        labels: points.map(point => point.x.toFixed(2)),
        datasets: [
          {
            label: `f(x) = ${functionExpression}`,
            data: points.map(point => point.y),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.1,
            pointRadius: 0
          }
        ]
      }

      setData(chartData)
    } catch (err) {
      setError('Error generating graph. Please check your function expression.')
    }
  }

  useEffect(() => {
    generateData()
  }, [functionExpression, xMin, xMax])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Function Graph'
      }
    },
    scales: {
      x: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'x'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'f(x)'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  const handleFunctionChange = (e) => {
    setFunctionExpression(e.target.value)
  }

  const handleXMinChange = (e) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setXMin(value)
    }
  }

  const handleXMaxChange = (e) => {
    const value = parseFloat(e.target.value)
    if (!isNaN(value)) {
      setXMax(value)
    }
  }

  const presetFunctions = [
    { name: 'x²', expression: 'x^2' },
    { name: 'x³', expression: 'x^3' },
    { name: 'sin(x)', expression: 'sin(x)' },
    { name: 'cos(x)', expression: 'cos(x)' },
    { name: 'e^x', expression: 'exp(x)' },
    { name: 'ln(x)', expression: 'log(x)' },
    { name: '1/x', expression: '1/x' },
    { name: '√x', expression: 'sqrt(x)' }
  ]

  return (
    <div className="function-graph">
      <div className="graph-header">
        <h2>Function Grapher</h2>
      </div>
      
      <div className="controls">
        <div className="input-group">
          <label htmlFor="function">Function f(x) =</label>
          <input
            id="function"
            type="text"
            value={functionExpression}
            onChange={handleFunctionChange}
            placeholder="Enter function (e.g., x^2, sin(x), x^3 + 2*x)"
            className="function-input"
          />
        </div>
        
        <div className="range-controls">
          <div className="input-group">
            <label htmlFor="xMin">X Min:</label>
            <input
              id="xMin"
              type="number"
              value={xMin}
              onChange={handleXMinChange}
              step="0.5"
              className="range-input"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="xMax">X Max:</label>
            <input
              id="xMax"
              type="number"
              value={xMax}
              onChange={handleXMaxChange}
              step="0.5"
              className="range-input"
            />
          </div>
        </div>
        
        <div className="preset-functions">
          <label>Preset Functions:</label>
          <div className="preset-buttons">
            {presetFunctions.map((preset, index) => (
              <button
                key={index}
                onClick={() => setFunctionExpression(preset.expression)}
                className="preset-button"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="graph-container">
        <Line data={data} options={options} />
      </div>
      
      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Use <strong>x</strong> as the variable</li>
          <li>Supported operators: <strong>+</strong>, <strong>-</strong>, <strong>*</strong>, <strong>/</strong>, <strong>^</strong> (power)</li>
          <li>Supported functions: <strong>sin</strong>, <strong>cos</strong>, <strong>tan</strong>, <strong>log</strong>, <strong>sqrt</strong>, <strong>abs</strong>, <strong>exp</strong></li>
          <li>Constants: <strong>pi</strong> (π), <strong>e</strong> (Euler's number)</li>
          <li>Examples: <code>x^2</code>, <code>sin(x)</code>, <code>x^3 + 2*x</code>, <code>exp(-x^2/2)</code></li>
        </ul>
      </div>
    </div>
  )
}

export default FunctionGraph 