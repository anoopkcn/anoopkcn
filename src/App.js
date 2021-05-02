import './App.css';
import Header from './components/header'
import About from './components/about'
import Container from './components/container';
import Skills from './components/skills';
import Projects from './components/projects';
import { VStack } from '@chakra-ui/layout';

function App() {
  return (
    <div className="App">
      <VStack>
      <Header></Header>
      <Container>
        <About></About>
        <Projects></Projects>
        <Skills></Skills>
      </Container>
      </VStack>
    </div>
  );
}

export default App;
