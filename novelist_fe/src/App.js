import './App.css';
import AuthProvider from './context/AuthProvider';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className="App font-sans">
      <AuthProvider>
        <AppRoute/>
      </AuthProvider>
    </div>
  );
}



export default App;
