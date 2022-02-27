import './App.css';
import TemplateProvider from './context/TemplateProvider';
import AuthProvider from './context/AuthProvider';
import Messenger from './components/Messenger';
import UserProvider from './context/UserProvider';

function App() {
  return (
    <TemplateProvider>
      <UserProvider>
        <AuthProvider>
          <Messenger />
        </AuthProvider>
      </UserProvider>
    </TemplateProvider>
  );
}

export default App;
