import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // Fetch user profile
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(tokenResponse);
          setUserProfile(data);
        })
        .catch((err) => {
          console.error('Error fetching user profile:', err);
        });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !userProfile) return;

    setLoading(true);
    setResponse('');

    try {
      const systemPrompt = `My name is ${userProfile.name}.`;
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: question,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI');
      }

      const data = await response.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, there was an error processing your question.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserProfile(null);
    setQuestion('');
    setResponse('');
  };

  return (
    <div className="App">
      <div className="chat-container">
        {!userProfile ? (
          <div className="login-section">
            <h1>Chat App</h1>
            <p>Please sign in with Google to continue</p>
            <button onClick={login} className="login-button">
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="chat-section">
            <div className="user-info">
              <img
                src={userProfile.picture}
                alt={userProfile.name}
                className="profile-picture"
              />
              <div className="user-details">
                <h2>{userProfile.name}</h2>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            </div>

            <div className="chat-area">
              <form onSubmit={handleSubmit} className="question-form">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="question-input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="submit-button"
                >
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </form>

              {response && (
                <div className="response-area">
                  <h3>Response:</h3>
                  <div className="response-text">{response}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
