import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { RecipeProvider } from './context/RecipeContext';
import { AppRoutes } from './routes';
import './App.css';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-4 lg:p-8 lg:ml-64">
              <div className="max-w-7xl mx-auto">
                <AppRoutes />
              </div>
            </main>
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;