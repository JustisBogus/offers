import React, {Component} from 'react';
import './Offers.css';
import Offer from '../../Components/Offer/Offer';
import OfferMediaBuyer from '../../Components/Offer/OfferMediaBuyer';
import fire from '../../Components/Firebase/Firebase';
import Header from '../../Navigation/Header/Header';
import NewOffer from '../../Components/Offer/NewOffer';



class Offers extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            offers: [ {
                    device:'',
                    id:'',
                    date:'',
                    language:'',
                    location:[ {
                        id: '',
                        location:'' }
                    ],
                    product:'',
                    source:'',
                    user: [ {
                        id: '',
                        user:'',
                        active:false,
                        complete:false,
                        revenue:0,
                        spent:0,
                        profit:0
                    } ]
                }
            ],
                updateproduct: '',
                updatesource:'',
                updatelocation:'',
                updatelanguage: '',
                updatedevice:'',
                
                someword: 'write',
                deleted: '',

            users: [{
                id:'',
                email:'',
                name:'',
                isbdm:false,
            }],

            user: {

            },

            messages:[{ }],

            language:'',

            showNewOffer:false,
            showUpdate:false,
            showSearch:true,
            showChat:false,

            productdefault:'',
            sourcedefault:'',
            locationdefault:'',
            languagedefault:'',
            devicedefault:'',
            
            savefetched:false,

            products:[],
            sources: [ { } ], 
            locations: [ { } ],
            languages: [ { } ],
            devices: [ { } ],

            productselect:'',
            sourceselect:'',
            locationselect:[ { 
                id:'',
                location:''
            } ],
            languageselect:'',
            deviceselect:'',
            userselect: [ {
                id:'',
                user:'',
                active:false,
                complete:false,
                revenue:0,
                spent:0,
                profit:0
             } ],

            newoffer:false,

            productsearch:'',
            sourcesearch:'',
            locationsearch:'',
            languagesearch:'',
            devicesearch:'',
            usersearch:'',

            offerupdatelocation:'',

            emptynewoffer:false,

            selectedoffer:'',
            locationupdatecount:100,
 
            white:{color:"#fafafa"},
            green:{color:"#00989b"},
                     
        }   
        
          };

          componentWillMount(){

            let offersRef = fire.database().ref('offers').orderByKey().limitToLast(100);
              offersRef.on('child_added', snapshot => {
             let offer = {
                            language: snapshot.val().language, 
                            product: snapshot.val().product,
                            source: snapshot.val().source,
                            location: snapshot.val().location,
                            device: snapshot.val().device,
                            user: snapshot.val().user,
                            date: snapshot.val().date,
                            id: snapshot.key };
            this.setState({ offers: [offer].concat(this.state.offers) });
            });
         
            fire.database().ref('users').on('child_added', snapshot => {
            
                    let user = { email: snapshot.val().email,
                                name: snapshot.val().name,
                                isbdm: snapshot.val().isbdm,
                                id: snapshot.key };
                  this.setState({ users: [user].concat(this.state.users)});
            
                    const useremail = this.props.email;
                    const loggedinuser = this.state.users;
                    for(var i=0; i < loggedinuser.length; i++ ){
                        if(loggedinuser[i].email === useremail ) {
    
                         this.setState({user:loggedinuser[i]});
                           
                        }
                    }
                    
                    this.setState({users: loggedinuser});
            });

            fire.database().ref('messages').orderByKey().limitToLast(1000).on('child_added', snapshot => {
                let message = {
                    date: snapshot.val().date,
                    message: snapshot.val().message,
                    offer: snapshot.val().offer,
                    userid: snapshot.val().userid,
                    user: snapshot.val().user,
                    id: snapshot.key
                }
                this.setState({ messages: this.state.messages.concat(message)});
            });
   
        }
         componentDidMount = () => {
                fire.database().ref('offers').on('child_removed', snapshot => {
                const Offers = this.state.offers;
                for(var i=0; i < Offers.length; i++ ){
                    if(Offers[i].id === snapshot.key) {
                       Offers.splice(i, 1);
                    }
                }        
                this.setState({offers: Offers})
        });          

            fire.database().ref('offers').on('child_changed', snapshot => {
                const updateoffer = this.state.offers;
                for(var i=0; i < updateoffer.length; i++ ){
                    if(updateoffer[i].id === snapshot.key) {
                        updateoffer[i] = {
                            language: snapshot.val().language, 
                            product: snapshot.val().product,
                            source: snapshot.val().source,
                            location: snapshot.val().location,
                            device: snapshot.val().device,
                            user: snapshot.val().user,
                            id: snapshot.key
                        };
                    }
                    this.setState({offers: updateoffer});
                }
            });
     }
    
          onSubmit = (e) => {
           
            e.preventDefault();
        
            let newOffer = {
                id: '',
                language: this.state.languagedefault,
                product: this.state.productdefault,
                source: this.state.sourceselect,
                location: this.state.locationdefault,
                device: this.state.devicedefault
            }
        
            this.setState({offers: [newOffer].concat(this.state.offers)});
            
            fire.database().ref('offers').push(newOffer)

            this.setState({languagedefault:""});
            this.setState({productdefault:""});
            this.setState({sourcedefault:""});
            this.setState({locationdefault:""});
            this.setState({devicedefault:""});
        }
 

        deleteoffer = (offerid) => {
            
            return fire.database().ref('offers').child(offerid).remove();
        }

        toggleNewOffer = () => {
            this.setState({showNewOffer:true});
            this.setState({showSearch:false});
            if(!this.state.savefetched) {
            let newproducts = this.state.products;
            newproducts.splice(0,1);
            this.setState({products:newproducts});
            let newsources = this.state.sources;
            newsources.splice(0,1);
            this.setState({sources:newsources});
            let newlocations = this.state.locations;
            newlocations.splice(0,1);
            this.setState({locations:newlocations});
            let newlanguages = this.state.languages;
            newlanguages.splice(0,1);
            this.setState({languages:newlanguages});
            let newdevices = this.state.devices;
            newdevices.splice(0,1);
            this.setState({devices:newdevices}); 
        }
            if (!this.state.savefetched) {
            fire.database().ref("products").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                    let product = {
                        product: snapshot.val().product,
                        name: snapshot.val().name,
                        id: snapshot.key
                    };
                   
                    this.setState({ products: [product].concat(this.state.products) }); 
                })
                    this.setState({savefetched:true});
            fire.database().ref("sources").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let source = {
                    source: snapshot.val().source,
                    name: snapshot.val().name,
                    id: snapshot.key, 
                };
               
                this.setState({ sources: [source].concat(this.state.sources) });       
            })
               
            fire.database().ref("locations").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                    let location = {
                        location: snapshot.val().location,
                        name: snapshot.val().name,
                        id: snapshot.key, 
                };
                   
                this.setState({ locations: [location].concat(this.state.locations) });       
            })
            
            fire.database().ref("languages").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let language = {
                    language: snapshot.val().language,
                    name: snapshot.val().name,
                    id: snapshot.key, 
            };
               
            this.setState({ languages: [language].concat(this.state.languages) });       
        })         

            fire.database().ref("devices").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let device = {
                    device: snapshot.val().device,
                    name: snapshot.val().name,
                    id: snapshot.key, 
            };
           
            this.setState({ devices: [device].concat(this.state.devices) });       
    })         
        }
    }

        toggleSearch = () => {
            this.setState({showNewOffer:false});
            this.setState({showSearch:true});
            this.setState({languageselect:''});
            this.setState({productselect:''});
            this.setState({sourceselect:''});
            this.setState({locationselect:[ { 
                id:'',
                location:''
            } ]});
            this.setState({deviceselect:''});
            this.setState({userselect:[ {
                id:'',
                user:'',
                active:false,
                complete:false,
                revenue:0,
                spent:0,
                profit:0
             } ]});
            this.setState({productdefault:''});
            this.setState({sourcedefault:''});
            this.setState({locationdefault:''});
            this.setState({languagedefault:''});
            this.setState({devicedefault:''});
            this.setState({newoffer:false});
            this.setState({emptynewoffer:false});
        }

        saveProduct = (e) => {
            e.preventDefault();
            let productsave;
            let product = this.state.productdefault;
            this.setState({emptynewoffer:false});
            if(this.state.productdefault!=='') {
                productsave = {
                    product: this.state.productdefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.products.length < 12 ) { 
            this.setState({products: [productsave].concat(this.state.products)});
            fire.database().ref('products').push(productsave);
            this.setState({productdefault:''});
            } else this.setState({productselect:product});
            this.setState({productdefault:''});
          
        }
    }

        selectProduct = (id) => {
            this.setState({emptynewoffer:false});
        if (this.state.productdefault==='') {
            const productname = this.state.products;
            for(var i=0; i< productname.length; i++ ){
                if(productname[i].id === id) {
                    let productupdatename = productname[i].product;
                    this.setState({productselect:productupdatename})
                }
            }
                } else { 
                 let productupdate = {
                id: id,
                name: this.state.user.name,
                product:this.state.productdefault, 
          } 
               fire.database().ref('products').child(id).update(productupdate);
               const updateproduct = this.state.products;
                for(var i=0; i < updateproduct.length; i++ ){
                    if(updateproduct[i].id === id) {
                        updateproduct[i] = {
                            id: id,
                            name: this.state.user.name,
                            product:this.state.productdefault
                        };
                    }
                    this.setState({products: updateproduct});
                    this.setState({productdefault:''});
                    
                }    }
        }

        saveProductOffer = (id, productdefault) => {
            let productsave;
            if(productdefault!=='') {
                productsave = {
                    product: productdefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.products.length < 12 ) { 
            this.setState({products: [productsave].concat(this.state.products)});
           fire.database().ref('products').push(productsave);
            } else { 

        let updates = {
            "product": productdefault,
       }
         fire.database().ref('offers').child(id).update(updates);
                }
            } 
    }

        updateProductOffer = (id, productdefault, offerid) => {
            if (productdefault==='') {
                const productname = this.state.products;
                for(var i=0; i< productname.length; i++ ){
                    if(productname[i].id === id) {
                        let productupdatename = productname[i].product;
                        this.setState({offers:{product:productupdatename}});
                        
            let updates = {
                "product": productupdatename,
           }
    
             fire.database().ref('offers').child(offerid).update(updates);
                    }
                }
                    } else { 
                     let productupdate = {
                    id: id,
                    name: this.state.user.name,
                    product:productdefault, 
              } 
                   fire.database().ref('products').child(id).update(productupdate);
                   
            const updateproduct = this.state.products;
            for(var i=0; i < updateproduct.length; i++ ){
                if(updateproduct[i].id === id) {
                    updateproduct[i] = {
                        id: id,
                        name: this.state.user.name,
                        product:productdefault
                    };
                }
                this.setState({products: updateproduct});
            }
                   this.setState({productdefault:''});
                 }
        }

        saveSource = (e) => {
            e.preventDefault();
            let sourcesave;
            let source= this.state.sourcedefault;
            this.setState({emptynewoffer:false});
            if(this.state.sourcedefault!=='') {
                sourcesave = {
                    source: this.state.sourcedefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.sources.length < 12 ) { 
            this.setState({sources: [sourcesave].concat(this.state.sources)});
            fire.database().ref('sources').push(sourcesave);
            this.setState({sourcedefault:''});
            } else this.setState({sourceselect:source});
            this.setState({sourcedefault:''});
        }
    }
        selectSource = (id) => {
        this.setState({emptynewoffer:false});
        if (this.state.sourcedefault==='') {
            const sourcename = this.state.sources;
            for(var i=0; i< sourcename.length; i++ ){
                if(sourcename[i].id === id) {
                    let sourceupdatename = sourcename[i].source;
                    this.setState({sourceselect:sourceupdatename})
                }
            }
                } else { 
                 let sourceupdate = {
                id: id,
                name: this.state.user.name,
                source:this.state.sourcedefault, 
          } 
               fire.database().ref('sources').child(id).update(sourceupdate);
               const updatesource = this.state.sources;
                for(var i=0; i < updatesource.length; i++ ){
                    if(updatesource[i].id === id) {
                        updatesource[i] = {
                            id: id,
                            name: this.state.user.name,
                            source:this.state.sourcedefault
                        };
                    }
                    this.setState({sources: updatesource});
                    this.setState({sourcedefault:''});
                }    }
        } 

        saveSourceOffer = (id, sourcedefault) => {
            let sourcesave;
            if(sourcedefault!=='') {
                sourcesave = {
                    source: sourcedefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.sources.length < 12 ) { 
            this.setState({sources: [sourcesave].concat(this.state.sources)});
           fire.database().ref('sources').push(sourcesave);
            } else { 

        let updates = {
            "source": sourcedefault,
       }
         fire.database().ref('offers').child(id).update(updates);
                }
            } 
    }

        updateSourceOffer = (id, sourcedefault, offerid) => {
            if (sourcedefault==='') {
                const sourcename = this.state.sources;
                for(var i=0; i< sourcename.length; i++ ){
                    if(sourcename[i].id === id) {
                        let sourceupdatename = sourcename[i].source;
                        
            let updates = {
                "source": sourceupdatename,
           }
    
             fire.database().ref('offers').child(offerid).update(updates);
                    }
                }
                    } else { 
                     let sourceupdate = {
                    id: id,
                    name: this.state.user.name,
                    source:sourcedefault, 
              } 
                   fire.database().ref('sources').child(id).update(sourceupdate);
                   
            const updatesource = this.state.sources;
            for(var i=0; i < updatesource.length; i++ ){
                if(updatesource[i].id === id) {
                    updatesource[i] = {
                        id: id,
                        name: this.state.user.name,
                        source:sourcedefault
                    };
                }
                this.setState({sources: updatesource});
            }
                 }
        }

        saveLocation = (e) => {
            e.preventDefault();
            let locationsave;
            let locationupdatename
            const newlocations = this.state.locationselect;
            this.setState({emptynewoffer:false});
            if(this.state.locationdefault!=='') {
                locationsave = {
                    location: this.state.locationdefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.locations.length < 12 ) { 
            this.setState({locations: [locationsave].concat(this.state.locations)});
            fire.database().ref('locations').push(locationsave);
            this.setState({locationdefault:''});
            } else {
            locationupdatename = {
                id: this.state.locationselect.length,
                location: this.state.locationdefault
            }
            if (newlocations.some(location => locationupdatename.location === location.location)) {
                return null; 
               } else {
            this.setState({ locationselect: this.state.locationselect.concat(locationupdatename) }); 
               }
            this.setState({locationdefault:''});
        }
    }
}

        selectLocation = (id) => {
        this.setState({emptynewoffer:false});
        if (this.state.locationdefault==='') {
            const locationname = this.state.locations; 
            const newlocations = this.state.locationselect; 
            for(var i=0; i< locationname.length; i++ ){
                if(locationname[i].id === id) {
                    let locationupdatename = {
                        id:this.state.locationselect.length,
                        location:locationname[i].location
                    }
            if (newlocations.some(location => locationupdatename.location === location.location)) {
             return null; 
            } else {
                this.setState({ locationselect: this.state.locationselect.concat(locationupdatename) });
        }     
                }
            }
                } else { 
                 let locationupdate = {
                id: id,
                name: this.state.user.name,
                location:this.state.locationdefault, 
          }
               fire.database().ref('locations').child(id).update(locationupdate);
               const updatelocation = this.state.locations;
                for(var i=0; i < updatelocation.length; i++ ){
                    if(updatelocation[i].id === id) {
                        updatelocation[i] = {
                            id: id,
                            name: this.state.user.name,
                            location:this.state.locationdefault
                        };
                    }
                    this.setState({loactions: updatelocation});
                    this.setState({locationdefault:''});
                }   
             }
            } 

            saveLocationOffer = (offerid, locationdefault) => {
                let locationsave;
                if(locationdefault!=='') {
                    locationsave = {
                        location: locationdefault,
                        name: this.state.user.name,
                        id: '',
                } 
                if (this.state.locations.length < 12 ) { 
                this.setState({locations: [locationsave].concat(this.state.locations)});
               fire.database().ref('locations').push(locationsave);
                } else { 
                const updateoffer = this.state.offers
        for(var i=0; i< updateoffer.length; i++ ) {
            if (updateoffer[i].id === offerid) {
                let location = updateoffer[i];
                if (location.location.some(updatelocation => locationdefault === updatelocation.location)) {
                    return null; 
                   } else {
                let locationupdatename = location.location.concat ( {
                    id:location.location.length,
                    location:locationdefault       
                })
            let updates = {
                location: locationupdatename,
           }
          
             fire.database().ref('offers').child(offerid).update(updates);
                }
                    }
                } 
            }
        }
        }

    updateLocationOffer = (id, locationdefault, offerid) => {
        const updateoffer = this.state.offers
        for(var i=0; i< updateoffer.length; i++ ) {
            if (updateoffer[i].id === offerid) {
                let location = updateoffer[i];
                if (locationdefault==='') {
                    const locationname = this.state.locations;
                    for(var i=0; i< locationname.length; i++ ){
                        if(locationname[i].id === id) {
                            if (location.location.some(updatelocation => locationname[i].location === updatelocation.location)) {
                                return null; 
                               } else {
                        let locationupdatename = location.location.concat ( {
                            id:location.location.length+locationname[i].location,
                            location:locationname[i].location     
                        })
                        let updates = {
                             location: locationupdatename,
                                 }                
                     fire.database().ref('offers').child(offerid).update(updates);
                                }
                    }  
                }
                        } else { 
                         let locationupdate = {
                        id: id,
                        name: this.state.user.name,
                        location:locationdefault, 
                  } 
                       fire.database().ref('locations').child(id).update(locationupdate);

                const updatelocation = this.state.locations;
                for(var i=0; i < updatelocation.length; i++ ){
                    if(updatelocation[i].id === id) {
                        updatelocation[i] = {
                            id: id,
                            name: this.state.user.name,
                            location:locationdefault
                        };
                    }
                    this.setState({locations: updatelocation});
                }
                }        
            }
        }     
    }

