import React, {Component} from 'react';
import '../../Containers/Offers/Offers.css';


class Offer extends Component {

constructor(props) {
    super(props);
    this.state = {   
        showlanguages: false,
        showdevices:false,
        userside:false,

        fullview:false,
        chatview:false,
        productselected:false,
        sourceselected:false,
        locationselected:false,
        languageselected:false,
        deviceselected:false,

        productdefault:'',
        sourcedefault:'',
        locationdefault:'',
        languagedefault:'',
        devicedefault:'',
        messagedefault:'',

        locationcount:this.props.StrOffers.location.length,
        usercount:this.props.StrOffers.user.length,

        offers:props.StrOffers,

        completed:false,
        date:'',

        revenue:'',
        spent:'',

        scrolldown:'',

        location:props.StrOffers.location,
        productupdate:'',

      

    } 
    this.location = props.StrOffers.location;
    this.offerid = props.StrOffers.id; 
    this.delete = this.delete.bind(this); 
    this.messagesEnd='';   
}

componentDidMount() {
    if (this.state.chatview) {
   this.scrollToBottom();
    }
    if (this.state.date==='') {
        this.setState({date:Date.now()});
    } 
  }

  componentDidUpdate() {
    if (this.state.chatview) {
  this.scrollToBottom();
    }
  }

  componentWillReceiveProps(nextProps) {
     
    if ( nextProps.messages.length!==this.props.messages.length &&
         nextProps.messages[nextProps.messages.length-1].offer===this.offerid && 
        nextProps.messages[nextProps.messages.length-1].date>this.state.date && 
        !this.state.chatview
     ) {
        this.setState({message:true});
   }
}
  
 delete(id){
     this.props.deleteoffer(id)
 }


    toggleFullView = () => {
        if (this.state.fullview) {
        this.setState({fullview:false});
    } else {
        this.setState({fullview:true});
    }
    }

    toggleChatView = () => {
        if (!this.state.chatview) {
        this.setState({chatview:true});
        this.setState({profitview:false});
        this.setState({deleteconfirmation:false});
        this.setState({message:false});
        } else {
        this.setState({chatview:false});
        this.setState({deleteconfirmation:false});
        }
    }

    setStandartView = () => {
        this.setState({profitview:false});
        this.setState({chatview:false});
    }

    clearproductdefault = () => {
        this.setState({productdefault:''});
    }

    setCompleted = (offerid) => {
        this.setState({completed:true});
        this.props.setInactive(offerid);
    }

    restoreOffer = () => {
        this.setState({completed:false});
    }

    completeOffer = (offerid, revenue, spent) => {
        this.setState({completed:false})
        this.props.Complete(offerid, revenue, spent)
    }

    sendMessage = (message, offerid) => {
        this.setState({messagedefault:''});
        this.props.sendNewMessage(message, offerid);
        this.scrollToBottom();
    }

    scrollToBottom = () => {
       this.state.scrolldown.scrollIntoView({ behavior: 'smooth' });
      }


render(props){

   let greenbutton;

   this.props.StrOffers.user.map(user => {
    if (user.id===this.props.user.email && !user.active && !user.complete) {
    return greenbutton =  <div key={user.id} className="redButtonActive" onClick={() => this.props.setActive(this.offerid)}></div> 
    }
    if (user.id===this.props.user.email && user.active && !user.complete ) {
    return greenbutton =  <div key={user.id} className="offergreenButton" onClick={() => this.setCompleted(this.offerid)}></div>  
    }
    if (user.id===this.props.user.email && user.complete) {
       return greenbutton = <div className="offerempty">
        <div key={user.id} className="profit"><a>{user.profit}</a></div> 
       </div> 
    }

});


let bluebutton; 

if (this.state.message) {
    bluebutton =  <div className="offerblueButtonMessage" onClick={this.toggleChatView}></div>
  } else bluebutton =  <div className="offerblueButton" onClick={this.toggleChatView}></div>
  
    let product;
    if (this.state.productselected && this.props.selected===this.offerid ) {
        product = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.product}</a></div>
    } else {
        product = <div className="offerItem" onClick={this.toggleFullView}><a>{this.props.StrOffers.product}</a></div>      
    }

