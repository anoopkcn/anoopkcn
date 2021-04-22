import './App.css';
import Header from './components/header'
import About from './components/about'
import Container from './components/container';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Container>
        <About></About>
      </Container>
    </div>
  );
}

export default App;
