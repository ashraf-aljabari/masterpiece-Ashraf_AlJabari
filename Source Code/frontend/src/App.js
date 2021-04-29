import './App.css';
import React from 'react';
// react router DOM import
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Redux Imports
import { Provider } from 'react-redux';
import store from './redux/store';
// Material UI imports
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import MuiTheme from './util/theme';

// Pages imports
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ComplaintAdminPage from './pages/ComplaintAdminPage';
import UserAdminPage from './pages/UsersAdminPage';
import UserEditPage from './pages/UserEditPage';
import ComplaintPage from './pages/ComplaintPage';

// Components imports
import Navbar from './components/Navbar';

const theme = createMuiTheme(MuiTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <main className='App'>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/login' component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route path='/profile' component={ProfilePage} />
                <Route
                  path='/admin/complaints'
                  component={ComplaintAdminPage}
                />
                <Route path='/admin/users' component={UserAdminPage} />
                <Route path='/admin/user/:id/edit' component={UserEditPage} />
                <Route path='/complaint/:id' component={ComplaintPage} />
              </Switch>
            </div>
          </Router>
        </main>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
