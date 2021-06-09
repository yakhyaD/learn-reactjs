import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { login, logout, step } from './features/user/userSlice';
import { auth } from './firebase/firebaseConfig';
import { ChoosePlans } from './pages/ChoosePlans';
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home"
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Plans } from './pages/Plans';
import { PlansForm } from './pages/PlansForm';
import { RegForm } from './pages/RegForm';
import { Register } from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {

  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          id: user.id,
          email: user.email
        }))
        setUser(user)
      } else {
        // Log out
        dispatch(logout)
      }
    })
    return () => unsubscribe()
  })
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute path='/home' user={user} component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/regform' component={RegForm} />
          <ProtectedRoute path='/signup' component={ChoosePlans} />
          <Route path='/logout' component={Logout} />
          <Route user={user} path='/signup/planform' component={PlansForm} />
          <Route path='/plans' user={user} component={Plans} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
