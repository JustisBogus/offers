import React, {Component} from 'react';
import fire from '../../Components/Firebase/Firebase';
import './SourceSave.css';

class SourceSave extends Component {

constructor(props) {
    super(props);
    this.state = {   
       

    } 
    this.sourcename = props.sourcename;
}

render(props){


    return (

 <div className="newOfferItem"><a>{this.props.sourcename}</a></div>

        );
    }
}

export default SourceSave;
