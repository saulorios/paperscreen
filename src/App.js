import react from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './cards.css'
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Series from './components/Series'
import Detail from './components/details/Detail';
import Results from './components/results/Results';
import Animes from './components/Animes'
import Manga from './components/Manga'
import AMDetail from './components/animes/AMDetail'
import Aresults from './components/animes/Aresults'


function App() {
  
  return (
    <BrowserRouter>
    <Route exact path='/anime/:id' component={AMDetail}/>
    <Route exact path='/animes' component={Animes} />
    <Route exact path='/manga' component={Manga} />
    <Route exact path='/searching/:typing' component={Aresults} />
      <Switch>
        <Route exact path="/">
            <Home/>
        </Route>
        <Route exact path='/detail/:type/:id' component={Detail}/>

        <Route exact path='/series' component={Series} />

        <Route exact path='/search/:typing' component={Results} />

      </Switch>
      
   
    </BrowserRouter>
  );
}

export default App;
