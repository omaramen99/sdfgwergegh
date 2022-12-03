
//------------------------------------
//-------------------------------------------------
import './TaskUnit_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserData,setUpdateId,setIsUpdating,OnProjectSelected } from '../store/actions';

import {Helmet} from "react-helmet";
//import { setSkillPageData } from '../store/actions';

import { centerData } from '../Data';

 class TaskUnit_comp extends React.Component {
  state = {
    taskMode : 0,
    _id:"",
    WorkingDetails:"",
    WeekID:"",
    UserID:"",
    TeamID:"",
    TaskType:"",
    ReviewerComment:"",
    Review:"",
    ProjectID:"",
    IsApproved:"",
    teamData:"",
    projectData:"",
    projectIMG:"",
    D0_w:"",
    D0_o:"",
    D1_w:"",
    D1_o:"",
    D2_w:"",
    D2_o:"",
    D3_w:"",
    D3_o:"",
    D4_w:"",
    D4_o:"",
    D5_o:"",
    D6_o:"",
    CurrentComment:""

  };
componentDidUpdate(){
  //console.log(this.state);
}
  componentDidMount()
  {
    var updateTeamData = (data) => {
      this.setState({
        teamData:data
      })}
      var updateProjectData = (data) => {
     // console.log("/*/**/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/");
     // console.log(data);
      this.setState({
        projectData:data,
        projectIMG:data.img

      })
    }
    this.setState({
      _id:this.props._id,
      WorkingDetails:this.props.WorkingDetails,
      WeekID:this.props.WeekID,
      UserID:this.props.UserID,
      TeamID:this.props.TeamID,
      TaskType:this.props.TaskType,
      ReviewerComment:this.props.ReviewerComment,
      Review:this.props.Review,
      ProjectID:this.props.ProjectID,
      IsApproved:this.props.IsApproved,
      D0_w:this.props.WorkingDetails.D0.W,
      D0_o:this.props.WorkingDetails.D0.O,
      D1_w:this.props.WorkingDetails.D1.W,
      D1_o:this.props.WorkingDetails.D1.O,
      D2_w:this.props.WorkingDetails.D2.W,
      D2_o:this.props.WorkingDetails.D2.O,
      D3_w:this.props.WorkingDetails.D3.W,
      D3_o:this.props.WorkingDetails.D3.O,
      D4_w:this.props.WorkingDetails.D4.W,
      D4_o:this.props.WorkingDetails.D4.O,
      D5_o:this.props.WorkingDetails.D5.O,
      D6_o:this.props.WorkingDetails.D6.O,
      CurrentComment:this.props.TaskType.split('^')[1]
    });
   // console.log(this.state);
    var config1 = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/GetTeam?id=${this.props.TeamID}`,
      headers: { }
    };
    
    axios(config1)
    .then(function (response) {
     // console.log(response.data);
      updateTeamData(response.data)
      
    })
    .catch(function (error) {
     // console.log(error);
    });


    var config2 = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/GetProject?id=${this.props.ProjectID}`,
      headers: { },
    };
    
    axios(config2)
    .then(function (response) {
     // console.log(response.data);
      updateProjectData(response.data)
      //console.log(this.state.WorkingDetails);
    })
    .catch(function (error) {
     // console.log(error);
    });


// console.log(jquery);

// var jq = new jquery();

//document.getElementById("asd").jquery().tooltip(); 
    
//$('[data-toggle="tooltip"]').tooltip(); 
    // $(document).ready(function(){
    //   $('[data-toggle="tooltip"]').tooltip();  
      // console.log($('[data-toggle="tooltip"]')); 
    // });


    this.props.OnProjectSelected((d)=>{
     // console.log(this);
      this.setState({
        projectData:d
      });
    })

  }
  ResetFunctionToProps()
  {
    this.props.OnProjectSelected((d)=>{
      //console.log(this);
      this.setState({
        projectData:d
      });
    })
  }
  // constructor(props)
  // {
   
  //   super(props);
  //   this.state={
  //     complete : ""
  //   };
  // }

  EditHours = (e) => 
  {
    var ele = e.target;
    //console.log(ele.parentElement.innerText);
      ele.addEventListener("keydown", this.Edit);
  }
  Edit = (e) => 
  {
    var ele =e.target.parentElement.children[0];
    // console.log();
     //console.log(e);
 if (e.key >-1 && e.key <10 ) {
         
         ele.innerText += e.key
         
 }else if (e.key == ".") {
         
         var flag = false;
         for (let i = 0; i < ele.innerText.length; i++) {
         if (ele.innerText[i] == ".") {
         flag = true;
             }
         }
         if (!flag) {
          ele.innerText += e.key
         }
         
 }else if (e.key == "Backspace") {
         
         //console.log(ele.innerText[ele.innerText.length - 1]);
         
         ele.innerText =ele.innerText.substring(0, ele.innerText.length - 1);
     }
 
  }

  EditComment = (e) => 
  {

    var ele = e.target;
//console.log(e.target.parentElement);
    //console.log(ele.parentElement.innerText);
      ele.addEventListener("keydown", this.EditCommentLogic);
  }
  EditCommentLogic = (e) => 
  {
    var ele =e.target.parentElement.children[2];
   // console.log(ele.innerHTML);
     //console.log();
     //console.log(e);
     if (e.key == "Backspace") {
         ele.innerText =ele.innerText.substring(0, ele.innerText.length - 1);
     }else if(e.key == " " ||e.key == ""  )
     {
      ele.innerHTML += "  "
     }
     else{
        if (e.key.length <2) {

          ele.innerHTML += e.key
        }
     }

     this.setState({
      CurrentComment:ele.innerHTML
     })
 
  }



  EnterNormalMode(mode)
  {
    


      
      var closeUpdating = () => {this.props.setIsUpdating(false)}
      var setUpdateId = () => 
      {
        //this.props.setUpdateId(Math.random().toString())
        var ss = this.props.state.history.location.pathname;
       //alert(`gonna nav from ${ss}`);
        this.props.state.history.push('/404');
       //alert(`gonna nav to ${ss}`);
        this.props.state.history.push(ss);
      }

      //delete => 0
      //save => 1 
      var NormalTaskModeFunc =  () => this.setState({taskMode:0});
      //LOGIC HERE .....................................................
      if (mode == 0) {
        //DELETE TASK
        var data = '';
  
        var config = {
          method: 'delete',
          url: `${centerData.BackEndURL}/api/justDeleteTask?id=${this.props._id}`,
          headers: { },
          data : data
        };
  
        axios(config)
        .then(function (response) {
        //  console.log(response.data);
  
          closeUpdating();
          NormalTaskModeFunc();
          setUpdateId();
        })
        .catch(function (error) {
          alert("line 224");
        //  console.log(error);
        });
        
      }else if(mode == 1)
      {
        var D5_o = parseFloat(document.getElementById("D5_o").innerText)
        var D6_o = parseFloat(document.getElementById("D6_o").innerText)
        var D0_w = parseFloat(document.getElementById("D0_w").innerText)
        var D0_o = parseFloat(document.getElementById("D0_o").innerText)
        var D1_w = parseFloat(document.getElementById("D1_w").innerText)
        var D1_o = parseFloat(document.getElementById("D1_o").innerText)
        var D2_w = parseFloat(document.getElementById("D2_w").innerText)
        var D2_o = parseFloat(document.getElementById("D2_o").innerText)
        var D3_w = parseFloat(document.getElementById("D3_w").innerText)
        var D3_o = parseFloat(document.getElementById("D3_o").innerText)
        var D4_w = parseFloat(document.getElementById("D4_w").innerText)
        var D4_o = parseFloat(document.getElementById("D4_o").innerText)
        
        console.log(this.state.TaskType);
        var _TaskType =  `${this.state.TaskType.split('^')[0]}^${this.state.CurrentComment}`
        var _ProjectID = this.state.projectData._id;



var LOGIC = (UserState) =>
{


  console.log(UserState);
  var configgg = {
    method: 'get',
    url: `${centerData.BackEndURL}/api/GetTeam?id=${this.props.TeamID}`,
    headers: { }
  };
  var userID  = this.props.state.userData._id;
  var taskID = this.props._id;
  axios(configgg)
  .then(function (response) {
   // console.log(JSON.stringify(response.data));
    if (UserState.state == 1) {
      var data = JSON.stringify({
        "leaderEdit":"true",
        "WorkingDetails": {
          "D0": {
            "W": D0_w,
            "O": D0_o
          },
          "D1": {
            "W": D1_w,
            "O": D1_o
          },
          "D2": {
            "W": D2_w,
            "O": D2_o
          },
          "D3": {
            "W": D3_w,
            "O": D3_o
          },
          "D4": {
            "W": D4_w,
            "O": D4_o
          },
          "D5": {
            "O": D5_o
          },
          "D6": {
            "O": D6_o
          }
          
        },
        "TaskType":_TaskType,
        "ProjectID":_ProjectID,
        "TeamID":UserState.teamId
      });
      
      var config = {
        method: 'put',
        url: `${centerData.BackEndURL}/api/UpdateTaskData?id=${taskID}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
      //  console.log(response.data);
        closeUpdating();
        NormalTaskModeFunc();
        setUpdateId();
      })
      .catch(function (error) {
       // alert("line 306");
      console.log(error);
      });

      
    }else
    {
      var data = JSON.stringify({
        "WorkingDetails": {
          "D0": {
            "W": D0_w,
            "O": D0_o
          },
          "D1": {
            "W": D1_w,
            "O": D1_o
          },
          "D2": {
            "W": D2_w,
            "O": D2_o
          },
          "D3": {
            "W": D3_w,
            "O": D3_o
          },
          "D4": {
            "W": D4_w,
            "O": D4_o
          },
          "D5": {
            "O": D5_o
          },
          "D6": {
            "O": D6_o
          }
        },
        "TaskType":_TaskType,
        "ProjectID":_ProjectID,
        "TeamID":UserState.teamId
      });
      
      var config = {
        method: 'put',
        url: `${centerData.BackEndURL}/api/UpdateTaskData?id=${taskID}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
      //  console.log(response.data);
        closeUpdating();
        NormalTaskModeFunc();
        setUpdateId();
      })
      .catch(function (error) {
       // alert("line 361");
        console.log(error);
      });






    }


  })
  .catch(function (error) {
   // alert("line 375");
    console.log(error);
  });





}





        var data = JSON.stringify({
          "projectID": this.state.projectData._id,
          "UserId": this.props.state.userData._id
        });
        
        var config = {
          method: 'post',
          url: `${centerData.BackEndURL}/api/IsUserBelongToProject`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (UserState) {
          


          LOGIC(UserState.data);




        })
        .catch(function (error) {
          console.log(error);
        });























  
  
      }else if(mode == 2)
      {
        var data = '';

var config = {
  method: 'put',
  url: `${centerData.BackEndURL}/api/ApproveTask?id=${this.props._id}&LeaderId=${this.state.teamData.Leader}`,
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
 // console.log(response.data);
  closeUpdating();
  NormalTaskModeFunc();
  setUpdateId();
})
.catch(function (error) {
  //console.log(error);
  //alert("line 414");
});

      }else if(mode == 3)
      {
        var data = '';

      var config = {
        method: 'put',
        url: `${centerData.BackEndURL}/api/ApproveTask?id=${this.props._id}&LeaderId=${this.state.teamData.Leader}&approval=false`,
        headers: { },
        data : data
      };
      
      axios(config)
      .then(function (response) {
       // console.log(response.data);
        closeUpdating();
        NormalTaskModeFunc();
        setUpdateId();
      })
      .catch(function (error) {
       // console.log(error);
        //alert("line 437");
      });
        }
      }

  CheckEnterMode(){
   // alert("a");
    var EditTaskModeFunc = () => this.setState({taskMode:1});
    var ApprovalTaskModeFunc = () => this.setState({taskMode:2});
    if (!this.props.state.isUpdating) {
      this.props.setIsUpdating(true)
      if (this.props.state.userData._id == this.props.UserID ) {
        //EnterEditMode
        EditTaskModeFunc();
   // alert(1);
      }else if(this.props.state.userData._id== this.state.teamData.Leader){
        //EnterApprovalMode
       // alert(2);
          ApprovalTaskModeFunc();
          
      }else{
        alert("error");
      this.props.setIsUpdating(false)
    //console.log(this.props.UserID);
    //console.log(this.props.state.userData._id);
    //console.log(this.state.teamData.Leader);
    }

    }
  }
  GetProjectCode()
{
  var codeString = `${this.state.projectData.Code}`
  if (codeString.length == 1) {
    return `000${codeString}`
  }else if (codeString.length == 2) {
    return `00${codeString}`
  }else if (codeString.length == 3) {
    return `0${codeString}`
  }else if (codeString.length == 4) {
    return `${codeString}`
  }
}
  ConvertProjectCode(Code)
{
  var codeString = Code
  if (codeString.length == 1) {
    return `000${codeString}`
  }else if (codeString.length == 2) {
    return `00${codeString}`
  }else if (codeString.length == 3) {
    return `0${codeString}`
  }else if (codeString.length == 4) {
    return `${codeString}`
  }
}
ConvertTaskCodeToTaskType(code,c)
{

console.log(code);
  switch (code) {
    case '0000 ': return "OffTime";
    case '0011 ': return "Modeling";
    case '0012 ': return "Coordination";
    case '0013 ': return "Revision";
    case '0014 ': return "Shopdrawing";
    case '0015 ': return "Print/Handover";
    case '0021 ': return "SiteVisit";
    case '0022 ': return "Mission";
    case '0031 ': return "Research";
    case '0032 ': return "Development";
    case '0041 ': return "ControllingDocs";
    case '0051 ': return "RTW-session";
    case '0052 ': return "RTW-coordination";
    case '0053 ': return "RTW-exam";
    case '0054 ': return "RTW-meeting";
    case '0061 ': return "Academy-session";
    case '0062 ': return "Academy-coordination";
    case '0063 ': return "Academy-exam";
    case '0064 ': return "Academy-meeting";
    case '0081 ': return "Vacation";
    case '0082 ': return "Sick Leave";
    case '0083 ': return "Study/master";
    case '0084 ': return "Training";
    case '0085 ': return "Official";
      


    default:
      return "OffTime";
  }


}
SelectTAskType(code)
{
  var _old = this.state.TaskType;
  var _new = `${code} ^ ${_old.split('^')[1]}`;
this.setState({
  TaskType:_new
})
}
ToogleDropDown(ID)
{
  console.log(ID);
  var x =  document.getElementById(ID);
  console.log(x);
  x.click();
}
static SelectProjectForTask(data){
 
console.log(this);
TaskUnit_comp.tttt()
this.yyyyy();
// TaskUnit_comp.setState({
//   projectData:data
// })
}
static tttt(){
  console.log(this);
  // this.setState({
  //   projectData:{}
  // })
}
yyyyy(){
  console.log(this);
}

  render() {


    return (
      <>
      {/* <!-- ---------------------------------------- --> */}
{this.state.taskMode == 0? (

            <div class="col-12 TaskRecord">
                <div class="row">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell">
                  {!this.state.IsApproved? (
                    
                    <i id="asd" class="fas fa-exclamation-circle" data-toggle="tooltip" title="pending approval"></i>
                  ):(
                    <i class="fas fa-check-circle" data-toggle="tooltip" title="approved"></i>
                  )}
                </div>
                {
                  (this.props.state.userData._id == this.state.teamData.Leader) || (this.props.state.userData._id == this.props.UserID && !this.state.IsApproved)? (

                    <div class="col-3 taskCell cellBtn" onClick={(e) => {this.CheckEnterMode()}}><i class="fas fa-cog"></i></div>
                  ):(
                    <div class="col-3 taskCell"><i class="fas fa-cog disdis"></i></div>
                  )
                }
                
                <div class="col-6 taskCell"><span class="taskTypeSpan">{this.state.TaskType.split('^')[0]}</span></div></div></div>
                <div class="col-1 taskMainCell"><div class="row"><div class="col-12 taskCell ProjectCell" style={{backgroundImage: `url("${this.state.projectIMG}")`}}><span class="ProjectName">{this.GetProjectCode()}</span><button onfocus="" onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-3 taskMainCell"><div class="row"><div class="col-12 taskCell"><span>{`[${this.ConvertTaskCodeToTaskType(this.state.TaskType.split('^')[0],0)}] ${this.state.TaskType.split('^')[1]}`}</span><button onfocus="" onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
               
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span>{this.state.D5_o}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D6_o}</span></div><div class="col-3 taskCell "><span>{this.state.D0_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D0_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D1_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D1_o}</span></div><div class="col-3 taskCell"><span>{this.state.D2_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D2_o}</span></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D3_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D3_o}</span></div><div class="col-3 taskCell"><span>{this.state.D4_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D4_o}</span></div></div></div>
                
                {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>{this.state.ReviewerComment}</span></h6></div> */}
                {/* <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>N/A</span></h6></div> */}
                </div>
            </div>
):("")}
                
                {/* <!-- .......................Edit Mode............................... --> */}
                {this.state.taskMode == 1? (
            <div class="col-12 TaskRecordEdit">
                <div class="row">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell cellBtn" onClick={(e) => {this.EnterNormalMode(0)}}><i class="fas fa-trash"></i></div><div class="col-3 taskCell cellBtn" onClick={(e) => {this.EnterNormalMode(1)}}><i class="fas fa-save"></i></div>
                <div class="col-6 taskCelll">
                  {/* A */}
                  <span class="taskTypeSpan">{this.state.TaskType.split('^')[0]}</span>

                  <div class="dropdown">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle taskDropDownBtn" id='dropDownTaskType' data-toggle="dropdown"></button>
                        <div class="dropdown-menu  dropDownMenuBody">
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0000')}}>0000 - OffTime</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0011')}}>0011 - Modeling</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0012')}}>0012 - Coordination</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0013')}}>0013 - Revision</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0014')}}>0014 - Shopdrawing</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0015')}}>0015 - Print/Handover</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0021')}}>0021 - SiteVisit</a>
                          <a class="dropdown-item dropDownMenuBodyEle missionTask" onClick={() => {this.SelectTAskType('0022')}}>0022 - Mission</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0031')}}>0031 - Research</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0032')}}>0032 - Development</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0041')}}>0041 - ControllingDocs</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0051')}}>0051 - RTW-session</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0052')}}>0052 - RTW-coordination</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0053')}}>0053 - RTW-exam</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0054')}}>0054 - RTW-meeting</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0061')}}>0061 - Academy-session</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0062')}}>0062 - Academy-coordination</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0063')}}>0063 - Academy-exam</a>
                          <a class="dropdown-item dropDownMenuBodyEle" onClick={() => {this.SelectTAskType('0064')}}>0064 - Academy-meeting</a>
                          <a class="dropdown-item dropDownMenuBodyEle sickTask" onClick={() => {this.SelectTAskType('0081')}}>0081 - Vacation</a>
                          <a class="dropdown-item dropDownMenuBodyEle sickTask" onClick={() => {this.SelectTAskType('0082')}}>0082 - Sick Leave</a>
                          <a class="dropdown-item dropDownMenuBodyEle sickTask" onClick={() => {this.SelectTAskType('0083')}}>0083 - Study/master</a>
                          <a class="dropdown-item dropDownMenuBodyEle sickTask" onClick={() => {this.SelectTAskType('0084')}}>0084 - Training</a>
                          <a class="dropdown-item dropDownMenuBodyEle sickTask" onClick={() => {this.SelectTAskType('0085')}}>0085 - Official</a>
                        </div>
                      </div> 





                  </div></div></div>
                <div class="col-1 taskMainCell"><div class="row"><div class="col-12 taskCelll">
                  {/* B */}
                  <span class="taskTypeSpan">{this.GetProjectCode()}</span>

                  <div class="dropdown">
                        <button type="button" class="btn btn-outline-primary dropdown-toggle taskDropDownBtn" id='dropDownTaskType' onClick={()=>{this.ResetFunctionToProps()}} data-toggle="dropdown"></button>
                          <div class="dropdown-menu  dropDownMenuBody">
                          {this.props.state.UserProjectsComp}
                        </div>
                      </div> 






                  </div></div></div>
                <div class="col-3 taskMainCell"><div class="row"><div class="col-12 taskCell">
                  {/* C */}
                  <button className='editComment' onClick={(e) => {this.EditComment(e)}}></button>
                  <span>{`[${this.ConvertTaskCodeToTaskType(this.state.TaskType.split('^')[0],this.state.TaskType)}]`}</span>
                  <span>{this.state.TaskType.split('^')[1]}</span>
                  </div></div></div>

                
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span id="D5_o">{this.state.D5_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D6_o">{this.state.D6_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell "><span id="D0_w">{this.state.D0_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D0_o">{this.state.D0_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span id="D1_w">{this.state.D1_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D1_o">{this.state.D1_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell"><span id="D2_w">{this.state.D2_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D2_o">{this.state.D2_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span id="D3_w">{this.state.D3_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D3_o">{this.state.D3_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell"><span id="D4_w">{this.state.D4_w}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div><div class="col-3 taskCell overtimeCell"><span id="D4_o">{this.state.D4_o}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtn"></button></div></div></div>
                {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>{this.state.ReviewerComment}</span></h6></div> */}
                {/* <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span></h6></div>
                <div class="col-8 taskCell"><h6>Comment: <span>N/A</span></h6></div> */}

                </div>
            </div>


):("")}
{/* <!-- .......................Approval Mode............................... --> */}
                {this.state.taskMode == 2? (
                  
              <div class="col-12 TaskRecordEdit">
              <div class="row">
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(3)}}><i class="fas fa-times"></i></div><div class="col-3 taskCell" onClick={(e) => {this.EnterNormalMode(2)}}><i class="fas fa-check"></i></div><div class="col-6 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCellDisabled"></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell"><span>{this.state.D5_o}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D6_o}</span></div><div class="col-3 taskCell "><span>{this.state.D0_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D0_o}</span></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D1_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D1_o}</span></div><div class="col-3 taskCell"><span>{this.state.D2_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D2_o}</span></div></div></div>
              <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><span>{this.state.D3_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D3_o}</span></div><div class="col-3 taskCell"><span>{this.state.D4_w}</span></div><div class="col-3 taskCell overtimeCell"><span>{this.state.D4_o}</span></div></div></div>
               
              {/* <div class="col-4 taskCell"><h6>Rate: <span>{this.state.Review}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtnn"></button></h6></div>
              <div class="col-8 taskCell"><h6 >Comment: <span>{this.state.ReviewerComment}</span><button onFocus={(e) => {this.EditHours(e)}} onblur="console.log('blured')" class="EditBtnn"></button></h6></div> */}
              {/* <div class="col-4 taskCell"><h6><span class="aawerdg">{this.state.TaskType.split('^')[1]}</span><button  class="EditBtnn"></button></h6></div>
              <div class="col-8 taskCell"><h6 >Comment: <span>N/A</span><button   class="EditBtnn"></button></h6></div> */}
              </div>
          </div>


):("")}











            























                {/* <!-- ---------------------------------------- --> */}
                <Helmet>
                <script>{`                $(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();  
  console.log($('[data-toggle="tooltip"]')); 
});`
                  
                  
                  
                  }


                </script>
                
            </Helmet>


      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setUserData,setUpdateId,setIsUpdating,OnProjectSelected})(TaskUnit_comp);





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