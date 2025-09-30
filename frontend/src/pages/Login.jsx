// // src/pages/Login.js
// import React, { useState } from 'react';
// import api from '../api'; // make sure this points to your api.js
// import '../App.css'; // Import the CSS file

// const Login = ({ setUserInfo }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Attempt login with JWT
//       const response = await api.post('/auth/token/', {
//         username,
//         password,
//       });

//       // Save tokens in localStorage
//       localStorage.setItem('access', response.data.access);
//       localStorage.setItem('refresh', response.data.refresh);

//       // Fetch current user info
//       const userInfoResponse = await api.get('/pacs/me/');
//       setUserInfo(userInfoResponse.data);

//       // Optionally redirect user based on role
//       const redirectPath = userInfoResponse.data.redirect_to || '/';
//       window.location.href = redirectPath;

//     } catch (err) {
//       console.error('Login error:', err);
//       if (err.response) {
//         setError(err.response.data.detail || 'Login failed');
//       } else if (err.request) {
//         setError('No response from server. Is the Django server running?');
//       } else {
//         setError('Login request failed: ' + err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import api from '../api';
import '../App.css'; // We'll create this CSS file

const Login = ({ setUserInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Attempt login with JWT
      const response = await api.post('/auth/token/', {
        username,
        password,
      });

      // Save tokens in localStorage
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      // Fetch current user info
      const userInfoResponse = await api.get('/pacs/me/');
      setUserInfo(userInfoResponse.data);

      // Optionally redirect user based on role
      const redirectPath = userInfoResponse.data.redirect_to || '/';
      window.location.href = redirectPath;

    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.detail || 'Login failed');
      } else if (err.request) {
        setError('No response from server. Is the Django server running?');
      } else {
        setError('Login request failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <i className="fas fa-heartbeat"></i>
            <span>Synpacs</span>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to access your medical imaging dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Need help? Contact support at support@synpacs.com</p>
          <button onClick={() => window.location.href = '/'} className="back-to-home"> Back to Homepage </button>
        </div>
        
      </div>
    </div>
  );
};

export default Login;