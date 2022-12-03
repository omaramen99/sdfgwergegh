
//------------------------------------
//-------------------------------------------------
import './Profile_Page_comp.css';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import ReactDOM from "react-dom";
import React from "react";
import Header_comp from '../Header_comp/Header_comp';
import TaskUnit_comp from '../TaskUnit_comp/TaskUnit_comp';
import ProjectCard_comp from '../ProjectCard_comp/ProjectCard_comp';

import Task_comp from '../Task_comp/Task_comp';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHistoryObj, setMatchObj, setUserProjectsData, setUserProjects,setUserProjectsComp} from '../store/actions';
import { centerData } from '../Data';
import Task_HISTORY_comp from '../Task_HISTORY_comp/Task_HISTORY_comp';
 class Profile_Page_comp extends React.Component {
  state = {
    userProjects:[],
    userProjectsToModal:[],
    ProjectsData:[],
    tableA : "",
    tableB : "",
    userPhoto:"",
    departmentsData:[],
    departments:[],

    activeTable:"",
    ATableClassName:"WeekTitleActive",
    BTableClassName:"WeekTitle",


    taskHistory:"",
    

    projectDropDownState : 0
  };
  // constructor(props)
  // {
   
  //   super(props);
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

    this.setState({
      userPhoto:this.props.state.userData.Photo
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
    //console.log("99999999999999999999999999999999999999999999999999w9");
    axios(configDep)
    .then(function (response) {
     // console.log(response.data);
      setDepartmentsData(response.data);
      setDepartments(response.data)
    })
    .catch(function (error) {
      //console.log(error);
    });


    var assignToUserProjects = (data,teams,leaders) => {

      for (let i = 0; i < data.length; i++) {
        if (data[i].Code != 0) {
          this.setState({
            userProjects:[...this.state.userProjects, <ProjectCard_comp teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"explore"} /> ],
            userProjectsToModal:[...this.state.userProjectsToModal, <ProjectCard_comp  teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"Add Task"} /> ],
            ProjectsData:[...this.state.ProjectsData,data[i]]
          });

        }else{
        
          if (this.props.state.userData.DepartmentName == "HR") {
            this.setState({
              userProjects:[...this.state.userProjects, <ProjectCard_comp teamLeader={leaders[i]} team={teams[i].teamId} data={data[i]} type={"explore"} /> ],
            })
          }

        }
        
      }
     
    } 
    
    var assignUserProjectToStore = () => {this.props.setUserProjectsData(this.state.ProjectsData)}
    var sendProjectsDataToTables = () => {
 
var setToStateA = () => 
{
  this.setState({
    tableA :  < Task_comp key={"tableA"} id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
    tableB :  < Task_comp key={"tableB"} id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.userData._id}/>
  });

  this.setState({
    activeTable :  this.state.tableA
  });
}
var setToStateB = () => 
{
  this.setState({
    tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
  });
  this.setState({
    activeTable :  this.state.tableA
  });
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
      //  console.log(error);
      });



    //   this.setState({
    //   tableA :  < Task_comp id={this.props.state.currentWeeks.current.id} date={this.props.state.currentWeeks.current.start} projects={this.state.userProjectsToModal} userID={this.props.state.userData._id} />,
    //   tableB :  < Task_comp id={this.props.state.currentWeeks.last.id}  date={this.props.state.currentWeeks.last.start}  projects={this.state.userProjectsToModal} userID={this.props.state.userData._id}/>
    // });
  }
  var setGlobalUserProjects = (data) =>{
    var ProjectComponentArray = [];
    for (let i = 0; i < data.length; i++) {
      
      ProjectComponentArray.push(<a class="dropdown-item dropDownMenuBodyEle" ProjectData={data[i]}  onClick={() => {this.props.state.OnProjectSelectedFunc(data[i])}}>{data[i].Name}</a>);
    }
    //setUserProjectsComp
    this.props.setUserProjects(data);
    this.props.setUserProjectsComp(ProjectComponentArray);
  }
    var config1 = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/allTeamss?id=${this.props.state.userData._id}`,
      headers: { }
    };
    var teamData = [];
    var teamleaders = [];
    axios(config1)
    .then(function (response) {
     // console.log((response.data));
      teamData = [response.data.teams];
      teamleaders = [response.data.teamLeaders];
      console.log(teamData);
      console.log(teamleaders);
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
      
        console.log(responsee.data);
        setGlobalUserProjects(responsee.data)
        //console.log(this.props);
        //this.props.setUserProjects(responsee.data);
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
      
      //console.log(newpswd);
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
       // console.log(error);
      });
    }

  }

   change() {
    var fileInput = document.getElementById('myFile');
    fileInput.click();
    
}
 uploadPhoto(params) {


  ///////////////////////////////////////////////////
  //var imagee = document.getElementById('ss')
  var oldSrc = this.state.userPhoto;
  //this.props.state.userData.Photo
  this.setState({
    userPhoto:'https://i.ibb.co/Hpcwq8r/sdffi.gif'
  })
  //imagee.src =  'https://i.ibb.co/Hpcwq8r/sdffi.gif'
  //
  ////////////////////////////////////////////////////


  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
          var fileInput = document.getElementById('myFile');
  var formdata = new FormData();
  formdata.append("image", fileInput.files[0]);      
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch(`https://api.imgbb.com/1/upload?key=d268b013f9da0340ef577dedda98e806&name=sdffi`, requestOptions)
    .then(response => {
      //  console.log(response);
       return response.text()
      })
    .then(result => {
        //console.log(JSON.parse(result));


        //change in my DB too///


        //imagee.src = JSON.parse(result).data.url;
        this.setState({
          userPhoto: JSON.parse(result).data.url
        })

        var data = JSON.stringify({
          "Photo": JSON.parse(result).data.url

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
       //   console.log(response.data);
        })
        .catch(function (error) {
        //  console.log(error);
          this.setState({
            userPhoto:oldSrc
          })
        });

  })
    .catch(error => {
        //console.log('error', error)
        this.setState({
          userPhoto:oldSrc
        })
        //imagee.src =  oldSrc
      });


  
}
logout()
{
  window.location.reload();

}
addNewUser()
{
  var currentWeekId = this.props.state.currentWeeks.current.id;
  var closeBtn = document.getElementById("modalclosebutton");
  var name = document.getElementById("usr").value;
  var title = document.getElementById("title").value;
  var code = document.getElementById("code").value;
  var username = document.getElementById("usrname").value;
  var password = document.getElementById("pswd").value;
  var dep = document.getElementById("selection");
  var depName = dep.value;
  var depID ="" ;
  var depColor = "";
  var userRole = "";
  if (name) {
    if (username) {
      if (password) {
        if (depName) {
          if (title) {
            if (code) {

          userRole = title;

          for (let i = 0; i < this.state.departmentsData.length; i++) {
            if (depName == this.state.departmentsData[i].Name) {
              depID = this.state.departmentsData[i]._id;
              depColor = this.state.departmentsData[i].Color;
            }
            
          }
          //REQUEST
          
          var data = JSON.stringify({
            "Name": name,
            "UserName": username,
            "Password": password,
            "Department": depID,
            "DepartmentName": depName,
            "DepartmentColor": depColor,
            "Role": userRole,
            "Code": code,
          });
          
          var config = {
            method: 'post',
            url: `${centerData.BackEndURL}/api/AddNewUser`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          //  console.log(response.data);


            var dataa = JSON.stringify({
              "WeekID": currentWeekId,
              "UserID": response.data._id,
              "DepartmentName": depName
            });
            
            var configf = {
              method: 'post',
              url: `${centerData.BackEndURL}/api/CreateNewWeeklyTask`,
              headers: { 
                'Content-Type': 'application/json'
              },
              data : dataa
            };
            
            axios(configf)
            .then(function (response) {
            //  console.log(response.data);


              
                         alert("Added sucessfully!")
                         closeBtn.click();
                         document.getElementById("usr").value = "";
                         document.getElementById("usrname").value = "";
                         document.getElementById("pswd").value = "";

            })
            .catch(function (error) {
             // console.log(error);
            });



          })
          .catch(function (error) {
           // console.log(error);
          });


          



            }
          }
        }
        
      }
      
    }
    
  }
  


  //console.log(name);
  //console.log(username);
  //console.log(password);
}

