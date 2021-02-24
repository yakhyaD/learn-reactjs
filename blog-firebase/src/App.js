import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from "react";
import Navbar from './components/Navbar'
import Home from './components/Home'
import NewBlog from './components/NewBlog'
import BlogDetails from './components/BlogDetails'
import NotFound from './components/NotFound'
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/UserContext';

function App() {

  const [blogs, setBlogs] = useState([])

  const addBlog = async (blog) => {

    const response = await fetch('http://localhost:5000/blogs', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(blog)
    })
    const data = response.json()

    setBlogs([...blogs, data])

  }

  return (
    <Router>
      <AuthProvider>
        <div className="App">
        <Navbar />
          <Switch>
            <Route exact path="/">
              <div className="content">
                <Home />
              </div>
            </Route>
          <Route path="/create">
            <div className="content">
              <NewBlog onAdd={addBlog} />
            </div>
          </Route>
          <Route path="/blogs/:id">
            <div className="content">
              <BlogDetails />
            </div>
          </Route>
          <Route path="/login">
            <div className="content">
              <Login />
            </div>
          </Route>
          <Route path="/register">
            <div className="content">
              <Register />
            </div>
          </Route>
          <Route path="*">
            <div className="content">
              <NotFound />
            </div>
          </Route>
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
