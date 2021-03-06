import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import { VStack } from '@chakra-ui/layout';
import Home from './components/home';
import Posts from './components/posts'
import RenderPost from './components/render-post'
import { HashRouter, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <HashRouter>
      <div className="App">
        <VStack>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/posts/:id" component={RenderPost} />
          </Switch>
          <Footer />
        </VStack>
      </div>
    </HashRouter>
  );
}
