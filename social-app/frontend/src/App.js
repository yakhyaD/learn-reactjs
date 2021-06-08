import './App.css'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import User from './pages/user'
import Navbar from './components/layouts/Navbar'
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
import AuthRoute from './utils/AuthRoute'
import theme from './utils/theme'
import store from './redux/store'
import { getUserData, logoutUser, setAuthenticated } from './redux/actions/userActions'

const token = localStorage.getItem('FBIdToken')
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
  } else {
    setAuthenticated(token)
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute path='/login' component={Login} />
              <AuthRoute path='/signup' component={Signup} />
              <Route path='/users/:handle' component={User} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
