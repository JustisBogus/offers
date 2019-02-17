import React, {Component} from 'react';
import './Header.css';
import fire from '../../Components/Firebase/Firebase';
import Logosmall from '../../Components/Logo/Logosmall';


class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }



logout() {
    fire.auth().signOut();
}


render() {
    return (
        <div className="header">
      <div className="logosmall"><Logosmall/></div>
      <div className="User"><a>{this.props.user}</a></div>
      <div className="Logout"><a onClick={this.logout}>Log out</a></div>
       </div>
    );
}
}


export default Header;