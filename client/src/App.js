import './App.css';
import { BrowserRouter,Route, Switch} from "react-router-dom"

import Home from './components/home';
import LandingPage from './components/landingPage';
import CreateDog from './components/createDog';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Switch>
     <Route exact path="/" component={LandingPage}/>
     <Route  path="/home" component={Home}/>
     <Route exact path="/createDog" component={CreateDog}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