toggleTable(e)
{
  if (e.target.id == "tabletitlea") {
    console.log(e.target.id);
    this.setState({
      activeTable : {}
    });
    this.setState({
      activeTable : this.state.tableA,
      ATableClassName :"WeekTitleActive",
      BTableClassName :"WeekTitle"
    });

  }else
  {
    this.setState({
      activeTable : {}
    });
    console.log(e.target.id);
    this.setState({
      activeTable : this.state.tableB,
      BTableClassName :"WeekTitleActive",
      ATableClassName :"WeekTitle"
    });

  }
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
  try {
    return `${new Date(this.props.state.currentWeeks.current.start).getFullYear()}-${this.getMAX()}-${new Date(this.props.state.currentWeeks.current.start).getDate().toString().length < 2 ? "0"+new Date(this.props.state.currentWeeks.current.start).getDate().toString(): new Date(this.props.state.currentWeeks.current.start).getDate().toString()}T00:00`;
  } catch (error) {}
}

getWeekHistory()
{
  var ddd = document.getElementById("meeting-time");
  var dddd = new Date(ddd.value);


  //get last fridayof the selected date:
  //ref: https://upokary.com/how-to-get-last-monday-or-last-friday-or-any-last-day-in-javascript/
  dddd.setDate(dddd.getDate() - (dddd.getDay() + 2) % 7);

  

  var resetHistoryTask = () =>
  {
  this.setState({taskHistory :  ""})
  }
  var updateHistoryTask = (weekID,date) =>
  {
  this.setState({taskHistory :  < Task_HISTORY_comp id={weekID} date={date}  userID={this.props.state.userData._id} />})
  }

  var config = {
    method: 'get',
    url: `${centerData.BackEndURL}/api/allWeeks?sort=d`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    //console.log(response.data);
   // var datee = new Date(response.data[0].Start_Fri);
   // console.log(datee.getDate());
    
    //{date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`}
for (let i = 0; i < response.data.length; i++) {
  var dateee = new Date(response.data[i].Start_Fri);
  if ((dateee.getDate()) == (dddd.getDate()) && (dateee.getMonth()+1) == (dddd.getMonth()+1) && (dateee.getFullYear()) == (dddd.getFullYear())) {


    // console.log(dateee);
    // console.log(i);
    resetHistoryTask();
    updateHistoryTask(response.data[i]._id,response.data[i].Start_Fri);
   // window.scrollTo(0,document.body.scrollHeight);

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






  render() {
    return (
      <>
      <Header_comp />
  {/* <div  className={`depRippon ${this.props.state.userData.DepartmentColor}${this.props.state.userData.DepartmentColor}`}>
            <div class="cc">{this.props.state.userData.DepartmentName}</div>
        
        <div class="avatarContainer">
        <img id="ss" src={this.state.userPhoto} alt=""/>
        <div class="changePhoto"><button type="button" class="btn btn-info" onClick={() => this.change()}>Upload <i class="fas fa-upload"></i></button></div>
        <form class="pickerForm"  action="/action_page.php"><input type="file" accept="image/*" id="myFile" onChange={() =>  this.uploadPhoto()} name="filename"/></form>
    </div>
</div> */}

<div class="container profileContainer">
    <div class="row">
        <div class="col-md-4 leftProfile">
          <div className='new_leftContentContainer container'>
            <div className='row '>
              <div className='col-9 left-leftSide'>
                <div className='EmpCardTitle'>Employee Info </div>
                <div className='infoCardLine'>Emp Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.userData.Name}</span></div>
                <div className='infoCardLine'>Emp Department &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.userData.DepartmentName}</span></div>
                <div className='infoCardLine'>Title &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>{this.props.state.userData.Role}</span></div>
                <div className='infoCardLine'>Emp working hours &nbsp;<span className='infoSpan'>{this.props.state.userData.WorkedHours + this.props.state.userData.TotWorkedHours}</span> Hrs</div>
                <div className='infoCardLine'>Emp overtime hours <span className='infoSpan'>{this.props.state.userData.OverTimeHours}</span> Hrs</div>
                <div className='infoCardLine'>Code <span className='infoSpan'>{this.props.state.userData.Code ? this.props.state.userData.Code : this.props.state.userData._id}</span></div>
              </div>
              <div className='col-3 left-rightSide'>
                <div className='avatarImgContainer'>

              <img id="ss" className='avatarImgTag' src={this.state.userPhoto} alt=""/>
                </div>
              </div>
            </div>
          </div>
    {this.props.state.userData.Role == "Admin" || this.props.state.userData.Role == "HR"? (<button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#myModal2" >Add Emp <i class="fas fa-user-plus"></i></button>):("")}
    <button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#myModal3" >Change Password <i class="fas fa-unlock-alt"></i></button>
    <button type="button" class="btn btn-outline-dark vacationBtn" onClick={() => {this.logout()}} >Log Out <i class="fas fa-sign-out-alt"></i></button>
            
            {/* <div class="leftContentContainer">
                
                <h1 class="ProfileUserName">{this.props.state.userData.Name}</h1>
                <h5 class="ProfileUserDep">Department: <span class={`depName ${this.props.state.userData.DepartmentColor}` }>{this.props.state.userData.DepartmentName}</span></h5>

            </div> */}

        </div>
        <div class="col-md-8 rightProfileSec">
            {/* <div class="rightContentContainer">
                <h3>Worked: <span> <span class="greenHours">{this.props.state.userData.WorkedHours + this.props.state.userData.TotWorkedHours}</span> Hrs</span></h3>
                <hr/>
                <h3>OverTime: <span> <span class="greenHours">{this.props.state.userData.OverTimeHours}</span>  Hrs</span></h3>
                <hr/>
                <h5 class="lastUpdate">**Updating in Tuesday</h5>
            </div> */}
                      <div className='new_leftContentContainer container'>
            <div className='row'>
              <div className='col-12 left-leftSide'>
                <div className='EmpCardTitle'>Timesheet Info </div>
                <div className='infoCardLineRightRight'>Timesheet Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='infoSpan'>
                  {/* {this.props.state.userData.Name} */}
                  <>
        {/* <h3>history</h3> */}
        <input type="datetime-local" id="meeting-time" name="meeting-time" min="2021-10-22T00:00" max={this.max()} />
        <button type="button" class="btn btn-primary infoSearchHistory" onClick={()=>{this.getWeekHistory()}} ><i class="fas fa-search"></i></button>
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
    {/* <div class="profileBtns" >
    
    {this.props.state.userData.Role == "Admin" || this.props.state.userData.Role == "HR"? (<button type="button" class="btn btn-outline-dark vacationBtn" data-toggle="modal" data-target="#myModal2" >Add User <i class="fas fa-user-plus"></i></button>):("")}
    <button type="button" class="btn btn-outline-warning vacationBtn" data-toggle="modal" data-target="#myModal3" >Change Password <i class="fas fa-unlock-alt"></i></button>
    <button type="button" class="btn btn-outline-danger vacationBtn" onClick={() => {this.logout()}} >Log Out <i class="fas fa-sign-out-alt"></i></button>

    </div> */}



          {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal3">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Change Password</h4>
          <button type="button" class="close" data-dismiss="modal" id="ChangePasswordClose">&times;</button>
        </div>
        
        {/* <!-- Modal body --> */}
        <div class="modal-body">
            <form>
                <div class="container">
                    

                    <div class="row">

                        
                        <div class="col-sm-3"><label for="newpswd">New password:</label></div>
                        <div class="col-sm-9">
                            <input type="password" class="form-control" id="newpswd"/>

                        </div>

                    </div>
                    



                </div>

              </form>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">

              <button type="button" class="btn btn-warning" onClick={() => {this.ChangePassword()}}>Change</button>
        </div>
        
      </div>
    </div>
  </div>






      {/* <!-- The Modal --> */}
  <div class="modal fade" id="myModal2">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
      
        {/* <!-- Modal Header --> */}
        <div class="modal-header">
          <h4 class="modal-title">Add New User</h4>
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

                        
                        <div class="col-sm-3"><label for="usrname">username:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="usrname"/>

                        </div>

                    </div>
                    <hr/>
                    <div class="row">

                        
                        <div class="col-sm-3"><label for="pswd">password:</label></div>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="pswd"/>

                        </div>

                    </div>
                    <hr/>
                    <div class="row">
                        <div class="col-sm-3">Select Department</div>
                        <div class="col-sm-9">
                            <select id="selection" name="dep" class="custom-select">
                              {this.state.departments}
                              {/* <option value="volvo">Volvo</option>
                              <option value="fiat">Fiat</option>
                              <option value="audi">Audi</option> */}
                            </select>

                        </div>

                    </div>


                </div>

              </form>
        </div>
        
        {/* <!-- Modal footer --> */}
        <div class="modal-footer">

              <button type="button" class="btn btn-dark" onClick={() => {this.addNewUser()}}>ADD</button>
        </div>
        
      </div>
    </div>
  </div>









    <hr/>

    <h1>Tasks</h1> 
    <br/>

    <h3 onClick={(e) => {this.toggleTable(e)}} id='tabletitlea' className={this.state.ATableClassName}>Current Week</h3> {this.state.tableB == "" ? (""):( <h3 onClick={(e) => {this.toggleTable(e)}} id='tabletitleb' className={this.state.BTableClassName}>Last Week</h3>)}
    {this.state.activeTable}
     <br/>
     {/* {this.state.tableB == "" ? (""):(
       <h3>Last Week</h3>
     )} */}
     
     {/* {this.state.tableB} */}
     
      

        <hr/>
        <h1 className={this.state.projectDropDownState == 0 ? (`dropdownProjects`):(`dropdownProjectsActive`)} onClick={() => {this.ToggleProjectDropDown()}}>Applied on {this.state.projectDropDownState == 0 ? (`▼`):(`▲`)}</h1>
        <div className='appliedOnCont'>
        {this.state.projectDropDownState == 0 ? (``):(this.state.userProjects)}
        </div>
        






        {/* <>
        <h3>history</h3>
        <input type="datetime-local" id="meeting-time" name="meeting-time" min="2021-10-22T00:00" max={this.max()} />
        <button type="button" class="btn btn-info" onClick={()=>{this.getWeekHistory()}}>Info</button>
        {this.state.taskHistory}
        </> */}
      
</div>



      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setHistoryObj, setMatchObj,setUserProjectsData,setUserProjects,setUserProjectsComp})(Profile_Page_comp);





// //------------------------------------
// //-------------------------------------------------
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