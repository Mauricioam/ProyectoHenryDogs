import './App.css';
import { BrowserRouter,Route, Switch} from "react-router-dom"

import Home from './components/home';
import LandingPage from './components/landingPage';
import CreateDog from './components/createDog';
import DetailDog from './components/dogDetail';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
     <Route exact path="/" component={LandingPage}/>
     <Route exact path="/home" component={Home}/>
     <Route exact path="/home/createDog" component={CreateDog}/>
     <Route exact path="/home/:id" component={DetailDog}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
