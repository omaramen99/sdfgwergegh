
//------------------------------------
//-------------------------------------------------
import './Task_comp.css';



//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
//import ToDoElement_comp from '../ToDoElementt_comp/ToDoElement_comp';
import TaskUnit_comp from '../TaskUnit_comp/TaskUnit_comp';
import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserData } from '../store/actions';
import { setCurrentWeeks,setTaskType,setTaskWeekId } from '../store/actions';
import { centerData } from '../Data';


 class Task_comp extends React.Component {
  state = {
    tasks : [],
    date:"",
    userProjects:[],
    taskType:"0000",
    updateId:"",
    total_D0_w : "0",
    total_D0_o : "0",
    total_D1_w : "0",
    total_D1_o : "0",
    total_D2_w : "0",
    total_D2_o : "0",
    total_D3_w : "0",
    total_D3_o : "0",
    total_D4_w : "0",
    total_D4_o : "0",
    total_D5_o : "0",
    total_D6_o : "0"

  };
  componentDidUpdate()
  {
   // alert("PREVENT THIS");
    // console.log("####################################################################################################################################################");
    // console.log(this.state.updateId );
    // console.log(this.props.state.updateId);
    // if (this.state.updateId != this.props.state.updateId) {
    //   this.setState({
    //     tasks : [],

    //   })
    //   //this.componentDidMountLogic();
    //   this.state.updateId = this.props.state.updateId;
    //   document.getElementById("closeModal").click();

    //   this.props.state.history.push('/projects');


    // }
  }




  componentDidMountLogic()
  {
   // alert("qqqqqq")

    var aa = [];
    this.setState({

      tasks : [...aa],

    });
    var tasksData = []
    var updateTotals = () => {
     var ttotal_D0_w = 0;
     var ttotal_D0_o = 0;
     var ttotal_D1_w = 0;
     var ttotal_D1_o = 0;
     var ttotal_D2_w = 0;
     var ttotal_D2_o = 0;
     var ttotal_D3_w = 0;
     var ttotal_D3_o = 0;
     var ttotal_D4_w = 0;
     var ttotal_D4_o = 0;
     var ttotal_D5_o = 0;
     var ttotal_D6_o = 0;
      for (let i = 0; i < tasksData.length; i++) {
        //WorkingDetails
        ttotal_D0_w += tasksData[i].WorkingDetails.D0.W;
        ttotal_D0_o += tasksData[i].WorkingDetails.D0.O;
        ttotal_D1_w += tasksData[i].WorkingDetails.D1.W;
        ttotal_D1_o += tasksData[i].WorkingDetails.D1.O;
        ttotal_D2_w += tasksData[i].WorkingDetails.D2.W;
        ttotal_D2_o += tasksData[i].WorkingDetails.D2.O;
        ttotal_D3_w += tasksData[i].WorkingDetails.D3.W;
        ttotal_D3_o += tasksData[i].WorkingDetails.D3.O;
        ttotal_D4_w += tasksData[i].WorkingDetails.D4.W;
        ttotal_D4_o += tasksData[i].WorkingDetails.D4.O;
        ttotal_D5_o += tasksData[i].WorkingDetails.D5.O;
        ttotal_D6_o += tasksData[i].WorkingDetails.D6.O;
      }
      this.setState({
        total_D0_w : ttotal_D0_w,
        total_D0_o : ttotal_D0_o,
        total_D1_w : ttotal_D1_w,
        total_D1_o : ttotal_D1_o,
        total_D2_w : ttotal_D2_w,
        total_D2_o : ttotal_D2_o,
        total_D3_w : ttotal_D3_w,
        total_D3_o : ttotal_D3_o,
        total_D4_w : ttotal_D4_w,
        total_D4_o : ttotal_D4_o,
        total_D5_o : ttotal_D5_o,
        total_D6_o : ttotal_D6_o
      });
    }
        var datee = new Date(this.props.date);
        this.setState({date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`})
        var setTheState = (newbie) => {
          this.setState({
            tasks : [...this.state.tasks,newbie ]
          });
        }
        var tasksIDs = [];
        var config1 = {
          method: 'get',
          url: `${centerData.BackEndURL}/api/userWeeklyTasksOfWeek?id=${this.props.id}&userID=${this.props.userID}`,
          headers: { }
        };
        
        axios(config1)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
         // console.log("01010101010101010101010101010101010101010101010101010101011001");
         // console.log(response);
          tasksIDs = [...response.data[0].Tasks]
         // console.log(tasksIDs);
    
        }).then(() => {
    
          var data = JSON.stringify({
            "TasksIDs": tasksIDs
          });
          
          var config2 = {
            method: 'post',
            url: `${centerData.BackEndURL}/api/GetTasks`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config2)
          .then(function (response) {
           // console.log(".........................................................................");
           // console.log(JSON.stringify(response.data));
          //  console.log((response));
            tasksData = response.data;
            updateTotals();
            for (let i = 0; i < tasksIDs.length; i++) {
             // console.log(response.data[i]);
              setTheState(<TaskUnit_comp key={i} _id={response.data[i]._id} WorkingDetails={response.data[i].WorkingDetails} WeekID={response.data[i].WeekID} UserID={response.data[i].UserID} TeamID={response.data[i].TeamID} TaskType={response.data[i].TaskType} ReviewerComment={response.data[i].ReviewerComment} Review={response.data[i].Review} ProjectID={response.data[i].ProjectID} IsApproved={response.data[i].IsApproved}  />)
            }
          })
          .catch(function (error) {
           // console.log(error);
          });
        })
        .catch(function (error) {
         // console.log(error);
        });
  }
  componentDidMount()
  {
   // alert("*****qqqqqq");
    var aa = [];
    this.setState({

      tasks : [...aa],

    });
var tasksData = []
var updateTotals = () => {
 var ttotal_D0_w = 0;
 var ttotal_D0_o = 0;
 var ttotal_D1_w = 0;
 var ttotal_D1_o = 0;
 var ttotal_D2_w = 0;
 var ttotal_D2_o = 0;
 var ttotal_D3_w = 0;
 var ttotal_D3_o = 0;
 var ttotal_D4_w = 0;
 var ttotal_D4_o = 0;
 var ttotal_D5_o = 0;
 var ttotal_D6_o = 0;
  for (let i = 0; i < tasksData.length; i++) {
    //WorkingDetails
    ttotal_D0_w += tasksData[i].WorkingDetails.D0.W;
    ttotal_D0_o += tasksData[i].WorkingDetails.D0.O;
    ttotal_D1_w += tasksData[i].WorkingDetails.D1.W;
    ttotal_D1_o += tasksData[i].WorkingDetails.D1.O;
    ttotal_D2_w += tasksData[i].WorkingDetails.D2.W;
    ttotal_D2_o += tasksData[i].WorkingDetails.D2.O;
    ttotal_D3_w += tasksData[i].WorkingDetails.D3.W;
    ttotal_D3_o += tasksData[i].WorkingDetails.D3.O;
    ttotal_D4_w += tasksData[i].WorkingDetails.D4.W;
    ttotal_D4_o += tasksData[i].WorkingDetails.D4.O;
    ttotal_D5_o += tasksData[i].WorkingDetails.D5.O;
    ttotal_D6_o += tasksData[i].WorkingDetails.D6.O;
  }
  this.setState({
    total_D0_w : ttotal_D0_w,
    total_D0_o : ttotal_D0_o,
    total_D1_w : ttotal_D1_w,
    total_D1_o : ttotal_D1_o,
    total_D2_w : ttotal_D2_w,
    total_D2_o : ttotal_D2_o,
    total_D3_w : ttotal_D3_w,
    total_D3_o : ttotal_D3_o,
    total_D4_w : ttotal_D4_w,
    total_D4_o : ttotal_D4_o,
    total_D5_o : ttotal_D5_o,
    total_D6_o : ttotal_D6_o
  });
}
    var datee = new Date(this.props.date);
    this.setState({date:`${datee.getDate()}/${(datee.getMonth())+1}/${datee.getFullYear()}`})
    var setTheState = (newbie) => {
      this.setState({
        tasks : [...this.state.tasks,newbie ]
      });
    }
    var tasksIDs = [];
    var config1 = {
      method: 'get',
      url: `${centerData.BackEndURL}/api/userWeeklyTasksOfWeek?id=${this.props.id}&userID=${this.props.userID}`,
      headers: { }
    };
    
    axios(config1)
    .then(function (response) {
     // console.log(JSON.stringify(response.data));
     // console.log("01010101010101010101010101010101010101010101010101010101011001");
     // console.log(response);
      tasksIDs = [...response.data[0].Tasks]
     // console.log(tasksIDs);

    }).then(() => {

      var data = JSON.stringify({
        "TasksIDs": tasksIDs
      });
      
      var config2 = {
        method: 'post',
        url: `${centerData.BackEndURL}/api/GetTasks`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config2)
      .then(function (response) {
      //  console.log(".........................................................................");
      //  console.log(JSON.stringify(response.data));
      //  console.log((response));
        tasksData = response.data;
        updateTotals();
        for (let i = 0; i < tasksIDs.length; i++) {
         // console.log(response.data[i]);
          setTheState(<TaskUnit_comp key={i} _id={response.data[i]._id} WorkingDetails={response.data[i].WorkingDetails} WeekID={response.data[i].WeekID} UserID={response.data[i].UserID} TeamID={response.data[i].TeamID} TaskType={response.data[i].TaskType} ReviewerComment={response.data[i].ReviewerComment} Review={response.data[i].Review} ProjectID={response.data[i].ProjectID} IsApproved={response.data[i].IsApproved}  />)
        }
      })
      .catch(function (error) {
      //  console.log(error);
      });
    })
    .catch(function (error) {
     // console.log(error);
    });
//60b93cafe3d23520943775cf

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
   // console.log(ele.parentElement.innerText);
      ele.addEventListener("keydown", this.Edit);
  }
  Edit = (e) => 
  {
    var ele =e.target.parentElement.children[0];
    // console.log();
    // console.log(e);
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
         
        // console.log(ele.innerText[ele.innerText.length - 1]);
         
         ele.innerText =ele.innerText.substring(0, ele.innerText.length - 1);
     }
 
  }

  AddNewTaskToSpecialProject = (projectID,teamID,taskType) => 
  {
  var setUpdateId = () => {
    document.getElementById("closeModal").click();
    var ss = this.props.state.history.location.pathname;
    //alert(`gonna nav from ${ss}`);
    this.props.state.history.push('/404');
    //alert(`gonna nav to ${ss}`);
    this.props.state.history.push(ss);
  }

var data;
var vv = document.getElementById("usroo").value;
if (vv != "" && vv != " " && vv && vv.length > 2) {
    
  if (this.props.state.userData.DepartmentName == "HR") {
   data = JSON.stringify({
      "ProjectID": projectID,
      "UserID": this.props.state.userData._id,
      "WeekID": this.props.state.weekId,
      "TeamID": teamID,
      "TaskType": taskType + " ^ " + vv,
      "IsApproved":true
   });
   
  }else
  {
    data = JSON.stringify({
      "ProjectID": projectID,
      "UserID": this.props.state.userData._id,
      "WeekID": this.props.state.weekId,
      "TeamID": teamID,
      "TaskType": taskType + " ^ " + vv
    });
  }
 // console.log(data);
  var config = {
    method: 'post',
    url: `${centerData.BackEndURL}/api/AddTask`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
    axios(config)
    .then(function (response) {
      // console.log((response.data));
      //Task_comp.componentDidMountLogic();
      //  console.log(this.props);
      setUpdateId();
    })
    .catch(function (error) {
      // console.log(error);
    });
  
    

  }else
  {
    alert('Please, fill the required field!');
  }

  }













  AddNewEmptyTask = () => 
  {
    // this.setTaskWeekID();
  var setUpdateId = () => {
   // document.getElementById("closeModal").click();
    var ss = this.props.state.history.location.pathname;
    //alert(`gonna nav from ${ss}`);
    this.props.state.history.push('/404');
    //alert(`gonna nav to ${ss}`);
    this.props.state.history.push(ss);
  }

  var data;

  if (this.props.state.userData.DepartmentName == "HR") {
   data = JSON.stringify({
      "ProjectID": "6233078d06af2e27501bd8f3",
      "UserID": this.props.state.userData._id,
      "WeekID": this.props.id,
      "TeamID": "623307f306af2e27501bd8f6",
      "TaskType": "0000 ^ Discription...",
      "IsApproved":true
   });
   
  }else
  {
    data = JSON.stringify({
      "ProjectID": "6233078d06af2e27501bd8f3",
      "UserID": this.props.state.userData._id,
      "WeekID": this.props.id,
      "TeamID": "623307f306af2e27501bd8f6",
      "TaskType": "0000 ^ Discription..."
    });
  }
//console.log(data);
//console.log(this.props.state);
  var config = {
    method: 'post',
    url: `${centerData.BackEndURL}/api/AddTask`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
    axios(config)
    .then(function (response) {
      setUpdateId();
    })
    .catch(function (error) {
      console.log(error);
    });
  
    

  

  }





















  SelectTAskType(typeCode)
  {
    if (typeCode == '0081') {
      this.AddNewTaskToSpecialProject("6233078d06af2e27501bd8f3","623307f306af2e27501bd8f6",typeCode);
    }else if (typeCode == '0082') {
      this.AddNewTaskToSpecialProject("62386bcfffa77512b0524d1f","62386d2cffa77512b0524d26",typeCode);
    }else if (typeCode == '0083') {
      this.AddNewTaskToSpecialProject("62386bffffa77512b0524d20","62386d15ffa77512b0524d25",typeCode);
    }else if (typeCode == '0084') {
      this.AddNewTaskToSpecialProject("62386c0dffa77512b0524d21","62386d01ffa77512b0524d24",typeCode);
    }else if (typeCode == '0085') {
      this.AddNewTaskToSpecialProject("62386c1cffa77512b0524d22","62386ce8ffa77512b0524d23",typeCode);
    }else if (typeCode == '0022') {
      this.AddNewTaskToSpecialProject("62386ab7ffa77512b0524d1d","62386ac4ffa77512b0524d1e",typeCode);
    }else
    {
      this.setState({taskType : typeCode});
      this.props.setTaskType(typeCode);
    }

    //else if (typeCode == 4) {
    //   this.setState({taskType : "Printing / Handover"})
    //   this.props.setTaskType("Printing / Handover")
      
    // }else if (typeCode == 5) {
    //   this.setState({taskType : "Research"})
    //   this.props.setTaskType("Research")
      
    // }else if (typeCode == 6) {
    //   this.setState({taskType : "Development"})
    //   this.props.setTaskType("Development")
      
    // }else
    // {
    //   ///add vacation
    // }

  }
  setTaskWeekID()
  {
    this.props.setTaskWeekId(this.props.id)
  }

  render() {
  

    return (
      <>
       <div class="container tasksTable">
            <div class="row tasksTableHeader">
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><h6 className='font14px'>{this.state.date}</h6></div><div class="col-6 taskCell"><h6 className='font14px'>Task Type</h6></div></div></div>
                <div class="col-1 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6 className='font14px'>Project</h6></div></div></div>
                <div class="col-3 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6 className='font14px'>Task</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell"><h6 className='font14px'>Fri</h6></div><div class="col-3 taskCell"><h6 className='font14px'>Sat</h6></div><div class="col-6 taskCell"><div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Sun</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Mon</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div></div><div class="col-6 taskCell"><div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Tue</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-6 taskCell"><div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Wed</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div></div><div class="col-6 taskCell"><div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Thu</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div></div></div></div>


            </div>


            {/* <div Class="row text-center HeaderCellCont"><div Class="col-12 DayCode"><h6 className='font14px'>Sun</h6></div><div Class="col-6 DaySep">W</div><div Class="col-6 DaySep">A</div> </div> */}

            <div class=" tasksComps">
                {/* <!-- ---------------------------------------- --> */}
                {this.state.tasks}


           



















                {/* <!-- ---------------------------------------- --> */}

        </div>
        <div class="row tasksTableHeader"> 
            <div class="col-12 ">
                <div class="row">
                  {this.props.userID == this.props.state.userData._id && !this.props.state.isUpdating? (
                    <div class="col-4 taskMainCell"><div class="row"><div class="col-12 taskCell"><h2 class="plusBtn" data-toggle="modal" onClick={() => {this.AddNewEmptyTask()}}><i class="fas fa-plus-square"></i></h2></div></div></div>
                    ):(
                      <div class="col-4 taskMainCell"><div class="row"><div class="col-12 taskCell"></div></div></div>
                      )}
                {/* <!-- ــــــــــــــــــــــــ --> */}
                <div class="col-2 taskMainCell"><div class="row"><div class="col-12 taskCell"><h6>Totals:</h6></div></div></div>
                <div class="col-2 taskMainCell"><div class="row"><div class="col-3 taskCell overtimeCell">{this.state.total_D5_o}</div><div class="col-3 taskCell overtimeCell">{this.state.total_D6_o}</div>{this.state.total_D0_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D0_w}</div>):(<div class="col-3 taskCell ">{this.state.total_D0_w}</div>)}  <div class="col-3 taskCell overtimeCell">{this.state.total_D0_o}</div></div></div>
                <div class="col-2 taskMainCell"><div class="row"> {this.state.total_D1_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D1_w}</div> ):(<div class="col-3 taskCell">{this.state.total_D1_w}</div> )}    <div class="col-3 taskCell overtimeCell">{this.state.total_D1_o}</div>{this.state.total_D2_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D2_w}</div>):(<div class="col-3 taskCell">{this.state.total_D2_w}</div>)}<div class="col-3 taskCell overtimeCell">{this.state.total_D2_o}</div></div></div>
                <div class="col-2 taskMainCell"><div class="row">{this.state.total_D3_w > 8.5? (<div class="col-3 taskCell redCell">{this.state.total_D3_w}</div>):(<div class="col-3 taskCell">{this.state.total_D3_w}</div>)}     <div class="col-3 taskCell overtimeCell">{this.state.total_D3_o}</div>{this.state.total_D4_w > 8.5 ? ( <div class="col-3 taskCell redCell">{this.state.total_D4_w}</div>):( <div class="col-3 taskCell">{this.state.total_D4_w}</div>)}<div class="col-3 taskCell overtimeCell">{this.state.total_D4_o}</div></div></div>

                </div>
            </div>


        </div>
        <div class="container">


            {/* <!-- The Modal --> */}
            <div class="modal fade" id="myModal">
              <div class="modal-dialog modal-lg  modal-dialog-centered">
                <div class="modal-content">
                
                  {/* <!-- Modal Header --> */}
                  <div class="modal-header">
                    <h4 class="modal-title">New Task</h4>
                    <button id="closeModal" type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  {/* <!-- Modal body --> */}
                  <div class="modal-body newTaskModalBdy">
                      <h3 class="projectTypeTitle qqwes">Task Type: </h3>
                    <div class="dropdown">
                        <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown">
                          {this.state.taskType}
                        </button>
                        <div class="dropdown-menu menuuu">

                          {/* 00 */}{/*  */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0000')}}>0000 - OffTime</a>
                          
                          
                          {/* 10 */}{/*  */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0011')}}>0011 - Modeling</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0012')}}>0012 - Coordination</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0013')}}>0013 - Revision</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0014')}}>0014 - Shopdrawing</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0015')}}>0015 - Print/Handover</a>


                          {/* 10 - 200 */}{/*  */}
                          {/* <a class="dropdown-item" onClick={() => {this.SelectTAskType('0211')}}>0211 - Modeling-WFH</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0212')}}>0212 - Coordination-WFH</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0213')}}>0213 - Revision-WFH</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0214')}}>0214 - Shopdrawing-WFH</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0215')}}>0215 - Print/Handover-WFH</a> */}


                          {/* 20 */}{/*  */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0021')}}>0021 - SiteVisit</a>
                          <a class="dropdown-item missionTask" onClick={() => {this.SelectTAskType('0022')}}>0022 - Mission</a>


                          {/* 30 */}{/*  */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0031')}}>0031 - Research</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0032')}}>0032 - Development</a>

                          {/* 30 - 200 */}{/*  */}
                          {/* <a class="dropdown-item" onClick={() => {this.SelectTAskType('0231')}}>0231 - Research-WFH</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0232')}}>0232 - Development-WFH</a> */}


                          {/* 40 */}{/*  */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0041')}}>0041 - ControllingDocs</a>

                          {/* 40 - 200 */}{/*  */}
                          {/* <a class="dropdown-item" onClick={() => {this.SelectTAskType('0241')}}>0241 - ControllingDocs-WFH</a> */}


                          {/* 50 */}{/* rtw */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0051')}}>0051 - RTW-session</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0052')}}>0052 - RTW-coordination</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0053')}}>0053 - RTW-exam</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0054')}}>0054 - RTW-meeting</a>


                          {/* 60 */}{/* academy */}
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0061')}}>0061 - Academy-session</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0062')}}>0062 - Academy-coordination</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0063')}}>0063 - Academy-exam</a>
                          <a class="dropdown-item" onClick={() => {this.SelectTAskType('0064')}}>0064 - Academy-meeting</a>

                          {/* 70 */}{/* sales */}
                          {/* <a class="dropdown-item" onClick={() => {this.SelectTAskType('0071')}}>0071 - </a> */}


                          {/* 80 */}{/*  */}

                          <a class="dropdown-item sickTask" onClick={() => {this.SelectTAskType('0081')}}>0081 - Vacation</a>
                          <a class="dropdown-item sickTask" onClick={() => {this.SelectTAskType('0082')}}>0082 - Sick Leave</a>
                          <a class="dropdown-item sickTask" onClick={() => {this.SelectTAskType('0083')}}>0083 - Study/master</a>
                          <a class="dropdown-item sickTask" onClick={() => {this.SelectTAskType('0084')}}>0084 - Training</a>
                          <a class="dropdown-item sickTask" onClick={() => {this.SelectTAskType('0085')}}>0085 - Official</a>

                          
                        </div>
                      </div> 
                      <div className="sepppp"> 
                      <div class="form-group dsfdsg">
                       <input type="text" class="form-control aasdagg" placeholder="Task short Prief*" id="usroo"/>
                      </div></div>

                      <hr/>
                          <h3>Project:<span className='fadedText'>(select a project to set the task)</span></h3>
                      <div class="projectCardsContainer">
                            {/* <!-- ----------------------------------------------------------------------------------------- --> */}

                            {this.props.projects}

                            {/* <!-- ----------------------------------------------------------------------------------------- --> */}

                        </div>

                  </div>
                  
                  {/* <!-- Modal footer --> */}
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setUserData,setCurrentWeeks,setTaskType,setTaskWeekId})(Task_comp);





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