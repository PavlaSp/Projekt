import React, { Component } from "react";
class SettingsCard extends Component {
    render() {
      return (
        <div className="card" style={{backgroundColor: '#F5F5F5'}}> 
        <div className="card-header" style={{fontWeight: 'bold'}}>
          Your are logged as: Parent
        </div>
        <div >
          {this.props.children}
        </div>
      </div>
    );
  }
}
  export default SettingsCard;