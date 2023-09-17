import React, { Component } from "react";
import {MdDelete} from "react-icons/md"
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./index.css";

class EachCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id:props.eachUser.id,
        name: props.eachUser.name,
        email: props.eachUser.email,
        imageurl:props.eachUser.imageurl
      },
      isSaveClicked:false
    };
  }

  changeImageUrl = (event) => {
    const newImageUrl = event.target.value;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        imageurl:newImageUrl
      }
    }));
  }

  changeName = (event) => {
    const newName = event.target.value;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        name: newName
      }
    }));
  }

  changeEmail = (event) => {
    const newEmail = event.target.value;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        email: newEmail
      }
    }));
  }

  submitForm = (event) => {
    event.preventDefault();
    this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))
    this.props.getUpdatedData(this.state.formData);
  }

  onDeleteButton = ()=>{
    this.props.getDeleteData(this.state.formData.id)
  }

  onCloseButton = ()=>{
    this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))
  }
    
  

  render() {
    const { formData,isSaveClicked } = this.state;
    const saveText = isSaveClicked ? "saved":"save"
    const { eachUser } = this.props;
    const { name, email, imageurl } = eachUser;
    
    return (
      <li className="each-item">
        <img src={imageurl} alt={name} className="each-image" />
        <h2 className="user-name">{name}</h2>
        <p className="user-email">{email}</p>
        <div className="edit-delete">

        
        <Popup
          modal
          contentStyle={{
            borderRadius: "10px",
            height: "auto",
            maxWidth: "400px", 
            backgroundColor: "#ffffff", 
            padding: "20px", 
          }}
          overlayStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.6)", 
          }}
          trigger={
            <button type="button" className="edit-button">
              Edit
            </button>
          }
        >
          {close => 
          (
            <form className="form-container" onSubmit={this.submitForm}>
              <input
                className="input-ele"
                onChange={this.changeImageUrl}
                value={formData.imageurl}
                type="text"
              /><br/>
              <input
                className="input-ele"
                onChange={this.changeName}
                value={formData.name}
                type="text"
              /><br/>
              <input
                className="input-ele"
                onChange={this.changeEmail}
                value={formData.email}
                type="text"
              /><br/>
              <div className="buttons-container">
                <button type="submit" className={`save-button ${isSaveClicked ? 'saved' : ''}`}>{saveText}</button>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => {
                    close();
                    this.onCloseButton(); 
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </Popup>
        
       <button type="button" className="delete-button" onClick={this.onDeleteButton}>
        <MdDelete className="delete-icon"/>
       </button>
       </div>
      </li>
    );
  }
  
}

export default EachCard;





