document.getElementById('commentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const commentText = document.getElementById('commentText').value;
  
  try {
    // Send comment to the backend
    const response = await axios.post('/api/comments', { text: commentText });
    
    // Display success message to the user
    if (response.status === 201) {
      alert('Comment submitted for approval');
      loadUserComments();
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
});

const loadUserComments = async () => {
  try {
    // Fetch user's comments from the backend
    const response = await axios.get('/api/comments');
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    
    response.data.forEach(comment => {
      const listItem = document.createElement('li');
      listItem.textContent = comment.text;
      commentsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading comments:', error);
  }
};

// Initial loading of user comments
loadUserComments();
