import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
  Legend
)

const FunctionGraph = () => {
  const [functionExpression, setFunctionExpression] = useState('x^2')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [data, setData] = useState({ labels: [], datasets: [] })
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('polynomial')

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
        .replace(/asin/g, 'Math.asin')
        .replace(/acos/g, 'Math.acos')
        .replace(/atan/g, 'Math.atan')
        .replace(/log/g, 'Math.log')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/exp/g, 'Math.exp')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/floor/g, 'Math.floor')
        .replace(/ceil/g, 'Math.ceil')
        .replace(/round/g, 'Math.round')

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
      const step = (xMax - xMin) / 300 // 300 points for smoother curve

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
            borderColor: 'rgb(102, 126, 234)',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            borderWidth: 3,
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
        labels: {
          font: {
            size: 14,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Function Graph',
        font: {
          size: 18,
          weight: '700'
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: 'x',
          font: {
            size: 14,
            weight: '600'
          }
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
          text: 'f(x)',
          font: {
            size: 14,
            weight: '600'
          }
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

  const functionCategories = {
    polynomial: {
      name: 'Polynomial Functions',
      functions: [
        { name: 'x²', expression: 'x^2', description: 'Quadratic function' },
        { name: 'x³', expression: 'x^3', description: 'Cubic function' },
        { name: 'x⁴', expression: 'x^4', description: 'Quartic function' },
        { name: 'x² + 2x + 1', expression: 'x^2 + 2*x + 1', description: 'Quadratic with offset' },
        { name: 'x³ - x', expression: 'x^3 - x', description: 'Cubic minus linear' },
        { name: 'x⁴ - 2x²', expression: 'x^4 - 2*x^2', description: 'Quartic minus quadratic' }
      ]
    },
    linear: {
      name: 'Linear & Affine Functions',
      functions: [
        { name: 'x', expression: 'x', description: 'Identity function' },
        { name: '2x', expression: '2*x', description: 'Linear with slope 2' },
        { name: 'x + 3', expression: 'x + 3', description: 'Linear with y-intercept 3' },
        { name: '-x + 2', expression: '-x + 2', description: 'Negative slope' },
        { name: '0.5x - 1', expression: '0.5*x - 1', description: 'Gentle slope' },
        { name: '3x + 5', expression: '3*x + 5', description: 'Steep positive slope' }
      ]
    },
    rational: {
      name: 'Rational Functions',
      functions: [
        { name: '1/x', expression: '1/x', description: 'Reciprocal function' },
        { name: '1/(x+1)', expression: '1/(x+1)', description: 'Shifted reciprocal' },
        { name: 'x/(x+1)', expression: 'x/(x+1)', description: 'Rational function' },
        { name: '1/x²', expression: '1/x^2', description: 'Reciprocal squared' },
        { name: 'x/(x²+1)', expression: 'x/(x^2+1)', description: 'Rational with quadratic' },
        { name: '1/(x²+1)', expression: '1/(x^2+1)', description: 'Bell curve' }
      ]
    },
    exponential: {
      name: 'Exponential Functions',
      functions: [
        { name: 'e^x', expression: 'exp(x)', description: 'Natural exponential' },
        { name: 'e^(-x)', expression: 'exp(-x)', description: 'Decaying exponential' },
        { name: '2^x', expression: '2^x', description: 'Base 2 exponential' },
        { name: 'e^(-x²/2)', expression: 'exp(-x^2/2)', description: 'Gaussian function' },
        { name: 'e^x - 1', expression: 'exp(x) - 1', description: 'Exponential minus 1' },
        { name: '1 - e^(-x)', expression: '1 - exp(-x)', description: 'Sigmoid-like' }
      ]
    },
    logarithmic: {
      name: 'Logarithmic Functions',
      functions: [
        { name: 'ln(x)', expression: 'log(x)', description: 'Natural logarithm' },
        { name: 'ln(x+1)', expression: 'log(x+1)', description: 'Shifted logarithm' },
        { name: 'ln|x|', expression: 'log(abs(x))', description: 'Log of absolute value' },
        { name: 'ln(x²)', expression: 'log(x^2)', description: 'Log of squared' },
        { name: 'ln(x+2)', expression: 'log(x+2)', description: 'Log with offset' },
        { name: 'ln(1+x)', expression: 'log(1+x)', description: 'Log of 1+x' }
      ]
    },
    trigonometric: {
      name: 'Trigonometric Functions',
      functions: [
        { name: 'sin(x)', expression: 'sin(x)', description: 'Sine function' },
        { name: 'cos(x)', expression: 'cos(x)', description: 'Cosine function' },
        { name: 'tan(x)', expression: 'tan(x)', description: 'Tangent function' },
        { name: 'sin(2x)', expression: 'sin(2*x)', description: 'Sine with frequency 2' },
        { name: 'cos(x/2)', expression: 'cos(x/2)', description: 'Cosine with frequency 0.5' },
        { name: 'sin(x) + cos(x)', expression: 'sin(x) + cos(x)', description: 'Combined trig' }
      ]
    },
    power: {
      name: 'Power Functions',
      functions: [
        { name: '√x', expression: 'sqrt(x)', description: 'Square root' },
        { name: 'x^(1/3)', expression: 'x^(1/3)', description: 'Cube root' },
        { name: 'x^(1/4)', expression: 'x^(1/4)', description: 'Fourth root' },
        { name: 'x^(2/3)', expression: 'x^(2/3)', description: 'Power 2/3' },
        { name: 'x^(3/2)', expression: 'x^(3/2)', description: 'Power 3/2' },
        { name: 'x^(-1/2)', expression: 'x^(-1/2)', description: 'Power -1/2' }
      ]
    },
    special: {
      name: 'Special Functions',
      functions: [
        { name: '|x|', expression: 'abs(x)', description: 'Absolute value' },
        { name: 'floor(x)', expression: 'floor(x)', description: 'Floor function' },
        { name: 'ceil(x)', expression: 'ceil(x)', description: 'Ceiling function' },
        { name: 'round(x)', expression: 'round(x)', description: 'Round function' },
        { name: 'x*sin(x)', expression: 'x*sin(x)', description: 'Amplitude modulation' },
        { name: 'sin(x)/x', expression: 'sin(x)/x', description: 'Sinc function' }
      ]
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (functionCategories[category].functions.length > 0) {
      setFunctionExpression(functionCategories[category].functions[0].expression)
    }
  }

  return (
    <div className="function-graph">
      <div className="graph-header">
        <h2>Advanced Function Grapher</h2>
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
        
        <div className="function-categories">
          <label>Function Categories:</label>
          <div className="category-tabs">
            {Object.keys(functionCategories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              >
                {functionCategories[category].name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="preset-functions">
          <label>{functionCategories[selectedCategory].name}:</label>
          <div className="preset-buttons">
            {functionCategories[selectedCategory].functions.map((func, index) => (
              <button
                key={index}
                onClick={() => setFunctionExpression(func.expression)}
                className="preset-button"
                title={func.description}
              >
                {func.name}
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
        <h3>Instructions & Supported Functions:</h3>
        <ul>
          <li>Use <strong>x</strong> as the variable</li>
          <li>Supported operators: <strong>+</strong>, <strong>-</strong>, <strong>*</strong>, <strong>/</strong>, <strong>^</strong> (power)</li>
          <li><strong>Trigonometric:</strong> <code>sin(x)</code>, <code>cos(x)</code>, <code>tan(x)</code>, <code>asin(x)</code>, <code>acos(x)</code>, <code>atan(x)</code></li>
          <li><strong>Logarithmic:</strong> <code>log(x)</code> (natural log), <code>ln(x)</code></li>
          <li><strong>Exponential:</strong> <code>exp(x)</code> (e^x), <code>e^x</code></li>
          <li><strong>Power:</strong> <code>sqrt(x)</code>, <code>x^(1/3)</code>, <code>x^(2/3)</code></li>
          <li><strong>Special:</strong> <code>abs(x)</code>, <code>floor(x)</code>, <code>ceil(x)</code>, <code>round(x)</code></li>
          <li>Constants: <strong>pi</strong> (π), <strong>e</strong> (Euler's number)</li>
          <li>Examples: <code>x^2</code>, <code>sin(x)</code>, <code>x^3 + 2*x</code>, <code>exp(-x^2/2)</code>, <code>1/(x+1)</code></li>
        </ul>
      </div>
    </div>
  )
}

export default FunctionGraph 