deleteLocationOffer = (locationid, offerid) => {
    const updateoffer = this.state.offers
        for(var i=0; i< updateoffer.length; i++ ) {
            if (updateoffer[i].id === offerid) {
                let location = updateoffer[i];
    const newlocation = location.location.filter(location => location.id !==locationid);

    let updates = {
        location: newlocation,
    }
     fire.database().ref('offers').child(offerid).update(updates);
}
    } 
    } 

        saveLanguage = (e) => {
            e.preventDefault();
            let languagesave;
            let language = this.state.languagedefault;
            this.setState({emptynewoffer:false});
            if(this.state.languagedefault!=='') {
                languagesave = {
                    language: this.state.languagedefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.languages.length < 12 ) { 
            this.setState({languages: [languagesave].concat(this.state.languages)});
            fire.database().ref('languages').push(languagesave);
            this.setState({languagedefault:''});
            } else this.setState({languageselect:language});
            this.setState({languagedefault:''});
        }
        }

        selectLanguage = (id) => {
            this.setState({emptynewoffer:false});
            if (this.state.languagedefault==='') {
                const languagename = this.state.languages;
                for(var i=0; i< languagename.length; i++ ){
                    if(languagename[i].id === id) {
                        let languageupdatename = languagename[i].language;
                        this.setState({languageselect:languageupdatename});
                    }
                }
                    } else { 
                     let languageupdate = {
                    id: id,
                    name: this.state.user.name,
                    language:this.state.languagedefault,
              } 
                   fire.database().ref('languages').child(id).update(languageupdate);
                   const updatelanguage = this.state.languages;
                    for(var i=0; i < updatelanguage.length; i++ ){
                        if(updatelanguage[i].id === id) {
                            updatelanguage[i] = {
                                id: id,
                                name: this.state.user.name,
                                language:this.state.languagedefault
                            };
                        }
                        this.setState({languages: updatelanguage});
                        this.setState({languagedefault:''});
                    }    }
            }

    saveLanguageOffer = (id, languagedefault) => {
        let languagesave;
            if(languagedefault!=='') {
                languagesave = {
                language: languagedefault,
                name: this.state.user.name,
                id: '',
                } 
        if (this.state.languages.length < 12 ) { 
        this.setState({languages: [languagesave].concat(this.state.languages)});
        fire.database().ref('languages').push(languagesave);
                } else { 
    
        let updates = {
                "language": languagedefault,
           }
            fire.database().ref('offers').child(id).update(updates);
                    }
                } 
        }
          
    updateLanguageOffer = (id, languagedefault, offerid) => {
        if (languagedefault==='') {
            const languagename = this.state.languages;
            for(var i=0; i< languagename.length; i++ ){
                if(languagename[i].id === id) {
                    let languageupdatename = languagename[i].language;
                    
        let updates = {
            "language": languageupdatename,
       }

         fire.database().ref('offers').child(offerid).update(updates);
                }
            }
                } else { 
                 let languageupdate = {
                id: id,
                name: this.state.user.name,
                language:languagedefault, 
          } 
               fire.database().ref('languages').child(id).update(languageupdate);
               
        const updatelanguage = this.state.languages;
        for(var i=0; i < updatelanguage.length; i++ ){
            if(updatelanguage[i].id === id) {
                updatelanguage[i] = {
                    id: id,
                    name: this.state.user.name,
                    language:languagedefault
                };
            }
            this.setState({languages: updatelanguage});
        }
             }
     }
     
        saveDevice = (e) => {
            e.preventDefault();
            let devicesave;
            let device = this.state.devicedefault;
            this.setState({emptynewoffer:false});
            if(this.state.devicedefault!=='') {
                devicesave = {
                    device: this.state.devicedefault,
                    name: this.state.user.name,
                    id: '',
            } 
            if (this.state.devices.length < 12 ) { 
            this.setState({devices: [devicesave].concat(this.state.devices)});
            fire.database().ref('devices').push(devicesave);
            this.setState({devicedefault:''});
            } else this.setState({deviceselect:device});
            this.setState({devicedefault:''});
        }
    }

        selectDevice = (id) => {
        this.setState({emptynewoffer:false});
        if (this.state.devicedefault==='') {
            const devicename = this.state.devices;
            for(var i=0; i< devicename.length; i++ ){
                if(devicename[i].id === id) {
                    let deviceupdatename = devicename[i].device;
                    this.setState({deviceselect:deviceupdatename})
                }
            }
                } else { 
                 let deviceupdate = {
                id: id,
                name: this.state.user.name,
                device:this.state.devicedefault, 
          } 
               fire.database().ref('devices').child(id).update(deviceupdate);
               const updatedevice = this.state.devices;
                for(var i=0; i < updatedevice.length; i++ ){
                    if(updatedevice[i].id === id) {
                        updatedevice[i] = {
                            id: id,
                            name: this.state.user.name,
                            device:this.state.devicedefault
                        };
                    }
                    this.setState({devices: updatedevice});
                    this.setState({devicedefault:''});
                }    }
        }

        saveDeviceOffer = (id, devicedefault) => {
            let devicesave;
                if(devicedefault!=='') {
                    devicesave = {
                    device: devicedefault,
                    name: this.state.user.name,
                    id: '',
                    } 
            if (this.state.devices.length < 12 ) { 
            this.setState({devices: [devicesave].concat(this.state.devices)});
            fire.database().ref('devices').push(devicesave);
                    } else { 
        
            let updates = {
                    "device": devicedefault,
               }
                fire.database().ref('offers').child(id).update(updates);
                        }
                    } 
            }

        updateDeviceOffer = (id, devicedefault, offerid) => {
            if (devicedefault==='') {
                const devicename = this.state.devices;
                for(var i=0; i< devicename.length; i++ ){
                    if(devicename[i].id === id) {
                        let deviceupdatename = devicename[i].device;
                        
            let updates = {
                "device": deviceupdatename,
           }
    
             fire.database().ref('offers').child(offerid).update(updates);
                    }
                }
                    } else { 
                     let deviceupdate = {
                    id: id,
                    name: this.state.user.name,
                    device:devicedefault, 
              } 
                   fire.database().ref('devices').child(id).update(deviceupdate);
                   
            const updatedevice = this.state.devices;
            for(var i=0; i < updatedevice.length; i++ ){
                if(updatedevice[i].id === id) {
                    updatedevice[i] = {
                        id: id,
                        name: this.state.user.name,
                        device:devicedefault
                    };
                }
                this.setState({devices: updatedevice});
            }
                 }
         }

         updateUserOffer = (userid, offerid) => {
            const updateoffer = this.state.offers
            for(var i=0; i< updateoffer.length; i++ ) {
                if (updateoffer[i].id === offerid) {
                    let user = updateoffer[i];
                        const username = this.state.users;
                        for(var i=0; i< username.length; i++ ){
                            if(username[i].id === userid) {
                            let userupdatename = user.user.concat( {
                                id:username[i].email,
                                user:username[i].name,
                                active:false,
                                complete:false,
                                revenue:0,
                                spent:0,
                                profit:0        
                            });
                            let updates = {
                                 user: userupdatename,
                            }         
                     if (user.user.some(updateuser => username[i].name === updateuser.user)) {
                        return null; 
                       } else {
                        fire.database().ref('offers').child(offerid).update(updates);
                       }
                        }  
                    }  
                }
            }     
        }

        deleteUserOffer = (userid, offerid) => {
            const updateoffer = this.state.offers
                for(var i=0; i< updateoffer.length; i++ ) {
                    if (updateoffer[i].id === offerid) {
                        let user = updateoffer[i];
            const newuser = user.user.filter(user => user.id !==userid);
        
            let updates = {
                user: newuser,
            }
             fire.database().ref('offers').child(offerid).update(updates);
        }
            } 
            } 

         selectUser = (id) => {
            this.setState({emptynewoffer:false});
            const username = this.state.users;
            const newusers = this.state.userselect;
                for(var i=0; i< username.length; i++ ){
                    if(username[i].id === id) {
                        let userupdatename = {
                            id:username[i].email,
                            user:username[i].name,
                            active:false,
                            complete:false,
                            revenue:0,
                            spent:0,
                            profit:0
                        }
                        if (newusers.some(user => userupdatename.user === user.user)) {
                            return null; 
                           } else {
                    this.setState({ userselect: this.state.userselect.concat(userupdatename) });
                           } 
                    }
                }           
            }

        createOffer = (e) => {
            e.preventDefault();
                if (this.state.locationselect.length>1) {
            let newlocationselect = this.state.locationselect;
            newlocationselect.splice(0,1);
            this.setState({locationselect:newlocationselect});
                }
                if (this.state.userselect.length>1) {
            let newuserselect = this.state.userselect;
            newuserselect.splice(0,1);
            this.setState({userselect:newuserselect});
                }

            if (this.state.productselect!=='' || this.state.sourceselect!=='' || this.state.locationselect.length>1 ||
            this.state.languageselect!=='' || this.state.deviceselect!=='' || this.state.userselect.length>1 )  {

            let newOffer = {
                id: '',
                date:Date.now(),
                'product': this.state.productselect,
                'source': this.state.sourceselect,     
                location: this.state.locationselect,
                'language': this.state.languageselect,
                'device': this.state.deviceselect,
                user: this.state.userselect
            }
         
            this.setState({offers: [newOffer].concat(this.state.offers)});
            
            fire.database().ref('offers').push(newOffer);

        } else {
            this.setState({emptynewoffer:true});
        }

            this.setState({languageselect:""});
            this.setState({productselect:""});
            this.setState({sourceselect:""});
            this.setState({locationselect:[ { 
                id:'',
                location:''
            } ]});
            this.setState({deviceselect:""});
            this.setState({userselect:[ {
                id:'',
                user:'',
                active:false,
                complete:false,
                revenue:0,
                spent:0,
                profit:0
             } ]});
            this.setState({newoffer:false});
        }

        deleteLocation = (id) => {
           const newlocationselect = this.state.locationselect.filter(location => location.id !==id);
           this.setState({locationselect: newlocationselect});       
        }
        deleteUser = (id) => {
            const newuserselect = this.state.userselect.filter(user => user.id !==id);
            this.setState({userselect: newuserselect});       
         }

         deleteOffer = () => {
            this.setState({languageselect:""});
            this.setState({productselect:""});
            this.setState({sourceselect:""});
            this.setState({locationselect:[ { 
                id:'',
                location:''
            } ]});
            this.setState({deviceselect:""});
            this.setState({userselect:[ {
                id:'',
                user:'',
                active:false,
                complete:false,
                revenue:0,
                spent:0,
                profit:0
             } ]});
            this.setState({newoffer:false});
         }

         setUserActive = (userid, offerid) => {
            let activeoffer = this.state.offers;
            for(var i=0; i< activeoffer.length; i++ ) {
                if (activeoffer[i].id === offerid) {
                    let activeuser = [...activeoffer[i].user];
                    let index = activeuser.findIndex(el => el.id === userid);
                    activeuser[index] = {...activeuser[index]};
                            activeuser[index].active = true;
                            let updates = {
                                user : activeuser
                            }   
                            console.log(updates);
                        fire.database().ref('offers').child(offerid).update(updates); 
                 }
             } 
         }

         setUserInactive = (userid, offerid) => {
            let inactiveoffer = this.state.offers;
            for(var i=0; i< inactiveoffer.length; i++ ) {
                if (inactiveoffer[i].id === offerid) {
                    let inactiveuser = [...inactiveoffer[i].user];
                    let index = inactiveuser.findIndex(el => el.id === userid);
                     inactiveuser[index] = {...inactiveuser[index]};
                        inactiveuser[index].active = false;
                            let updates = {
                                user : inactiveuser
                            }
                            console.log(updates);
                        fire.database().ref('offers').child(offerid).update(updates); 
                 }
             } 
         }

         setActiveMediaBuyer = (offerid) => {
            const activeoffer = this.state.offers
            for(var i=0; i< activeoffer.length; i++ ) {
                if (activeoffer[i].id === offerid) {
                    let activeuser = [...activeoffer[i].user];
                    let index = activeuser.findIndex(el => el.id === this.state.user.email);
                    activeuser[index] = {...activeuser[index]};
                            activeuser[index].active = true;
                            let updates = {
                                user : activeuser
                            }
                            fire.database().ref('offers').child(offerid).update(updates); 
                 }
             } 
         }

         setInactiveMediaBuyer = (offerid) => {
            const inactiveoffer = this.state.offers
            for(var i=0; i< inactiveoffer.length; i++ ) {
                if (inactiveoffer[i].id === offerid) {
                    let inactiveuser = [...inactiveoffer[i].user];
                    let index = inactiveuser.findIndex(el => el.id === this.state.user.email);
                    inactiveuser[index] = {...inactiveuser[index]};
                            inactiveuser[index].active = false;
                            let updates = {
                                user : inactiveuser
                            }
                            fire.database().ref('offers').child(offerid).update(updates);  
                 }
             } 
         }

        offerComplete = (offerid, revenue, spent) => {
            const completeoffer = this.state.offers
            for(var i=0; i< completeoffer.length; i++ ) {
                if (completeoffer[i].id === offerid) {
                   let completeuser = [...completeoffer[i].user];
                   let index = completeuser.findIndex(el => el.id === this.state.user.email);
                   completeuser[index] = {...completeuser[index]};
                           completeuser[index].active = false;
                           completeuser[index].complete = true;
                           completeuser[index].revenue = revenue;
                           completeuser[index].spent = spent;
                           completeuser[index].profit = revenue - spent;
                           let updates = {
                               user: completeuser
                           }
                           fire.database().ref('offers').child(offerid).update(updates);
                }
            }
        }

        
     setSelectedOffer = (id) => {
         this.setState({selectedoffer:id});
         if(!this.state.savefetched) {
            let newproducts = this.state.products;
            newproducts.splice(0,1);
            this.setState({products:newproducts});
            let newsources = this.state.sources;
            newsources.splice(0,1);
            this.setState({sources:newsources});
            let newlocations = this.state.locations;
            newlocations.splice(0,1);
            this.setState({locations:newlocations});
            let newlanguages = this.state.languages;
            newlanguages.splice(0,1);
            this.setState({languages:newlanguages});
            let newdevices = this.state.devices;
            newdevices.splice(0,1);
            this.setState({devices:newdevices}); 
        }
            if (!this.state.savefetched) {
            fire.database().ref("products").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                    let product = {
                        product: snapshot.val().product,
                        name: snapshot.val().name,
                        id: snapshot.key
                    };
                   
                    this.setState({ products: [product].concat(this.state.products) });    
                })
                    this.setState({savefetched:true});
            fire.database().ref("sources").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let source = {
                    source: snapshot.val().source,
                    name: snapshot.val().name,
                    id: snapshot.key, 
                };
               
                this.setState({ sources: [source].concat(this.state.sources) });       
            })
               
            fire.database().ref("locations").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                    let location = {
                        location: snapshot.val().location,
                        name: snapshot.val().name,
                        id: snapshot.key, 
                };
                   
                this.setState({ locations: [location].concat(this.state.locations) });       
            })
            
            fire.database().ref("languages").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let language = {
                    language: snapshot.val().language,
                    name: snapshot.val().name,
                    id: snapshot.key, 
            };
               
            this.setState({ languages: [language].concat(this.state.languages) });       
        })         

            fire.database().ref("devices").orderByChild("name").equalTo(this.state.user.name).on('child_added', snapshot => {
                let device = {
                    device: snapshot.val().device,
                    name: snapshot.val().name,
                    id: snapshot.key, 
            };
           
            this.setState({ devices: [device].concat(this.state.devices) });       
    })         
        }
         
         if (!this.state.showUpdate) {
         this.setState({showUpdate:true});
         this.setState({showNewOffer:false});
         this.setState({showSearch:true});
         }        
     }
         unselectOffer = () => {
             this.setState({selectedoffer:''});
             this.setState({showUpdate:false});
             this.setState({showSearch:true});
         }

    updateProductSearch = (event) => {
        this.setState({productsearch: event.target.value.substr(0, 20)});
    }

    updateSourceSearch = (event) => {
        this.setState({sourcesearch: event.target.value.substr(0, 20)});
    }

    updateLocationSearch = (event) => {
        this.setState({locationsearch: event.target.value.substr(0, 20)});
    }

    updateLanguageSearch = (event) => {
        this.setState({languagesearch: event.target.value.substr(0, 20)});
    }

    updateDeviceSearch = (event) => {
        this.setState({devicesearch: event.target.value.substr(0, 20)});
    }

    updateUserSearch = (event) => {
        this.setState({usersearch: event.target.value.substr(0, 20)});
    }

    sendOfferMessage = (message, offerid) => {
        let newoffermessage = {
            id: '',
            date: Date.now(),
            message: message,
            offer: offerid,
            userid: this.state.user.email,
            user: this.state.user.name,
        }
        fire.database().ref('messages').push(newoffermessage);
    }