    let source;
    if (this.state.sourceselected && this.props.selected===this.offerid) {
        source = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.source}</a></div>
    } else {
        source = <div className="offerItem" onClick={this.toggleFullView}><a>{this.props.StrOffers.source}</a></div>
    }

    let locations;
    if (this.state.locationselected && this.props.selected===this.offerid ) {
        locations = this.props.StrOffers.location.map(location => {
            return  <div><div className="listItemSelected" onClick={this.props.unselect} key={location.id}><a> {location.location}</a></div>
            <div><a onClick={this.toggleFullView} >delete </a></div></div> 
        }); 
    } else { 
        locations = this.props.StrOffers.location.map(location => {
            return  <div className="listItem" onClick={this.toggleFullView} key={location.id}><a>{location.location}</a></div> 
        });  
    }

    let location;
    if (this.state.locationselected && this.props.selected===this.offerid ) {
        location = <div className="offerItemSelected" onClick={this.props.unselect}><a className="offerItemCount"> {this.props.StrOffers.location.length} </a>
       <a> {this.props.StrOffers.location[0].location} </a></div>
    } else {
        location = <div className="offerItem" onClick={this.toggleFullView}><a className="offerItemCount"> {this.props.StrOffers.location.length} </a>
        <a> {this.props.StrOffers.location[0].location} </a></div>
    }

    let language;
    if (this.state.languageselected && this.props.selected===this.offerid) {
       language = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.language}</a></div>
    } else {
        language = <div className="offerItem" onClick={this.toggleFullView}><a>{this.props.StrOffers.language}</a></div>
    }

    let device;
    if (this.state.deviceselected && this.props.selected===this.offerid) {
       device = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.device}</a></div>
    } else {
        device = <div className="offerItem" onClick={this.toggleFullView}><a>{this.props.StrOffers.device}</a></div>
    }

    let users;
    if (this.state.userselected && this.props.selected===this.offerid ) {
        users = this.props.StrOffers.user.map(user => {
            return  <div key={user.id}><div className="listItemSelected" onClick={this.props.unselect} ><a>{user.user}</a></div>
            <div>{ user.active ? <a onClick={() => this.props.setInactive(user.id, this.offerid)} > active </a> : 
            <a onClick={() => this.props.setActive(user.id, this.offerid)} > Inactive </a> }</div>
             <div><a onClick={() => this.props.deleteUser(user.id, this.offerid)} >delete </a></div></div>  
        });
    } else { 
        users = this.props.StrOffers.user.map(user => {
            return  <div className="listItem" onClick={this.toggleFullView} key={user.id}><a>{user.user}</a>
             {user.complete ? <a className="activeUser"> Complete</a> : (user.active ? <a className="activeUser"> Active</a> : <a className="inactiveUser"> Inactive</a>)}</div> 
        });    
    }

    let user;
    if (this.state.userselected && this.props.selected===this.offerid ) {
        user = <div className="offerItemSelected" onClick={this.toggleFullView}><a className="offerItemCount"> {this.props.StrOffers.user.length} </a>
        <a> {this.props.StrOffers.user[0].user} </a></div>
    } else {
        user = <div className="offerItem" onClick={this.toggleFullView}><a className="offerItemCount"> {this.props.StrOffers.user.length} </a>
        <a> {this.props.StrOffers.user[0].user} </a> {this.props.StrOffers.user[0].complete ? <a className="activeUser"> Complete</a> : (this.props.StrOffers.user[0].active ? <a className="activeUser"> Active</a> : <a className="inactiveUser"> Inactive</a>)}</div>
    }

    let messages; 
