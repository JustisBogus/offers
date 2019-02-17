import React, { Component } from 'react';
import fire from '../../Components/Firebase/Firebase';
import './Login.css';
import Logo from '../../Components/Logo/Logo';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email:'',
            password:'',
            name:'',
            isbdm:false,
            signup:false,
            passwordcount:'',
            inputclass:'wrap-input100 validate-input',
            countcolor:{color:"#ed680f"}
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {   
            if(error) {
                this.setState({inputclass:'wrap-inputerror100'});
            }
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error) => {
            console.log(error);
            if(error) {
                this.setState({inputclass:'wrap-inputerror100'});
            }
        });
 
        let newUser = {
            id: '',
            email: this.state.email.toLowerCase(),
            name: this.state.name,
            isbdm: this.state.isbdm
         }
    
         fire.database().ref('users').push(newUser);

         let products = {
             id: '',
             name: this.state.name,
             product: 'empty'
         }
        let sources = {
             id: '',
             name: this.state.name,
             source: 'empty'
        }
        let locations = {
            id: '',
            name: this.state.name,
            location: 'empty'
        }
        let languages = {
            id: '',
            name: this.state.name,
            language: 'empty'
        }
        let devices = {
            id:'',
            name: this.state.name,
            device: 'empty'
        }
      
         if (this.state.isbdm) {
         for(var i=0; i< 12; i++ ) {
            fire.database().ref('products').push(products);
         }
         for(var i=0; i< 12; i++ ) {
            fire.database().ref('sources').push(sources);
         }
         for(var i=0; i< 12; i++ ) {
            fire.database().ref('locations').push(locations);
         }
         for(var i=0; i< 12; i++ ) {
            fire.database().ref('languages').push(languages);
         }
         for(var i=0; i< 12; i++ ) {
            fire.database().ref('devices').push(devices);
         }
        }
    }
 
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        var input = e.target.value;
        var name = e.target.name;
        if (name==='password') {
        this.setState({passwordcount:input.length});
          if (this.state.passwordcount < 5) {
           this.setState({countcolor:{color:"#ed680f"}});
      } else {
           this.setState({countcolor:{color:"#00989b"}});
        }

        }
        

    }

    toggleBDM = (e) => {
        if (this.state.isbdm) {
            this.setState({isbdm: false})
        } else {
            this.setState({isbdm:true});
        }

    }

    toggleSignup = (e) => {
        if(this.state.signup) {
            this.setState({signup:false})
            this.setState({passwordcount:''});
            this.setState({inputclass:'wrap-input100 validate-input'});
        } else {
            this.setState({signup:true});
            this.setState({passwordcount:''});
            this.setState({inputclass:'wrap-input100 validate-input'});
        }


    }

    render() {

        if (this.state.signup) {
            return (
                <div className="limiter" >
                <div className="container-login100">
                    <div className="wrap-login100">
                    <Logo/>
                <form className="login100-form validate-form">
                <div onClick={this.toggleBDM} >
                   <label className="container">
                   <span className="txt2"></span>  
                    {!this.state.isbdm ? <a >Media Buyer</a> : <a>BDM</a> }
                     </label>
                     </div>
                <span className="login100-form-title p-b-26"></span>
                <span className="login100-form-title p-b-48">
                <i class="zmdi zmdi-font"></i></span>
                    <div className={this.state.inputclass}>
                        <input placeholder="email" onChange={this.handleChange} type="email" name="email"
                        className="input100" id="InputEmail" aria-describeby="emailHelp" />
                        <span class="focus-input100"></span>
                    </div>
                    <div className={this.state.inputclass} data-validate="Enter password">
                        <span class="btn-show-pass"> <i class="smdi smdi-eye"></i></span>
                        <input placeholder="password" onChange={this.handleChange} type="password" name="password"
                         className="input100" id="InputPassword" />
                        <span className="focus-input100" ></span>
                        <div className="passwordCount"><a style={this.state.countcolor}>{this.state.passwordcount}</a></div>
                    </div>
                    <div className={this.state.inputclass}>
                        <span class="btn-show-pass"> <i class="smdi smdi-eye"></i></span>
                         <input placeholder="name" onChange={this.handleChange} type="text" name="name"
                         className="input100" id="InputName" />
                         <span className="focus-input100" ></span>
                    </div>
                   
                       <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button type="submit" onClick={this.signup} className="login100-form-btn">Sign up</button>
                    </div> 
                    </div>

                    <div className="txt-center p-t-115">
                        <span className="txt1">
                           
                        </span>
                   
                        <a className="txt2" onClick={this.toggleSignup} value={this.state.signup} >Login</a>
            
                    </div>
                </form> 
                    </div>
                </div>
            </div>
            )
        }

        return (
            <div className="limiter" >
                <div className="container-login100">
                    <div className="wrap-login100">
                    <Logo/>
                <form className="login100-form validate-form">
                <span className="login100-form-title p-b-26"></span>
                <span className="login100-form-title p-b-48">
                <i class="zmdi zmdi-font"></i></span>
                    <div className={this.state.inputclass}>
                        <input placeholder="email" onChange={this.handleChange} type="email" name="email"
                        className="input100" id="InputEmail" aria-describeby="emailHelp" />
                        <span class="focus-input100"></span>
                    </div>
                    <div className={this.state.inputclass} data-validate="Enter password">
                        <span class="btn-show-pass"> <i class="smdi smdi-eye"></i></span>
                        <input placeholder="password" onChange={this.handleChange} type="password" name="password"
                         className="input100" id="InputPassword" />
                         <div className="passwordCount"><a style={this.state.countcolor}>{this.state.passwordcount}</a></div>
                        <span className="focus-input100" ></span>
                    </div>
                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button type="submit" onClick={this.login} className="login100-form-btn">Login</button>
                    </div> 
                    
                    </div>

                    <div className="txt-center p-t-115">
                        <span className="txt1">
                          
                        </span>

                        <a className="txt2" onClick={this.toggleSignup} value={this.state.signup} >Sign Up</a>

                    </div>
                </form> 
                    </div>
                </div>
            </div>
        );
    }

}
export default Login;
