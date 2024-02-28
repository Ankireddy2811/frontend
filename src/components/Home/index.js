import {Component} from "react"


import {IoMdAdd} from "react-icons/io"

import Popup from "reactjs-popup";

import 'reactjs-popup/dist/index.css';

import EachCard from "../EachCard"

import "./index.css"

class Home extends Component{

 state = {studentsData:[],isSaveClicked:false,
         addDataForm:{
                firstName:"",
                lastName:"",
                email:"",
                age:"",
                classId:""
        }
      }

 componentDidMount(){
    this.getStudentsData();
    // this.getClassData();

 }


 getStudentsData = async()=>{
  const response = await fetch("http://localhost:3011/students")
  const data = await response.json()
  console.log(data);
  const updatedStudentsData = data.map(eachItem=>({
    firstName:eachItem.first_name,
    lastName:eachItem.last_name,
    age:eachItem.age,
    email:eachItem.email,
    id:eachItem.student_id,
    classId:eachItem.class_id
  }))
  this.setState({studentsData:updatedStudentsData})
 }

 
//  getClassData = async () => {
//   const { studentsData } = this.state;
//   const response = await fetch("http://localhost:3011/classes");
//   const classesData = await response.json();
//   console.log(classesData)
//   const updatedStudentsData = studentsData.map(student => {
//   const matchingClass = classesData.find(cls => cls.class_id === student.classId);
//   console.log(matchingClass)
    
//     if (matchingClass) {
//       return {
//         ...student,
//         className: matchingClass.class_name
//       };
//     } else {
//       return student;
//     }
//   });

  
//   this.setState({ studentsData: updatedStudentsData });
// };


 getUpdatedData = async(dataValues)=>{
  const options = {
    method:"PUT",
    headers: {
      "Content-Type": "application/json", 
    },
    body:JSON.stringify({
      first_name:dataValues.firstName,
      last_name:dataValues.lastName,
      email:dataValues.email,
      age:dataValues.age,
      class_id:dataValues.classId
    })
  }
    
  console.log(dataValues)
  
  const response = await fetch(`http://localhost:3011/students/update/${dataValues.id}`,options)
  console.log(response)
  this.getStudentsData()
 }

 getDeleteData = async(id)=>{
  const options = {
    method:"DELETE",
   
  }
  const response = await fetch(`http://localhost:3011/students/delete/${id}`,options)
  console.log(response)
  this.getStudentsData()
  
 }


 addFirstName = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,firstName:event.target.value}}))
 }

 addLastName = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,lastName:event.target.value}}))
 }


 addEmail = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,email:event.target.value}}))
 }

 addAge = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,age:event.target.value}}))
 }

 addClassId = (event)=>{
  this.setState(prevState=>({addDataForm: {...prevState.addDataForm,classId:event.target.value}}))
 }

 onAddSubmitForm = async(event)=>{
  event.preventDefault()
  const {addDataForm} = this.state
  const options = {
    method:"POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body:JSON.stringify({
       first_name:addDataForm.firstName,
       last_name:addDataForm.lastName,
       email:addDataForm.email,
       age:addDataForm.age,
       class_id:addDataForm.classId

    })
  }
  
    const response = await fetch(`http://localhost:3011/students/create`,options)

    console.log(response)
    const data = await response.json()
    console.log(data)
    this.getStudentsData();
    this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))

 }

 onCloseButton = ()=>{
  this.setState(prevState=>({isSaveClicked:!prevState.isSaveClicked}))
}
  

 render(){
  const {studentsData,isSaveClicked} = this.state
  const saveText = isSaveClicked ? "saved":"save"

  return(
    <div className="home-container">
     <div className="heading-button">
     <h1 className="first-main-heading">Students & Class Information Management</h1>
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
                onChange={this.addFirstName}
                placeholder="Enter first Name"
            
              /><br/>
               <input
                className="input-ele"
                onChange={this.addLastName}
                placeholder="Enter last Name"
            
              /><br/>
             
              <input
                className="input-ele"
                onChange={this.addEmail}
                placeholder="Enter Email"
              /><br/>
               <input
                className="input-ele"
                onChange={this.addAge}
                placeholder="Enter age"
              /><br/>
               <input
                className="input-ele"
                onChange={this.addClassId}
                placeholder="Enter class id"
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
   <ul className="students-table">
            <li className="table-header">
              {/* <p className="table-header-cell name-column">SNO</p>
              <hr className="separator" /> */}
              <p className="table-header-cell name-column">First Name</p>
              <hr className="separator" />
              <p className="table-header-cell name-column">Last Name</p>
              <hr className="separator" />
              <p className="table-header-cell name-column">Class Id</p>
              <hr className="separator" />
              <p className="table-header-cell name-column">Email</p>
              <hr className="separator" />
              <p className="table-header-cell name-column">Age</p>
              <hr className="separator" />
              <p className="table-header-cell">Actions</p>
            </li>
            {studentsData.map(eachItem=>(<EachCard key={eachItem.id} eachUser={eachItem} getUpdatedData={this.getUpdatedData} getDeleteData={this.getDeleteData}/>))}
      </ul>
        
         
       
    
    
   </ul>
    </div>
   
  )

}

}

export default Home