messages = this.props.messages.map(message => {
    if (this.offerid===message.offer) {
        return  <div className="message" key={message.id}><a>{message.user} : </a>
       {message.userid===this.props.user.email ? <div className="messageContentOffer"><a> {message.message}</a></div> : 
       <div className="messageContent"><a> {message.message}</a>
        <div ref={this.state.scrolldown} /></div> }
       </div>
    }
});
    
    
    let content; 
    
    if (this.state.fullview && !this.state.completed) {
    content = <div className="offerWrap">
   {bluebutton}
    <div className="offerempty"></div>
    { greenbutton ? null : <div className="offerempty"></div> }
   {greenbutton}
    <div className="offerempty2"></div>
    {product}
    {source}
    <div className="offerItems">{locations}</div>
    {language}
    {device}
    <div className="offerItems">{users}</div> 
     </div>;
    } 
    if (!this.state.fullview && !this.state.completed) {
        content = <div className="offerWrap">
       {bluebutton}
        <div className="offerempty"></div>
        { greenbutton ? null : <div className="offerempty"></div> }
      {greenbutton}
        <div className="offerempty2"></div>
        {product}
        {source}
        {location}
        {language}
        {device}
        {user}
         </div>;
    }
    if (this.state.completed) {
    content = <div className="offerWrap">
    <div className="offerempty"></div>
    <div className="offerempty"></div>
    <div className="offerempty"></div>
    <div className="offerempty2"></div>
    <div className="offerItem">{product}</div>
    <div className='offerItem'>
    <input type="text" pattern="[0-9,.]*" className="profitInput"
        value={this.state.revenue}
        onChange={(event) => event.target.validity.valid ? this.setState({revenue: event.target.value}) : null}
        ref="revenue"  placeholder="Revenue" />
    </div>
        <div className='offerItem'>
    <input type="text" pattern="[0-9,.]*" className="profitInput"
        value={this.state.spent}
        onChange={(event) => event.target.validity.valid ? this.setState({spent: event.target.value}): null}
        ref="spent"  placeholder="Spent" />
    </div>
        <div className="profitItem"><a>Profit: {this.state.revenue - this.state.spent}</a></div>
        <div className="offerItem"><button className="completeButton" onClick={()=> this.completeOffer(this.offerid, this.state.revenue, this.state.spent) }> Complete</button></div> 
        <div className="offerItem"><button className="backButton" onClick={() => this.restoreOffer(this.offerid)}> Back</button></div>
       </div>;
    }

    if (this.state.chatview) {
        content = <div className="offerWrapChat"> 
        <div className="offerWrapSelected">
   { greenbutton ? null : <div className="offerempty"></div> }
   {bluebutton}
   <div className="offerempty"></div>
   {greenbutton}
   <div className="offerempty2"></div>
      {product}
       {source}
       {location}
       {language}
       {device}
       {user}
      </div>
      <div className="offerWrapMessages"> 
        <div className="messageWrap">{messages}
       <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.state.scrolldown = el; }}>
       </div>
       </div>
       <div className='messageInputWrap'>
   <input className="messageInput" type="text"
       value={this.state.messagedefault}
       onChange={(event) => this.setState({messagedefault: event.target.value})}
       ref="new message"  placeholder="New Message" />
   </div>
      <div className="sendButtonWrap"><button className="completeButton" onClick={() => this.sendMessage(this.state.messagedefault, this.offerid)}> Send</button></div> 
       </div>
      </div>
    }
    if (this.props.StrOffers.product==='' && this.props.StrOffers.source==='' && this.props.StrOffers.location.length===1 &&
    this.props.StrOffers.language==='' && this.props.StrOffers.device==='' && this.props.StrOffers.user.length===1) {
        return null;
    }


    return (
   <div className="offerContainer">
   {content}
   </div> 
        );
    }
}

export default Offer;