render() {

    let filteredoffers = this.state.offers.filter(
        (offers) => {
            if (this.state.sourcesearch !=='') {
              return  offers.source.toLowerCase().indexOf(this.state.sourcesearch.toLowerCase()) !== -1;
            }
            if (this.state.locationsearch !=='') {
             return offers.location.find(searchlocation => this.state.locationsearch.toLowerCase().includes(searchlocation.location.toLowerCase()));
            }             
            if (this.state.languagesearch !=='') {
                return  offers.language.toLowerCase().indexOf(this.state.languagesearch.toLowerCase()) !== -1;
            }
            if (this.state.devicesearch !=='') {
                return  offers.device.toLowerCase().indexOf(this.state.devicesearch.toLowerCase()) !== -1;
            }
            if (this.state.usersearch !=='') {
                return offers.user.find(searchuser => this.state.usersearch.toLowerCase().includes(searchuser.user.toLowerCase()));
            }
            else {
            return  offers.product.toLowerCase().indexOf(this.state.productsearch.toLowerCase()) !== -1;
        }
    }
    );

    let offer;
    if (this.state.user.isbdm) {
        offer = filteredoffers.map(StrOffers => {
            return <Offer StrOffers={StrOffers}
                                    key={StrOffers.id}
                                    locations={StrOffers.location}
                                    deleteoffer={this.deleteoffer}
                                    selectedOffer={this.setSelectedOffer}
                                    selected={this.state.selectedoffer}
                                    unselect={this.unselectOffer}
                                    products={this.state.products}
                                    sources={this.state.sources}
                                    locations={this.state.locations}
                                    languages={this.state.languages}
                                    devices={this.state.devices}
                                    users={this.state.users}
                                    user={this.state.user}
                                    saveProduct={this.saveProductOffer}
                                    updateProduct={this.updateProductOffer}
                                    saveSource={this.saveSourceOffer}
                                    updateSource={this.updateSourceOffer}
                                    saveLocation={this.saveLocationOffer} 
                                    updateLocation={this.updateLocationOffer}
                                    deleteLocation={this.deleteLocationOffer}
                                    saveLanguage={this.saveLanguageOffer}
                                    updateLanguage={this.updateLanguageOffer}
                                    saveDevice={this.saveDeviceOffer}
                                    updateDevice={this.updateDeviceOffer}
                                    updateUser={this.updateUserOffer}
                                    deleteUser={this.deleteUserOffer}
                                    setActive={this.setUserActive}
                                    setInactive={this.setUserInactive}
                                    Complete={this.offerComplete}
                                    sendNewMessage={this.sendOfferMessage}
                                    messages={this.state.messages}
                                    />;
    });
} else {
    offer = filteredoffers.map(StrOffers => {
        return <OfferMediaBuyer StrOffers={StrOffers}
                                key={StrOffers.id}
                                locations={StrOffers.location}
                                deleteoffer={this.deleteoffer}
                                user={this.state.user}
                                setActive={this.setActiveMediaBuyer}
                                setInactive={this.setInactiveMediaBuyer}
                                Complete={this.offerComplete}
                                sendNewMessage={this.sendOfferMessage}
                                messages={this.state.messages}
                                 />;
    });
}


        let productsave; 
        if (this.state.productdefault==='') {
        productsave = this.state.products.map(product => {
        return  <div className="newOfferItem" onClick={() => this.selectProduct(product.id)} key={product.id}><a>{product.product}</a></div>          
     }); 
     } else {
         productsave = this.state.products.map(product => {
         return  <div className="newOfferItemSave" onClick={() => this.selectProduct(product.id)} key={product.id}><a>{product.product}</a></div>
     });           
     }

       let sourcesave; 
       if (this.state.sourcedefault==='') {
       sourcesave = this.state.sources.map(source => {
       return  <div className="newOfferItem" onClick={() => this.selectSource(source.id)} key={source.id}><a>{source.source}</a></div>          
    }); 
    } else {
        sourcesave = this.state.sources.map(source => {
        return  <div className="newOfferItemSave" onClick={() => this.selectSource(source.id)} key={source.id}><a>{source.source}</a></div>
    });           
    }
    
    let locationsave; 
    if (this.state.locationdefault==='') {
    locationsave = this.state.locations.map(location => {
    return  <div className="newOfferItem" onClick={() => this.selectLocation(location.id)} key={location.id}><a>{location.location}</a></div>          
    }); 
    } else {
     locationsave = this.state.locations.map(location => {
     return  <div className="newOfferItemSave" onClick={() => this.selectLocation(location.id)} key={location.id}><a>{location.location}</a></div>
    });           
    }
 
    let languagesave; 
    if (this.state.languagedefault==='') {
    languagesave = this.state.languages.map(language => {
    return  <div className="newOfferItem" onClick={() => this.selectLanguage(language.id)} key={language.id}><a>{language.language}</a></div>          
    }); 
    } else {
     languagesave = this.state.languages.map(language => {
     return  <div className="newOfferItemSave" onClick={() => this.selectLanguage(language.id)} key={language.id}><a>{language.language}</a></div>
    });           
    } 

    let devicesave; 
    if (this.state.devicedefault==='') {
    devicesave = this.state.devices.map(device => {
    return  <div className="newOfferItem" onClick={() => this.selectDevice(device.id)} key={device.id}><a>{device.device}</a></div>          
    }); 
    } else {
     devicesave = this.state.devices.map(device => {
     return  <div className="newOfferItemSave" onClick={() => this.selectDevice(device.id)} key={device.id}><a>{device.device}</a></div>
    });  
    }

    
    let users;
    users = this.state.users.map(user => {
        return  <div className="newOfferItemUser" onClick={() => this.selectUser(user.id)} key={user.id}><a>{user.name}</a></div> 
    }); 

    
    let newoffer;
    if ( this.state.showNewOffer===false) {
        newoffer = null;
    } else {
        newoffer = <NewOffer product={this.state.productselect}
                            source={this.state.sourceselect}
                            location={this.state.locationselect}
                            language={this.state.languageselect}
                            device={this.state.deviceselect}
                            user={this.state.userselect}
                            deletenewlocation={this.deleteLocation}
                            deletenewuser={this.deleteUser}
                            createnewoffer={this.createOffer}
                            deletenewoffer={this.deleteOffer}
                            search={this.toggleSearch}
                            errormessage={this.state.emptynewoffer}> </NewOffer>
    }

           let dashboard;

           if(this.state.showSearch) {
               dashboard = <div className="dashboardContainer"> 
               <div className="dashboardWrap">
               <div className="dashboard">
               <div className="messages"> </div>
               <div className="users"></div>
               </div>
               <div className="searchbar">
               {this.state.user.isbdm ? <div className="newofferButtonWrap">
               <button className="completeButton" onClick={this.toggleNewOffer}> New Offer</button> </div> : 
                <div className="offeremptySearchBar"></div> }
               <div className="searchbarItem"><div className="wrap-offersinput100search validate-input" >
                                  <input onClick={this.setSelect} className="offersinput100" type="text" 
                                  value={this.state.productsearch}
                                  onChange={this.updateProductSearch.bind(this)}
                                  ref="product"  placeholder="Product" />
                                  <span className="focus-offersinput100" ></span>
                          </div></div>
               <div className="searchbarItem"><div className="wrap-offersinput100search validate-input" >
                                  <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                                  <input onClick={this.setSelect} className="offersinput100" type="text"
                                  value={this.state.sourcesearch}
                                  onChange={this.updateSourceSearch.bind(this)}
                                  ref="source"  placeholder="Source" />
                                  <span className="focus-offersinput100" ></span>
                          </div></div>
               <div className="searchbarItem">
               <div className="wrap-offersinput100search validate-input" >
                                  <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                                  <input onClick={this.setSelect} className="offersinput100" type="text" 
                                  value={this.state.locationsearch}
                                  onChange={this.updateLocationSearch.bind(this)}
                                  ref="location"  placeholder="Location" />
                                  <span className="focus-offersinput100" ></span>
                          </div></div>
               <div className="searchbarItem"><div className="wrap-offersinput100search validate-input" >
                                  <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                                  <input display="none" onClick={this.setLanguage} className="offersinput100" type="text"
                                   value={this.state.languagesearch} 
                                   onChange={this.updateLanguageSearch.bind(this)}
                                   placeholder="LP Language" />
                                  <span className="focus-offersinput100" ></span>
                          </div></div>
                <div className="searchbarItem"><div className="wrap-offersinput100search validate-input" >
                                  <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                                  <input display="none" onClick={this.setDevice} className="offersinput100" type="text"
                                  value={this.state.devicesearch} 
                                  onChange={this.updateDeviceSearch.bind(this)}
                                  placeholder="Device"/>
                                  <span className="focus-offersinput100" ></span>
                          </div></div>
                <div className="searchbarItem"><div className="wrap-offersinput100search validate-input" >
                                  <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                                  <input display="none" onClick={this.setDevice} className="offersinput100" type="text"
                                  value={this.state.usersearch} 
                                  onChange={this.updateUserSearch.bind(this)} 
                                  placeholder="User"/>
                                  <span className="focus-offersinput100" ></span>
                          </div></div>                          
               
               </div>
               </div>     
               </div>
           } 
           if(this.state.showNewOffer) {

            dashboard = <div className="container-offers100">
            <div className="wrap-offers100">
            <form className="offers100-form validate-form" onSubmit={this.onSubmit}>
                                       
                       <span className="offers100-form-title p-b-48">
                       <i className="zmdi zmdi-font"></i></span>       
                       <div className="inputWrap">
                       <div className="wrap-offersinput100 validate-input" >
                               <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                               <input onClick={this.setSelect} className="offersinput100" type="text" 
                               value={this.state.productdefault}
                               onChange={(event) => this.setState({productdefault: event.target.value})}
                               ref="product"  placeholder="Product" />
                               <span className="focus-offersinput100" ></span>
                       </div><div className="newOfferItem" onClick={this.saveProduct}><a>Add</a></div>
                       {productsave}
                       </div>
                       <div></div>
                        <div className="inputWrap">
                       <div className="wrap-offersinput100 validate-input" >
                               <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                               <input onClick={this.setSelect} className="offersinput100" type="text"
                               value={this.state.sourcedefault}
                               onChange={(event) => this.setState({sourcedefault: event.target.value})}
                               ref="source"  placeholder="Source" />
                               <span className="focus-offersinput100" ></span>
                       </div><div className="newOfferItem" onClick={this.saveSource}><a>Add</a></div>
                       {sourcesave}
                       </div>
                       <div className="inputWrap">
                       <div className="wrap-offersinput100 validate-input" >
                               <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                               <input onClick={this.setSelect} className="offersinput100" type="text" 
                               value={this.state.locationdefault}
                               onChange={(event) => this.setState({locationdefault: event.target.value})}
                               ref="location"  placeholder="Location" />
                               <span className="focus-offersinput100" ></span>
                       </div><div className="newOfferItem" onClick={this.saveLocation}><a>Add</a></div>
                       {locationsave}
                       </div>
                       <div className="inputWrap">
                       <div className="wrap-offersinput100 validate-input" >
                               <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                               <input display="none" onClick={this.setLanguage} className="offersinput100" type="text"
                                value={this.state.languagedefault} 
                                onChange={(event) => this.setState({languagedefault: event.target.value})}
                                placeholder="LP Language" />
                               <span className="focus-offersinput100" ></span>
                       </div><div className="newOfferItem" onClick={this.saveLanguage}><a>Add</a></div>
                       {languagesave}
                       </div>
                       <div className="inputWrap">
                       <div className="wrap-offersinput100 validate-input" >
                               <span className="btn-show-pass"> <i className="smdi smdi-eye"></i></span>
                               <input display="none" onClick={this.setDevice} className="offersinput100" type="text"
                               value={this.state.devicedefault} 
                               onChange={(event) => this.setState({devicedefault: event.target.value})} 
                               placeholder="Device"/>
                               <span className="focus-offersinput100" ></span>
                       </div><div className="newOfferItem" onClick={this.saveDevice}><a>Add</a></div>
                       {devicesave}
                       </div>
                      <div className="inputWrap"><div className="smallScreenUsers"></div>{users}
                      </div>         
                      </form>
                       </div>   
               </div> 
           }
    
return (
    <div>
    <Header user={this.state.user.name}/>
   
        {dashboard}
        {newoffer}
         {offer}
       
         </div>
          );
        }
      }

      export default Offers;
    
