import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductsNew from './pages/ProductsNew'
import ProductsFeatured from './pages/ProductsFeatured'
import NoMatch from './pages/NoMatch'
import Nav from './components/Nav';
import Team from './pages/Team';

function App() {
  return (
    <div>
      <Nav />
      <hr />
      <Routes>
        {/* 
        Bei "element" wird JSX-Ausdruck übergeben.
        <Route path="/" element={<div>Home</div>} />
        */}
        {/* 
        Man darf nicht mehrere Route-Tags mit demselben Pfad angeben.
        Es können beliebige Inhalte zu einer Pfadangabe gelegt werden.
        <Route path="/" element={<><Home /><About /></>} />
        */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About wen="uns" />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:department" element={<Team />} />
        <Route path="/team/:department/:id" element={<Team />} />
        <Route path="/products" element={<Products />}>
          <Route path="new" element={<ProductsNew />} />
          <Route path="featured" element={<ProductsFeatured />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
