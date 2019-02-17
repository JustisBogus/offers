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
        fullviewclicked:false,
        profitview:false,
        chatview:false,
        productselected:false,
        sourceselected:false,
        locationselected:false,
        languageselected:false,
        deviceselected:false,
        userselected:false,

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
        revenue:'',
        spent:'',

        scrolldown:'',
        date:'',

        deleteconfirmation:false,

        message:false,
        
        location:props.StrOffers.location,
        productupdate:'',
      
    } 
    this.location = props.StrOffers.location;
    this.offerid = props.StrOffers.id; 
    this.delete = this.delete.bind(this);    
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
        this.setState({fullviewclicked:false});
        this.setState({deleteconfirmation:false});
    } else {
        this.setState({fullview:true});
        this.setState({fullviewclicked:true});
        this.setState({deleteconfirmation:false});
    }
    }

    toggleProduct = (offerid) => {    
        this.setState({productselected:true});
        this.setState({sourceselected:false});
        this.setState({locationselected:false});
        this.setState({languageselected:false});
        this.setState({deviceselected:false});
        this.setState({userselected:false});
        this.props.selectedOffer(offerid); 
    }

    toggleSource = (offerid) => {
        this.setState({productselected:false});
        this.setState({sourceselected:true});
        this.setState({locationselected:false});
        this.setState({languageselected:false});
        this.setState({deviceselected:false});
        this.setState({userselected:false});   
        this.props.selectedOffer(offerid); 
    }

    toggleLocation = (offerid) => {
        this.setState({productselected:false});
        this.setState({sourceselected:false});
        this.setState({locationselected:true});
        this.setState({languageselected:false});
        this.setState({deviceselected:false});
        this.setState({userselected:false});   
        this.props.selectedOffer(offerid);
    }

    toggleLanguage = (offerid) => {
        this.setState({productselected:false});
        this.setState({sourceselected:false});
        this.setState({locationselected:false});
        this.setState({languageselected:true});
        this.setState({deviceselected:false});
        this.setState({userselected:false});   
        this.props.selectedOffer(offerid);
    }

    toggleDevice = (offerid) => {
        this.setState({productselected:false});
        this.setState({sourceselected:false});
        this.setState({locationselected:false});
        this.setState({languageselected:false});
        this.setState({deviceselected:true});
        this.setState({userselected:false});   
        this.props.selectedOffer(offerid);
    }

    toggleUser = (offerid) => {
        this.setState({productselected:false});
        this.setState({sourceselected:false});
        this.setState({locationselected:false});
        this.setState({languageselected:false});
        this.setState({deviceselected:false});
        this.setState({userselected:true});   
        this.props.selectedOffer(offerid);
        this.setState({fullview:true});
    }

    unselectUser = () => {
        this.props.unselect();
        if (!this.state.fullviewclicked) {
        this.setState({fullview:false});
        }
       
    }

    clearproductdefault = () => {
        this.setState({productdefault:''});
    }

    setInactive = (userid, offerid) => {
        if (userid === this.props.user.email) {
            this.setState({completed:true});
            this.setState({productselected:false});
            this.setState({sourceselected:false});
            this.setState({locationselected:false});
            this.setState({languageselected:false});
            this.setState({deviceselected:false});
            this.setState({userselected:false});
            this.props.setInactive(userid, offerid);
        } else {
        this.props.setInactive(userid, offerid);
        }
    }

    restoreOffer = () => {
        this.setState({completed:false});
    }

    completeOffer = (offerid, revenue, spent) => {
        this.setState({completed:false})
        this.props.Complete(offerid, revenue, spent)
    }

    toggleProfitView = () => {
        this.setState({profitview:true});
        this.setState({chatview:false});
        this.setState({deleteconfirmation:false});
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
        this.setState({deleteconfirmation:false});
    }

    saveProductUpdate = (offerid, productdefault) => {
        this.setState({productdefault:''});
        this.props.saveProduct(offerid, productdefault);
    }

    updateOfferProduct = (productid, productdefault, offerid) => {
        this.setState({productdefault:''});
        this.props.updateProduct(productid, productdefault,offerid) 
    }

    saveSourceUpdate = (offerid, sourcedefault) => {
        this.setState({sourcedefault:''});
        this.props.saveSource(offerid, sourcedefault);
    }

    updateOfferSource = (sourceid, sourcedefault, offerid) => {
        this.setState({sourcedefault:''});
        this.props.updateSource(sourceid, sourcedefault, offerid );
    }

    saveLocationUpdate = (offerid, locationdefault) => {
        this.setState({locationdefault:''});
        this.props.saveLocation(offerid, locationdefault);
    }

    updateOfferLocation = (locationid, locationdefault, offerid) => {
        this.setState({locationdefault:''});
        this.props.updateLocation(locationid, locationdefault, offerid);
    }

    saveLanguageUpdate = (offerid, languagedefault) => {
        this.setState({languagedefault:''});
        this.props.saveLanguage(offerid, languagedefault);
    }

    updateOfferLanguage = (languageid, languagedefault, offerid) => {
        this.setState({languagedefault:''});
        this.props.updateLanguage(languageid, languagedefault, offerid);
    }

    saveDeviceUpdate = (offerid, devicedefault) => {
        this.setState({devicedefault:''});
        this.props.saveDevice(offerid, devicedefault);
    }

    updateOfferDevice = (deviceid, devicedefault, offerid) => {
        this.setState({devicedefault:''});
        this.props.updateDevice(deviceid, devicedefault, offerid);   
    }

    sendMessage = (message, offerid) => {
        this.setState({messagedefault:''});
        this.props.sendNewMessage(message, offerid);
    }

    scrollToBottom = () => {
        this.state.scrolldown.scrollIntoView({ behavior: 'smooth' });
       }

    setDelete = () => {
        this.setState({deleteconfirmation:true});
    }


