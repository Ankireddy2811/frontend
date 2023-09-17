import {Component} from "react"

import {IoMdAdd} from "react-icons/io"

import Popup from "reactjs-popup";

import 'reactjs-popup/dist/index.css';

import EachCard from "../EachCard"

import "./index.css"

class Home extends Component{

state = {usersData:[],isSaveClicked:false,addDataForm:{
  name:"",
  email:"",
  imageurl:""
}}

 componentDidMount(){
   this.getApiData()
 }

 getApiData = async()=>{
  const response = await fetch("https://user-details-92wo.onrender.com/")
  const data = await response.json()
  this.setState({usersData:data})
 }

 getUpdatedData = async(dataValues)=>{
  const options = {
    method:"PUT",
    headers: {
      "Content-Type": "application/json", 
    },
    body:JSON.stringify(dataValues)
  }
  
  const response = await fetch(`https://user-details-92wo.onrender.com/users/${dataValues.id}`,options)
  console.log(response)
  this.getApiData()
 }

 getDeleteData = async(id)=>{
  

  const options = {
    method:"DELETE",
   
  }
  const response = await fetch(`https://user-details-92wo.onrender.com/users/${id}`,options)
  console.log(response)
  this.getApiData()
  
 }

 addImageUrl = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,imageurl:event.target.value}}))
 }

 addName = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,name:event.target.value}}))
 }

 addEmail = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,email:event.target.value}}))
 }

 onAddSubmitForm = async(event)=>{
  event.preventDefault()
  const {addDataForm} = this.state
  const options = {
    method:"POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body:JSON.stringify(addDataForm)
  }
  
  const response = await fetch(`https://user-details-92wo.onrender.com/users`,options)
  console.log(response)
  this.getApiData()
  this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))

 }

 onCloseButton = ()=>{
  this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))
}
  

 render(){
  const {usersData,isSaveClicked} = this.state
  const saveText = isSaveClicked ? "saved":"save"

  return(
    <div className="home-container">
     <div className="heading-button">
     <h1 className="first-main-heading">User Information Management</h1>
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
          <button className="create-button"><span><IoMdAdd className="plus-icon"/></span>Create</button>}
        >
          {close => (
            <form className="form-container" onSubmit={this.onAddSubmitForm}>
              <input
                className="input-ele"
                onChange={this.addImageUrl}
                placeholder="Enter Image Url"
            
              /><br/>
              <input
                className="input-ele"
                onChange={this.addName}
                placeholder="Enter Name"
              /><br/>
              <input
                className="input-ele"
                onChange={this.addEmail}
                placeholder="Enter Email"
              /><br/>
              <div className="buttons-container">
                <button type="submit" className={`edit-button ${isSaveClicked ? 'saved' : ''}`}>{saveText}</button>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() =>{close();this.onCloseButton(); this.onCloseButton(); }}
                >
                  Close
                </button>
              </div>
            </form>
          )}
        </Popup>
    
    </div>
   <ul className="unordered-container">
    {usersData.map(eachItem=>(<EachCard key={eachItem.id} eachUser={eachItem} getUpdatedData={this.getUpdatedData} getDeleteData={this.getDeleteData}/>))}
   </ul>
    </div>
   
  )
 }

}

export default Home