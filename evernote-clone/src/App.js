import './index.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/layout/Navbar'
import Home from './components/home/Home';
import { Favorites } from './components/note/Favorites';
import { NoteDetails } from './components/note/NoteDetails';
import { EditNote } from './components/note/EditNote';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NoteDetails} />
        <Route path="/edit/:id" component={EditNote} />
      </Switch>
    </Router>
  )
}

export default App