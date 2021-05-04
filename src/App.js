import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { VStack } from '@chakra-ui/layout';
import Home from './components/home';

export default function App() {
  return (
    <div className="App">
      <VStack>
        <Header/>
        <Home/>
        <Footer/>
      </VStack>
    </div>
  );
}
