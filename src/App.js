import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { VStack } from '@chakra-ui/layout';
import Home from './components/home';
import Posts from './components/posts'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="App">
        <VStack>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts" component={Posts} />
          </Switch>
          <Footer />
        </VStack>
      </div>
    </Router>
  );
}
