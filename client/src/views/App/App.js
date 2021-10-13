import './App.scss';
import Landing from '../../components/layout/Landing';
import Dashboard from '../Dashboard';
import Auth from '../Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContextProvider from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/routing/ProtectedRoute';
import About from '../About';
import PostContextProvider from '../../contexts/PostContext';

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/about" component={About} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
