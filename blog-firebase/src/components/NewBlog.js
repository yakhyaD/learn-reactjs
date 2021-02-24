import { useState } from "react";
import { useHistory } from "react-router-dom";

const NewBlog = ({onAdd}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const blog = {title, body, author}
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/blogs', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(blog)
        }).then(() => history.push('/'))
          .catch(err => console.error(err.message))
    }
    
    return (
        <form className="form" onSubmit={onSubmit} >
            <div className="form-group">
                <label>Tilte:</label>
                <input
                    required
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Details:</label>
                <textarea
                    required
                    rows="5"
                    name="body"
                    type="text" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Author:</label>
                <select required name="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option>mario</option>
                    <option>Isayama</option>
                </select>
            </div>
            <input className="btn" type="submit" value="Create Blog" />
        </form>
    )
}

export default NewBlog