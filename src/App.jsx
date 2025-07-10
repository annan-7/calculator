import { useState } from 'react'
import Calculator from './components/Calculator'
import FunctionGraph from './components/FunctionGraph'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('calculator')

  return (
    <div className="App">
      <div className="app-header">
        <h1>Math Tools</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={`tab-button ${activeTab === 'graph' ? 'active' : ''}`}
            onClick={() => setActiveTab('graph')}
          >
            Function Grapher
          </button>
        </div>
      </div>
      
      <div className="app-content">
        {activeTab === 'calculator' && <Calculator />}
        {activeTab === 'graph' && <FunctionGraph />}
      </div>
    </div>
  )
}

export default App