render(props){

    let profit;

    profit =  this.props.StrOffers.user.map(user => {
    if (user.id===this.props.user.email && user.complete) {
       return <div className="profit" key={user.id}><a>{user.profit}</a></div>
    } else { 
        return null;
    }
});

    let bluebutton; 

    if (this.state.message) {
      bluebutton =  <div className="offerblueButtonMessage" onClick={this.toggleChatView}></div>
    } else bluebutton =  <div className="offerblueButton" onClick={this.toggleChatView}></div>

    let deletebutton; 
    if (this.state.deleteconfirmation) {
     deletebutton = <div className="deletedButton" onClick={() => this.delete(this.offerid)}></div>
    } else {
     deletebutton = <div className="offerredButton" onClick={() => this.setDelete(this.offerid)}></div>
    }

    let product;
    if (this.state.productselected && this.props.selected===this.offerid ) {
        product = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.product}</a></div>
    } else {
        product = <div className="offerItem" onClick={() => this.toggleProduct(this.offerid)}><a>{this.props.StrOffers.product}</a></div>      
    }

    let source;
    if (this.state.sourceselected && this.props.selected===this.offerid) {
        source = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.source}</a></div>
    } else {
        source = <div className="offerItem" onClick={() => this.toggleSource(this.offerid)}><a>{this.props.StrOffers.source}</a></div>
    }

    let locations;
    if (this.state.locationselected && this.props.selected===this.offerid ) {
        locations = this.props.StrOffers.location.map(location => {
            return  <div key={location.id}><div className="listItemSelected" onClick={this.props.unselect} ><a> {location.location}</a></div>
            <div>{this.props.StrOffers.location.length>1 ? <a className="deleteButton" onClick={() => this.props.deleteLocation(location.id, this.offerid)} >delete </a> : null}</div></div> 
        }); 
    } else { 
        locations = this.props.StrOffers.location.map(location => {
            return  <div className="listItem" onClick={() => this.toggleLocation(this.offerid)} key={location.id}><a>{location.location}</a></div> 
        });
    }

    let location;
    if (this.state.locationselected && this.props.selected===this.offerid ) {
        location = <div className="offerItemSelected" onClick={this.props.unselect}><a className="offerItemCount"> {this.props.StrOffers.location.length} </a>
       <a> {this.props.StrOffers.location[0].location} </a></div>
    } else {
        location = <div className="offerItem" onClick={() => this.toggleLocation(this.offerid)}><a className="offerItemCount"> {this.props.StrOffers.location.length} </a>
        <a> {this.props.StrOffers.location[0].location} </a></div>
    }

    let language;
    if (this.state.languageselected && this.props.selected===this.offerid) {
       language = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.language}</a></div>
    } else {
        language = <div className="offerItem" onClick={() => this.toggleLanguage(this.offerid)}><a>{this.props.StrOffers.language}</a></div>
    }

    let device;
    if (this.state.deviceselected && this.props.selected===this.offerid) {
       device = <div className="offerItemSelected" onClick={this.props.unselect}><a>{this.props.StrOffers.device}</a></div>
    } else {
        device = <div className="offerItem" onClick={() => this.toggleDevice(this.offerid)}><a>{this.props.StrOffers.device}</a></div>
    }

    let users;

    users = this.props.StrOffers.user.map(user => {
        if (this.state.userselected && this.props.selected===this.offerid ) {
            return <div key={user.id}><div className="listItemSelected" ><a onClick={this.unselectUser}>{user.user}</a>
            {user.complete ? <a className="activeUser"> Complete</a> : (user.active ? <a className="activeUser" onClick={() => this.setInactive(user.id, this.offerid)} > Active</a> : 
            <a onClick={() => this.props.setActive(user.id, this.offerid)} className="inactiveUser"> Inactive</a>)}
            </div>
             <div>{ this.props.StrOffers.user.length>1 ? <a className="deleteButton" onClick={() => this.props.deleteUser(user.id, this.offerid)} >delete </a> : null}</div></div> 
        } else {
            return  <div className="listItem"  key={user.id}><a onClick={() => this.toggleUser(this.offerid)}>{user.user}</a>
            {user.complete ? <a className="activeUser"> Complete</a> : (user.active ? <a className="activeUser" onClick={() => this.setInactive(user.id, this.offerid)} > Active</a> : 
            <a onClick={() => this.props.setActive(user.id, this.offerid)} className="inactiveUser"> Inactive</a>)}
            </div> 
        }
    });

    let user;
    if (this.state.userselected && this.props.selected===this.offerid ) {
        user = <div className="offerItemSelected" onClick={this.props.unselect}><a className="offerItemCount"> {this.props.StrOffers.user.length} </a>
        <a> {this.props.StrOffers.user[0].user} </a></div>
    } else {
        user = <div className="offerItem" ><a className="offerItemCount"> {this.props.StrOffers.user.length} </a>
        <a onClick={() => this.toggleUser(this.offerid)}> {this.props.StrOffers.user[0].user} </a> {this.props.StrOffers.user[0].complete ? <a className="activeUser"> Complete</a> : (this.props.StrOffers.user[0].active ? 
        <a className="activeUser" onClick={() => this.setInactive(this.props.StrOffers.user[0].id, this.offerid)} > Active</a> : 
        <a className="inactiveUser" onClick={() => this.props.setActive(this.props.StrOffers.user[0].id, this.offerid)}> Inactive</a>)}</div>
    }

    let productupdate; 
    if (this.state.productdefault==='') {
    productupdate = this.props.products.map(product => {
    return  <div className="newOfferItem" onClick={() => this.updateOfferProduct(product.id, this.state.productdefault, this.offerid)  } key={product.id}><a>{product.product}</a></div>          
 }); 
 } else {
    productupdate = this.props.products.map(product => {
     return  <div className="newOfferItemSave" onClick={() => this.updateOfferProduct(product.id, this.state.productdefault, this.offerid) } key={product.id}><a>{product.product}</a></div>
 });           
 }

   let sourceupdate; 
   if (this.state.sourcedefault==='') {
   sourceupdate = this.props.sources.map(source => {
   return  <div className="newOfferItem" onClick={() => this.updateOfferSource(source.id, this.state.sourcedefault, this.offerid )} key={source.id}><a>{source.source}</a></div>          
}); 
} else {
    sourceupdate = this.props.sources.map(source => {
    return  <div className="newOfferItemSave" onClick={() => this.updateOfferSource(source.id, this.state.sourcedefault, this.offerid)} key={source.id}><a>{source.source}</a></div>
});           
}

