import React, { Component } from 'react'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Form from './components/form/formContainer'
import SecondComponent from './components/secondComponent/secondComponentContainer'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='App'>
            <Form />
            <SecondComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
