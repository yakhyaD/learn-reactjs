import { useParams, useHistory } from "react-router-dom";
import useFetch from './useFetch'

const BlogDetails = () => {
    const { id } = useParams()
    const history = useHistory()
    const {data: blog, isPending, error } = useFetch(`http://localhost:5000/blogs/${id}`)

    const deleteBlog = (e) => {
        e.preventDefault()
        fetch(`http://localhost:5000/blogs/${id}`, {
            method: 'DELETE'
        }).then(() => history.push('/'))
          .catch((err) => console.error(err.message));
    }

    return (
        <div className="blog-details">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <span>{blog.author}</span>
                    <p>{blog.body}</p>
                    <form className="blog-delete" onSubmit={deleteBlog}>
                        <input className="btn" type="submit" value="Delete"/>
                    </form>
                </article>
            ) }
        </div>
    )
}
export default BlogDetails