let locationupdate; 
if (this.state.locationdefault==='') {
locationupdate = this.props.locations.map(location => {
return  <div className="newOfferItem" onClick={() => this.updateOfferLocation(location.id, this.state.locationdefault, this.offerid)} key={location.id}><a>{location.location}</a></div>          
}); 
} else {
locationupdate = this.props.locations.map(location => {
 return  <div className="newOfferItemSave" onClick={() => this.updateOfferLocation(location.id, this.state.locationdefault, this.offerid)} key={location.id}><a>{location.location}</a></div>
});           
}

let languageupdate; 
if (this.state.languagedefault==='') {
languageupdate = this.props.languages.map(language => {
return  <div className="newOfferItem" onClick={() => this.updateOfferLanguage(language.id, this.state.languagedefault, this.offerid)} key={language.id}><a>{language.language}</a></div>          
}); 
} else {
languageupdate = this.props.languages.map(language => {
 return  <div className="newOfferItemSave" onClick={() => this.updateOfferLanguage(language.id, this.state.languagedefault, this.offerid)} key={language.id}><a>{language.language}</a></div>
});    
} 

let deviceupdate; 
if (this.state.devicedefault==='') {
deviceupdate = this.props.devices.map(device => {
return  <div className="newOfferItem" onClick={() => this.updateOfferDevice(device.id, this.state.devicedefault, this.offerid)} key={device.id}><a>{device.device}</a></div>          
}); 
} else {
deviceupdate = this.props.devices.map(device => {
 return  <div className="newOfferItemSave" onClick={() => this.updateOfferDevice(device.id, this.state.devicedefault, this.offerid)} key={device.id}><a>{device.device}</a></div>
});  
}

