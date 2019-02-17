import React, { Component } from 'react';
import './App.css';
import Offers from './Containers/Offers/Offers';
import fire from './Components/Firebase/Firebase';
import Login from './Containers/Login/Login';
import Spinner from './Components/Spinner/Spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{

      },
      loading:true,
    }
  }

componentDidMount() {
  this.authListener();
  document.body.style.background = "#f2f2f2";
  document.body.style.minWidth = "1148px";
  document.body.style.paddingRight ="15px";
  document.title = "YNOT-Media"
}

authListener() {
fire.auth().onAuthStateChanged((user) => {
  if (user) {
    this.setState({user});
    this.setState({loading: false});
  } else {
    this.setState({user: null});
    this.setState({loading: false});
  }
});
}

  render() {

    if (this.state.loading) {
      return (
     <Spinner/>
      )}
    

    return (
      <div className="App">

    { this.state.user ? (<Offers email={this.state.user.email}/>) : (<Login/>) } 
     </div> 
    );
  }
}

export default App;
