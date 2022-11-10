import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  
  const [posts, setPosts] = useState([]);
  const [singlePost, setPost] = useState("");

  const handleSubmit = (event) =>{
    event.preventDefault();
    fetch("http://localhost:3001/posts",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: singlePost,
      })
    }).then(res=> console.log(res.status))
    setPost("")
  }
  const handleDelete = (postID) => {
    fetch("http://localhost:3001/posts",
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: postID,
       })
    }).then(res=> console.log(res.status))
  }

  function formatDate(timeStamp) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    var monthIndex = timeStamp.slice(5, 7)
    var month  = months[parseInt(monthIndex)-1];
    var year  =  timeStamp.slice(0,4)
    var date = timeStamp.slice(5,10)
    date = date.replace(/-/gi, ", ")
    date = date.replace(monthIndex, month)
    date += ", " + year;



    return date;
  }

  useEffect(() => {
    fetch("http://localhost:3001/posts")
    .then(res => res.json())
    .then(posts => setPosts(posts))
  }, [posts])
  return (
    <div className='react-app-component text-center'>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Enter your post</label>
                  <textarea className="form-control" id="post-content" rows="3" value={singlePost} onChange={(e) => setPost(e.target.value)}></textarea>
                  <div className="d-grid gap-2">
                    <button type="button" className="btn btn-primary mt-2" onClick={handleSubmit}>Post</button>
                  </div>
                </div>
              </div>
            </div>
            {posts.map((post, index) =>(
            <div className="card text-white bg-dark my-3 text-start">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{formatDate(post.createdAt)}</h6>
                <p className="card-text">{post.text}</p>
                <a href="#" className="card-link" onClick={() => handleDelete(post._id)}>Delete</a>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;