let userlist;
userlist = this.props.users.map(user => {
    return  <div className="OfferItemUpdateUser" onClick={() => this.props.updateUser(user.id, this.offerid)} key={user.id}><a>{user.name}</a></div> 
});

let profits;

  profits = this.props.StrOffers.user.map(user => {
        return <div className="offerProfit" key={user.id}><a>{user.user} :</a>
        {user.complete ? <div className="offerProfitWrap"> <a>Revenue: {user.revenue} </a>
        <a>Spent: {user.spent} </a> 
          <a>Profit: {user.profit.toFixed(2)} </a> </div> : null} 
        </div> 
    });

let messages; 
messages = this.props.messages.map(message => {
    if (this.offerid===message.offer) {
        return  <div className="message" key={message.id}><a>{message.user} : </a>
       {message.userid===this.props.user.email ? <div className="messageContentOffer"><a> {message.message}</a></div> : 
       <div className="messageContent"><a> {message.message}</a></div> }
       </div>
    }
});



    let update;

    if (this.state.productselected  && this.props.selected==this.offerid )
{
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               <span className="offers100-form-title p-b-48">
               <i className="zmdi zmdi-font"></i></span>
               <div className="inputWrap">
               <div className="wrap-offersinputupdate100 validate-input" >
                       <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                       <input onClick={this.setSelect} className="offersinput100" type="text" 
                       value={this.state.productdefault}
                       onChange={(event) => this.setState({productdefault: event.target.value})}
                       ref="product"  placeholder="Product" />
                       <span className="focus-offersinput100" ></span>
               </div>
               <div className="newOfferItemAdd" onClick={() => this.saveProductUpdate(this.offerid, this.state.productdefault)}><a>Add</a></div>
               {productupdate}
               </div>
               <div></div>         
                </form>    
           </div>  
       </div>
}    if (this.state.sourceselected && this.props.selected==this.offerid ) {
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               <span className="offers100-form-title p-b-48">
               <i className="zmdi zmdi-font"></i></span>
               <div className="inputWrap">
               <div className="wrap-offersinputupdate100 validate-input" >
                       <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                       <input onClick={this.setSelect} className="offersinput100" type="text" 
                       value={this.state.sourcedefault}
                       onChange={(event) => this.setState({sourcedefault: event.target.value})}
                       ref="source"  placeholder="Source" />
                       <span className="focus-offersinput100" ></span>
               </div>
               <div className="newOfferItemAdd" onClick={() => this.saveSourceUpdate(this.offerid, this.state.sourcedefault)}><a>Add</a></div>
               {sourceupdate}
               </div>
               <div></div>         
                </form>    
           </div>  
       </div>
}    if (this.state.locationselected && this.props.selected==this.offerid ) {
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               <span className="offers100-form-title p-b-48">
               <i className="zmdi zmdi-font"></i></span>
               <div className="inputWrap">
               <div className="wrap-offersinputupdate100 validate-input" >
                       <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                       <input onClick={this.setSelect} className="offersinput100" type="text" 
                       value={this.state.locationdefault}
                       onChange={(event) => this.setState({locationdefault: event.target.value})}
                       ref="location"  placeholder="Location" />
                       <span className="focus-offersinput100" ></span>
               </div>
               <div className="newOfferItemAdd" onClick={() => this.saveLocationUpdate(this.offerid, this.state.locationdefault)}><a>Add</a></div>
               {locationupdate}
               </div>
               <div></div>         
                </form>    
           </div>  
       </div>
}  if (this.state.languageselected && this.props.selected==this.offerid ) {
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               <span className="offers100-form-title p-b-48">
               <i className="zmdi zmdi-font"></i></span>
               <div className="inputWrap">
               <div className="wrap-offersinputupdate100 validate-input" >
                       <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                       <input onClick={this.setSelect} className="offersinput100" type="text" 
                       value={this.state.languagedefault}
                       onChange={(event) => this.setState({languagedefault: event.target.value})}
                       ref="language"  placeholder="Language" />
                       <span className="focus-offersinput100" ></span>
               </div>
               <div className="newOfferItemAdd" onClick={() => this.saveLanguageUpdate(this.offerid, this.state.languagedefault)}><a>Add</a></div>
               {languageupdate}
               </div>
               <div></div>         
                </form>    
           </div>  
       </div>
}   if (this.state.deviceselected && this.props.selected==this.offerid ) {
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               <span className="offers100-form-title p-b-48">
               <i className="zmdi zmdi-font"></i></span>
               <div className="inputWrap">
               <div className="wrap-offersinputupdate100 validate-input" >
                       <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                       <input onClick={this.setSelect} className="offersinput100" type="text" 
                       value={this.state.devicedefault}
                       onChange={(event) => this.setState({devicedefault: event.target.value})}
                       ref="device"  placeholder="Device" />
                       <span className="focus-offersinput100" ></span>
               </div>
               <div className="newOfferItemAdd" onClick={() => this.saveDeviceUpdate(this.offerid, this.state.devicedefault)}><a>Add</a></div>
               {deviceupdate}
               </div>
               <div></div>         
                </form>    
           </div>  
       </div>
}   if (this.state.userselected && this.props.selected==this.offerid ) {
    update = <div className="container-offersupdate100">
    <div className="wrap-offersupdate100">
    <form className="offers100-form validate-form" onSubmit={this.onSubmit}>                
               {userlist} 
                </form>    
           </div>  
       </div>
}   
   

     
    let content; 

    if (this.state.fullview && !this.state.profitview && !this.state.completed) {
    content= <div className="offerWrap">
    {profit}
   {deletebutton}
    <div className="offerempty"></div>
    <div className="offerblackButton" onClick={this.toggleProfitView}></div>
    {bluebutton}
    <div className="offerempty"></div>
    <div className="offergreenButton" onClick={this.toggleFullView}></div>
    <div className="offerempty2"></div>
    {product}
    {source}
    <div className="offerItems">{locations}</div>
    {language}
    {device}
    <div className="offerItems">{users}</div> 
     </div>;
    } 
    if (this.state.fullview && !this.state.profitview && !this.state.completed && this.props.selected===this.offerid &&
        (this.state.productselected || this.state.sourceselected || this.state.locationselected || 
            this.state.languageselected || this.state.deviceselected || this.state.userselected )) {
        content= <div className="offerWrapSelected">
        {profit}
       {deletebutton}
        <div className="offerempty"></div>
        <div className="offerblackButton" onClick={this.toggleProfitView}></div>
        {bluebutton}
        <div className="offerempty"></div>
        <div className="offergreenButton" onClick={this.toggleFullView}></div>
        <div className="offerempty2"></div>
        {product}
        {source}
        <div className="offerItems">{locations}</div>
        {language}
        {device}
        <div className="offerItems">{users}</div> 
         </div>;
        } 
    if (!this.state.fullview && !this.state.profitview && !this.state.completed) {
        content = <div className="offerWrap">
        {profit}
        {deletebutton}
        <div className="offerempty"></div>
        <div className="offerblackButton" onClick={this.toggleProfitView}></div>
       {bluebutton}
        <div className="offerempty"></div>
        <div className="offergreenButton" onClick={this.toggleFullView}></div>
        <div className="offerempty2"></div>
        {product}
        {source}
        {location}
        {language}
        {device}
        {user}
         </div>;
    } 
    if (!this.state.fullview && !this.state.profitview && !this.state.completed && this.props.selected===this.offerid && 
        (this.state.productselected || this.state.sourceselected || this.state.locationselected || 
            this.state.languageselected || this.state.deviceselected || this.state.userselected )) {
        content = <div className="offerWrapSelected">
        {profit}
        {deletebutton}
        <div className="offerempty"></div>
        <div className="offerblackButton" onClick={this.toggleProfitView}></div>
       {bluebutton}
        <div className="offerempty"></div>
        <div className="offergreenButton" onClick={this.toggleFullView}></div>
        <div className="offerempty2"></div>
        {product}
        {source}
        {location}
        {language}
        {device}
        {user}
         </div>;
    } 
    if (this.state.completed && !this.state.profitview) {
        content = <div className="offerWrap">
    <div className="offerempty"></div>
    <div className="offeremptyItem"></div>
    <div className="offerItem">{product}</div>
    <div className='offerItem'>
    <input type="text" pattern="[0-9,.]*" className="profitInput" type="text"
        value={this.state.revenue}
        onChange={(event) => event.target.validity.valid ? this.setState({revenue: event.target.value}) : null}
        ref="source"  placeholder="Revenue" />
    </div>
        <div className='offerItem'>
    <input type="text" pattern="[0-9,.]*" className="profitInput" type="text"
        value={this.state.spent}
        onChange={(event) => event.target.validity.valid ? this.setState({spent: event.target.value}): null}
        ref="source"  placeholder="Spent" />
    </div>
        <div className="profitItem"><a>Profit: {this.state.revenue - this.state.spent}</a></div>
        <div className="offerItem"><button className="completeButton" onClick={()=> this.completeOffer(this.offerid, this.state.revenue, this.state.spent) }> Complete</button></div> 
        <div className="offerItem"><button className="backButton" onClick={() => this.restoreOffer(this.offerid)}> Back</button></div>
       </div>;
    }
    if (this.state.profitview) {
       content = <div className="offerWrapChat">
      <div className="offerWrapSelected">
        {profit}
        {deletebutton}
        <div className="offerempty"></div>
        <div className="offerblackButton" onClick={this.setStandartView}></div>
        {bluebutton}
        <div className="offerempty"></div>
        <div className="offergreenButton" onClick={this.setStandartView}></div>
        <div className="offerempty2"></div>
        {product}
        {source}
        {location}
        {language}
        {device}
        {user}
         </div>
         <div className="offerWrapMessages"> 
       <div className="profitWrap">{profits}
      </div>
      </div>
     </div>
    }

    if (this.state.chatview) {
        content = <div className="offerWrapChat"> 
         <div className="offerWrapSelected">
         {deletebutton}
    <div className="offerempty"></div>
    <div className="offerblackButton" onClick={this.toggleProfitView}></div>
    {bluebutton}
    <div className="offerempty"></div>
    <div className="offergreenButton" onClick={this.setStandartView}></div>
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
   {update}
   </div> 
        );
    }
}

export default Offer;
