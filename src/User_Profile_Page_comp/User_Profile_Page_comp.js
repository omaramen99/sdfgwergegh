
//------------------------------------
//-------------------------------------------------
import './User_Profile_Page_comp.css'; 
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';

import ProjectCard_comp from '../ProjectCard_comp/ProjectCard_comp';
import {Helmet} from "react-helmet";
import Task_comp from '../Task_comp/Task_comp';
import Task_HISTORY_comp from '../Task_HISTORY_comp/Task_HISTORY_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj,setUserProjectsData,setUserProfile } from '../store/actions';
import { centerData } from '../Data';
 class User_Profile_Page_comp extends React.Component {
  state = {
    userProjects:[],
    userProjectsToModal:[],
    ProjectsData:[],
    tableA : "",
    tableB : "",
    userPhoto:"",
    departmentsData:[],
    departments:[],
    taskHistory:"",
    projectDropDownState : 0,
    loadingReportElement : <><i class="fas fa-file-excel"></i></>
    
  };
  // constructor(props)
  // {<div class="spinner-grow spinner-grow-sm"></div><span class="spinner-border spinner-border-sm"></span>
   
  //   super(props);<i class="fas fa-file-excel"></i>
  //   this.state={
  //     complete : ""
  //   };
  // }
  componentDidMount()
  {

    if (!this.props.state.userData._id) 
    {
      window.location.pathname = "/"
    }
    
    if (!this.props.state.user_Data._id || this.props.state.user_Data._id==this.props.state.userData._id) 
    {
      //window.location.pathname = "/profile"
      this.props.state.history.push('/profile');
    }

    this.setState({
      userPhoto:this.props.state.user_Data.Photo
    })






    var configDep = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/AllDepartments`,
      headers: { }
    };
    var setDepartmentsData = (data) => {this.setState({departmentsData:data})}
    var setDepartments = (data) => {
      for (let i = 0; i < data.length; i++) {
        this.setState({departments:[...this.state.departments,<option value={data[i].Name}>{data[i].Name}</option>]})
      }
    }
    axios(configDep)
    .then(function (response) {
      setDepartmentsData(response.data);
      setDepartments(response.data)
    }).then(()=>{
    document.getElementById("selection").value = this.props.state.user_Data.DepartmentName;
    })
    .catch(function (error) {
    });
    //select("selection",this.props.state.user_Data.DepartmentName)
    //document.getElementById("selection").value = this.props.state.user_Data.DepartmentName;
    if (this.props.state.user_Data.CV_URL) {
      if (this.props.state.user_Data.CV_URL == "null") {
        document.getElementById("cv").value = "no link available!";
      }else
      {
        document.getElementById("cv").value = this.props.state.user_Data.CV_URL;
      }
    }else 
    {
      document.getElementById("cv").value = "no link available!";
    }
    document.getElementById("usr").value = this.props.state.user_Data.Name;
    document.getElementById("title").value = this.props.state.user_Data.Role;
    document.getElementById("code").value = this.props.state.user_Data.Code ? this.props.state.user_Data.Code : this.props.state.user_Data._id;



















    var assignToUserProjects = (data,teams,leaders) => {
      for (let i = 0; i < data.length; i++) {
        
       // console.log("00000000000000000000000000000000000000000000000000000000");
       // console.log(data);
       // console.log(teams[i].teamId);
       // console.log(data[i]);
        this.setState({
          userProjects:[...this.state.userProjects, <ProjectCard_comp teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"explore"} /> ],
          userProjectsToModal:[...this.state.userProjectsToModal, <ProjectCard_comp  teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"select"} /> ],
          ProjectsData:[...this.state.ProjectsData,data[i]]
          
        })
        
      }
    } 
    
    var assignUserProjectToStore = () => {this.props.setUserProjectsData(this.state.ProjectsData)}
    var sendProjectsDataToTables = () => {
      var setToStateA = () =>  
{
      this.setState({
      tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />,
      tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
    })
    }
    var setToStateB = () => 
    {
      this.setState({
      tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
      
    })
    }
          var config = {
            method: 'get',
            url: `${centerData.BackEndURL}/api/GetWeek?id=${this.props.state.currentWeeks.last.id}`,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
           // console.log(response.data);
            if (!response.data.isCalculated) {
              setToStateA()
            }else
            {
              setToStateB()
            }
          })
          .catch(function (error) {
           // console.log(error);
          });


    //   this.setState({
    //   tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />,
    //   tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.user_Data._id} />
    // })
  }
    var config1 = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/allTeamss?id=${this.props.state.user_Data._id}`,
      headers: { }
    };
    var teamData = [];
    var teamleaders = [];
    axios(config1)
    .then(function (response) {
     // console.log((response.data));
      teamData = [response.data.teams];
      teamleaders = [response.data.teamLeaders];
      
      var data = JSON.stringify({
        "ProjectsIDs": [...response.data.projects]
      });
      
      var config = {
        method: 'post',
        url: `${centerData.BackEndURL}/api/GetProjects`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (responsee) {
       // console.log("///////////////////////////////////////////////////");

       // console.log(responsee.data);
        assignToUserProjects(responsee.data,teamData[0],teamleaders[0]);
        assignUserProjectToStore();
        sendProjectsDataToTables();
      })
      .catch(function (error) {
       // console.log(error);
      });






    })
    .catch(function (error) {
     // console.log(error);
    });


  }
  ChangePassword()
  {
    var forceLogout = () => {this.logout()}
    var ChangePasswordClose = () => { document.getElementById("ChangePasswordClose").click()}
    var newpswd = document.getElementById("newpswd").value;
    if (newpswd) {
      
     // console.log(newpswd);
      var data = JSON.stringify({
        "Password": newpswd
      });
      
      var config = {
        method: 'put',
        url: `${centerData.BackEndURL}/api/EditUserPasswordOrPhoto?id=${this.props.state.userData._id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
      //  console.log(response.data);
        ChangePasswordClose();
        forceLogout();
      })
      .catch(function (error) {
      //  console.log(error);
      });
    }

  }

   change() {
    var fileInput = document.getElementById('myFile');
    fileInput.click();
    
}
 uploadPhoto(params) {



  
}
logout()
{
  window.location.reload();
}

UpdateUser()
{
  var RefreshPage = (data) =>  {


    //update state

   this.props.setUserProfile(data);





    //console.log("qqqq");
    this.props.state.history.push('/users');
    this.props.state.history.push('/user');
  }
  
  var closeBtn = document.getElementById("modalclosebutton");
  var name = document.getElementById("usr").value;
  var title = document.getElementById("title").value;
  var code = document.getElementById("code").value;
  var cv = document.getElementById("cv") ? document.getElementById("cv").value : "null";
  var dep = document.getElementById("selection");
  var depName = dep.value;
  var depID ="" ;
  var depColor = "";
  var userRole = "";


var DATA = {};


  if (name) {
    if (title) {
      if (code) {
        if (depName) {
          userRole = title;
          for (let i = 0; i < this.state.departmentsData.length; i++) {
            if (depName == this.state.departmentsData[i].Name) {
              depID = this.state.departmentsData[i]._id;
              depColor = this.state.departmentsData[i].Color;
            }
          }
          
          
          var data = JSON.stringify({
            "Name": name,
            "Department": depID,
            "DepartmentName": depName,
            "DepartmentColor": depColor,
            "Code": code,
            "Role":userRole,
            "CV_URL":cv
          });
          
          var config = {
            method: 'post',
            url: `${centerData.BackEndURL}/api/EditCurrentUser?id=${this.props.state.user_Data._id}`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {

            //alert("Updated sucessfully!");
            closeBtn.click();
            DATA = response.data;

            
          }).then(() =>{
            RefreshPage(DATA);
          }
          )
          .catch(function (error) {
           // console.log(error);
          });
        }
        
      }
      
    }
    
  }
  


 // console.log(name);
 // console.log(username);
 // console.log(password);
}
getMAX()
{
  var aaa = new Date(this.props.state.currentWeeks.current.start).getMonth()+1
  var aaaa = "";
if (aaa < 10) {
  aaaa = `0${aaa}` ;
}else
{
  aaaa = `${aaa}` ;
}

return aaaa ;
}
max()
{
  var date = `${new Date(this.props.state.currentWeeks.current.start).getFullYear()}-${this.getMAX()}-${new Date(this.props.state.currentWeeks.current.start).getDate().toString().length < 2 ? "0"+new Date(this.props.state.currentWeeks.current.start).getDate().toString(): new Date(this.props.state.currentWeeks.current.start).getDate().toString()}T00:00`;
  console.log(date);
  return date;
}
getWeekHistory()
{
  var ddd = document.getElementById("meeting-time");
  var dddd = new Date(ddd.value);

  
  //get last fridayof the selected date:
  //ref: https://upokary.com/how-to-get-last-monday-or-last-friday-or-any-last-day-in-javascript/
  dddd.setDate(dddd.getDate() - (dddd.getDay() + 2) % 7);




  //console.log(dddd.getMonth()+1);
  //console.log(new Date(this.props.state.currentWeeks.current.start).toISOString());
  var resetHistoryTask = () =>
  {
  this.setState({taskHistory :  ""})
  }
  var updateHistoryTask = (weekID,date) =>
  {
  this.setState({taskHistory :  < Task_HISTORY_comp id={weekID} date={date}  userID={this.props.state.user_Data._id} />})
  }

  var config = {
    method: 'get',
    url: `${centerData.BackEndURL}/api/allWeeks?sort=d`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    //console.log(response.data);
   //var datee = new Date(response.data[0].Start_Fri);
   // console.log(datee.getDate());
    
    //{date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`}
for (let i = 0; i < response.data.length; i++) {
  var dateee = new Date(response.data[i].Start_Fri);
  if ((dateee.getDate()) == (dddd.getDate()) && (dateee.getMonth()+1) == (dddd.getMonth()+1) && (dateee.getFullYear()) == (dddd.getFullYear())) {


    // console.log(dateee);
    // console.log(i);
    resetHistoryTask();
    updateHistoryTask(response.data[i]._id,response.data[i].Start_Fri);
    //window.scrollTo(0,document.body.scrollHeight);

    break;
  }
  
}



  })
  .catch(function (error) {
    console.log(error);
  });
  
}


