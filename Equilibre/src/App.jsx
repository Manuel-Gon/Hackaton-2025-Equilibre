import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Front-end/Auth/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;