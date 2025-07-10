# Math Tools - Calculator & Function Grapher

A React application featuring a calculator and function grapher built with modern web technologies.

## Features

### 🧮 Calculator
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculations
- Sign change functionality
- Clean, modern interface with responsive design

### 📈 Function Grapher
- Plot mathematical functions using Chart.js
- Support for various mathematical functions and operators
- Adjustable x-axis range
- Preset function buttons for quick access
- Real-time function evaluation and plotting

## Supported Mathematical Functions

The function grapher supports the following mathematical operations:

### Operators
- `+` (addition)
- `-` (subtraction)
- `*` (multiplication)
- `/` (division)
- `^` (power/exponentiation)

### Functions
- `sin(x)` - Sine function
- `cos(x)` - Cosine function
- `tan(x)` - Tangent function
- `log(x)` - Natural logarithm
- `sqrt(x)` - Square root
- `abs(x)` - Absolute value
- `exp(x)` - Exponential function

### Constants
- `pi` - π (Pi)
- `e` - Euler's number

## Examples

Try these function expressions:
- `x^2` - Parabola
- `sin(x)` - Sine wave
- `x^3 + 2*x` - Cubic function with linear term
- `exp(-x^2/2)` - Gaussian function
- `1/x` - Hyperbola
- `sqrt(x)` - Square root function

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cal
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and development server
- **Chart.js** - Charting library for function plotting
- **react-chartjs-2** - React wrapper for Chart.js
- **CSS3** - Styling with modern CSS features

## Project Structure

```
src/
├── components/
│   ├── Calculator.jsx      # Calculator component
│   ├── Calculator.css      # Calculator styles
│   ├── FunctionGraph.jsx   # Function grapher component
│   └── FunctionGraph.css   # Function grapher styles
├── App.jsx                 # Main app component
├── App.css                 # App styles
└── main.jsx               # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Calculator
The calculator provides a full-featured interface similar to a scientific calculator, with:
- Large, easy-to-read display
- Responsive button layout
- Error handling for invalid operations
- Support for decimal numbers and large numbers

### Function Grapher
The function grapher offers:
- Real-time function plotting
- Adjustable x-axis range
- Error handling for invalid expressions
- Preset function buttons for common functions
- Responsive design that works on mobile devices
- Smooth animations and transitions

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