ToggleProjectDropDown()
{
  if(this.state.projectDropDownState == 0) this.setState({projectDropDownState:1}); else this.setState({projectDropDownState:0});
}
clearHistory()
{
  this.setState({taskHistory :  ""})
}
CV_route(link)
{
console.log("############################");
  if (link && link != "null" && link != "no link available!") {
      window.open(link, '_blank');
  }

}


DownloadReport()
{
  this.setState({
    loadingReportElement : <><span class="spinner-border spinner-border-sm"></span></>
  })
  var download = (XMLdata) =>
  {
    const element = document.createElement("a");
    const file = new Blob([XMLdata], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()

    element.download = `${this.props.state.user_Data.Name}_${cDay}_${cMonth}_${cYear}.xml`;
    document.body.appendChild(element);
    element.click();
    this.setState({
      loadingReportElement : <><i class="fas fa-file-excel"></i></>
    })
  }


  var config = {
    method: 'get',
    url: `${centerData.BackEndURL}/api/GetUsersTasks?userId=${this.props.state.user_Data._id}`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    //console.log(response.data);

    download(response.data)

  })
  .catch(function (error) {
    console.log(error);
  });
}


  render() {
    return (
      <>
      <Header_comp />
  {/* <div  className={`depRippon ${this.props.state.user_Data.DepartmentColor}${this.props.state.user_Data.DepartmentColor}`}>
            <div class="cc">{this.props.state.user_Data.DepartmentName}</div>
        
        <div class="avatarContainer">
        <img id="ss" src={this.state.userPhoto} alt=""/>

    </div>
</div> */}

<div class="container profileContainer">
    <div class="row">


        <div class="col-md-4 leftProfile">
          <div className='new_leftContentContainer container'>
            <div className='row '>
              <div className='col-9 left-leftSide'>
                <div className='EmpCardTitle'>Employee Info</div>
                <div className='infoCardLine'>Emp Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.user_Data.Name}</span></div>
                <div className='infoCardLine'>Emp Department &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.user_Data.DepartmentName}</span></div>
                <div className='infoCardLine'>Title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.user_Data.Role}</span></div>
                <div className='infoCardLine'>Emp working hours &nbsp;<span className='infoSpan'>{this.props.state.user_Data.WorkedHours + this.props.state.user_Data.TotWorkedHours}</span> Hrs</div>
                <div className='infoCardLine'>Emp overtime hours <span className='infoSpan'>{this.props.state.user_Data.OverTimeHours}</span> Hrs</div>
                <div className='infoCardLine'>Code <span className='infoSpan'>{this.props.state.user_Data.Code ? this.props.state.user_Data.Code : this.props.state.user_Data._id}</span></div>
              </div>
              <div className='col-3 left-rightSide'>
                <div className='avatarImgContainer'>

              <img id="ss" className='avatarImgTag' src={this.state.userPhoto} alt=""/>
                </div>
              </div>
            </div>
          </div>
          {/* <button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#EditUserModal" >Download CV <i class="fas fa-download"></i></button> */}
        {this.props.state.userData.Role == "Admin" || this.props.state.userData.Role == "HR"? ( this.props.state.user_Data.CV_URL && this.props.state.user_Data.CV_URL != "null" && this.props.state.user_Data.CV_URL != "no link available!"? (<button type="button" class="btn btn-outline-dark vacationBtn" onClick={() => {this.CV_route(this.props.state.user_Data.CV_URL)}}>Download CV <i class="fas fa-download"></i></button>):(<button type="button" class="btn btn-outline-dark vacationBtn" disabled={true} >Download CV <i class="fas fa-download"></i></button>)):("")}
        {this.props.state.userData.Role == "Admin" || this.props.state.userData.Role == "HR"? (<button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#EditUserModal" >Edit Emp <i class="fas fa-user-plus"></i></button>):("")}
        {this.props.state.userData.Role == "Admin" || this.props.state.userData.Role == "HR"? (<button type="button" class="btn btn-outline-dark vacationBtn" onClick={() => {this.DownloadReport()}}>User Report {this.state.loadingReportElement}</button>):("")}
        </div>





<div class="col-md-8 rightProfileSec">
                      <div className='new_leftContentContainer container'>
            <div className='row'>
              <div className='col-12 left-leftSide'>
                <div className='EmpCardTitle'>Timesheet Info </div>
                <div className='infoCardLineRightRight'>Timesheet Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>
                  {/* {this.props.state.userData.Name} */}
                  <>
        {/* <h3>history</h3> */}
        <input type="datetime-local" id="meeting-time" name="meeting-time" min="2021-10-22T00:00" max={this.max()} />

        {this.props.state.userData.DepartmentName == "Admin" || this.props.state.userData.DepartmentName == "HR" ? (
            <button type="button" class="btn btn-primary infoSearchHistory" onClick={()=>{this.getWeekHistory()}} ><i class="fas fa-search"></i></button>
        ):(
            <button type="button" class="btn btn-primary infoSearchHistory noPress" onClick={()=>{this.getWeekHistory()}} disabled='true'><i class="fas fa-search"></i></button>
        ) }


        
        <div className='sepHistory'></div>
        {this.state.taskHistory}
        {this.state.taskHistory == ""? ("") : (
        <button type="button" class="btn btn-danger closeHistoryBtn" onClick={()=>{this.clearHistory()}} >close</button>
        )}
        </>
                  </span></div>

              </div>

            </div>
          </div>

        </div>


    </div>







     
    <div class="modal fade" id="EditUserModal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Edit Emp Data</h4>
          <button type="button" class="close" data-dismiss="modal" id="modalclosebutton">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
            <form>
                <div class="container">

                    <div class="row">
                        <div class="col-sm-3"><label for="usr">Name:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="usr"/>
                        </div>
                    </div>
                    <hr/>


                    <div class="row">
                        <div class="col-sm-3"><label for="code">Code:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="code"/>
                        </div>
                    </div>
                    <hr/>



                    <div class="row">
                        <div class="col-sm-3"><label for="title">Title:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="title"/>
                        </div>
                    </div>
                    <hr/>

                    <div class="row">
                        <div class="col-sm-3"><label for="cv">CV Link:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="cv"/>
                        </div>
                    </div>
                    <hr/>


                    <div class="row">
                        <div class="col-sm-3">Department</div>
                        <div class="col-sm-9">
                            <select id="selection" name="dep" class="custom-select">
                              {this.state.departments}
                            </select>

                        </div>

                    </div>


                </div>

              </form>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">

              <button type="button" class="btn btn-dark" onClick={() => {this.UpdateUser()}}>Update</button>
        </div>
        
      </div>
    </div>
  </div>



    
      




















    <hr/>
    <h1>Tasks</h1>
    <br/>
    <h3>Current Week</h3>
    
     
{this.state.tableA}
     <br/>
     {this.state.tableB == "" ? (""):(
       <h3>Last Week</h3>

     )}
     
     {this.state.tableB}


     <hr/>
      
      
      <h1 className={this.state.projectDropDownState == 0 ? (`dropdownProjects`):(`dropdownProjectsActive`)} onClick={() => {this.ToggleProjectDropDown()}}>Applied on {this.state.projectDropDownState == 0 ? (`▼`):(`▲`)}</h1>
      <div className='appliedOnCont'>
      {this.state.projectDropDownState == 0 ? (``):(this.state.userProjects)}
      </div>





      {/* <br />
      {this.props.state.userData.DepartmentName == "Admin" ? (
        <>
        <h3>history</h3>
        <input type="datetime-local" id="meeting-time"
         name="meeting-time" 
         min="2021-10-22T00:00" max={ this.max()   } />
         
        <button type="button" class="btn btn-info" onClick={()=>{this.getWeekHistory()}}>Info</button>
        {this.state.taskHistory}
        
        </>
      ):("")} */}
</div>



      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setUserProfile})(User_Profile_Page_comp);





// //------------------------------------((dateee.getDate()) == "5" && (dateee.getMonth()+1) == "11" && (dateee.getFullYear()) == "2021") {
// //-------------------------------------------------this.props.state.currentWeeks.current.start
// import './Header_comp.css';
// //import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
// import ReactDOM from "react-dom";
// import React from "react";

// export default class Header_comp extends React.Component {
//   state = {

//   };
//   // constructor(props)
//   // {
   
//   //   super(props);
//   //   this.state={
//   //     complete : ""
//   //   };
//   // }


//   render() {
//     return (
//       <>

//       </>
//     );
//   }

  
// }