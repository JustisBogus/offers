import React, {Component} from 'react';
import '../../Containers/Offers/Offers.css';

class NewOffer extends Component {

constructor(props) {
    super(props);
    this.state = {   
        showlanguages: false,
        showdevices:false,
        userside:false,

    } 
}

render(props){

    let locations;
    locations = this.props.location.map(location => {
        return  <div key={location.id}><a onClick={() => this.props.deletenewlocation(location.id)}>{location.location}</a></div> 
    });

    let users;
    users = this.props.user.map(user => {
        return  <div key={user.id}><a onClick={() => this.props.deletenewuser(user.id)}>{user.user}</a></div> 
    });

    let errormessage;
        if (this.props.errormessage) {
            errormessage = <div className="errorMessage"><a>Can't create an empty offer</a></div>
        } else {
            errormessage = null;
        }
    

    let content; 
    content= <div className="offerWrap">
        <div className="buttonWrap"><button className="backButtonNewOffer" onClick={this.props.search}> Close</button></div>
        <div className="buttonWrap"><button className="completeButtonNewOffer" onClick={this.props.createnewoffer}> Create</button></div> 
        <div className="offerempty"></div>
    {errormessage}
    <div className="offerItems"> <a>{this.props.product} </a> </div>
    <div className="offerItems"> <a>{this.props.source} </a> </div>
    <div className="offerItems">{locations}</div>
    <div className="offerItems" > <a>{this.props.language} </a> </div>
    <div className="offerItems"><a>{this.props.device} </a> </div> 
    <div className="offerItems">{users}</div>
    </div>



    return (
   <div className="offerContainer">
   
   {content}
   </div> 
        );
    }
}

export default NewOffer;
