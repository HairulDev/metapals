import React from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import Header from './components/molecules/Header';
import Home from './components/molecules/Home';


const App = () => {

  return (
    <BrowserRouter>
      <div className='container'>
        <Header />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
