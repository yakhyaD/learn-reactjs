import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState } from "react";
import Navbar from './Navbar';
import Home from './Home';
import NewBlog from './NewBlog';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

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
          <Route path="*">
            <div className="content">
              <NotFound />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
