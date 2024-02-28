import React, { Component } from "react";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./index.css";

class EachCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        id:props.eachUser.id,
        firstName: props.eachUser.firstName,
        lastName: props.eachUser.lastName,
        email: props.eachUser.email,
        age:props.eachUser.age,
        classId:props.eachUser.classId
      },
      isSaveClicked:false
    };
  }

  
  changeFirstName = (event) => {
   
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        firstName: event.target.value
      }
    }));
  }

  changeLastName = (event) => {
   
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        lastName: event.target.value
      }
    }));
  }

  changeEmail = (event) => {
     this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        email: event.target.value
      }
    }));
  }

  changeAge = (event) => {
    this.setState((prevState) => ({
     formData: {
       ...prevState.formData,
       age: event.target.value
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
    const { firstName,lastName, email, age,classId} = eachUser;
    
    return (
     <li className="table-row">
      <div className="table-cell name-column">
        {firstName}
      </div>
      <hr className="separator" />
      <div className="table-cell name-column">
        <p>{lastName}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell name-column">
        <p>{classId}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell name-column">
        <p>{email}</p>
      </div>
      <hr className="separator" />
      <div className="table-cell name-column">
        <p>{age}</p>
      </div>
      <hr className="separator" />

     
      <div className="table-cell mobile-no-column">
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
      
      <button type="button" className="action-button">
       <FaEdit
            style={{ color: "purple" }}
            className="cursor-pointer mx-2"
            
        />
      </button>
    }
  >
    {close => 
    (
      <form className="form-container" onSubmit={this.submitForm}>
        
        <input
          className="input-ele"
          onChange={this.changeFirstName}
          value={formData.firstName}
          type="text"
        /><br/>
        <input
          className="input-ele"
          onChange={this.changeLastName}
          value={formData.lastName}
          type="text"
        /><br/>
        <input
          className="input-ele"
          onChange={this.changeAge}
          value={formData.age}
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
     <FaTrashAlt
           
            className="delete-icon"
            
          />
 
</button>
</div>
        
      </div>
    </li>
      
       
      
   
    );
  }
  
}

export default EachCard;





