
//------------------------------------
//-------------------------------------------------
import './ProjectCard_comp.css';

//import vidSrc from '../media/yt1s.com - Retrowave animation_1080p.mp4';
import Task_comp from '../Task_comp/Task_comp';

import ReactDOM from "react-dom";
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { setSelectedBtn } from '../store/actions';
import { setSkillPageData ,setUpdateId,setProjectObj} from '../store/actions';
import { centerData } from '../Data';


 class ProjectCard_comp extends React.Component {
  state = {
    // skillImgMain : _400x500Skill,
    // title: 'My Skills',
    // details: 'Select a skill to see details',
    // DetailsBtn : true

  };

  componentDidMount()
  {




  }
  projectCardFunc()
  {
    var setUpdateId = () => {


      document.getElementById("closeModal").click();
      var ss = this.props.state.history.location.pathname;
     // alert(`gonna nav from ${ss}`);
      this.props.state.history.push('/404');
     // alert(`gonna nav to ${ss}`);
      this.props.state.history.push(ss);
    
    }
    if (this.props.type == "explore") {
     // console.log(this.props);
     // alert(`directing to ${this.props.data.Name} ....`)

      // e.preventDefault();
      // e.stopPropagation();
       this.props.setProjectObj({...this.props.data});
       this.props.state.history.push('/project');
     
      
    }else if(this.props.type == "Add Task")
    {
      //alert(`adding new task of ${this.props.data.Name} project ....`)
      var data;
      var vv = document.getElementById("usroo").value;
      if (vv != "" && vv != " " && vv && vv.length > 2) {
        
      console.log(this.props.teamLeader);
      if (this.props.state.userData._id == this.props.teamLeader) {
        data = JSON.stringify({
          "ProjectID": this.props.data._id,
          "UserID": this.props.state.userData._id,
          "WeekID": this.props.state.weekId,
          "TeamID": this.props.team,
          "TaskType": this.props.state.taskType + " ^ " + vv,
          "IsApproved":true
        });
        
      }else
      {
        data = JSON.stringify({
          "ProjectID": this.props.data._id,
          "UserID": this.props.state.userData._id,
          "WeekID": this.props.state.weekId,
          "TeamID": this.props.team,
          "TaskType": this.props.state.taskType + " ^ " + vv
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
  }


GetProjectCode()
{
  var codeString = `${this.props.data.Code}`
  if (codeString.length == 1) {
    return `000${codeString} - ${this.props.data.Name}`
  }else if (codeString.length == 2) {
    return `00${codeString} - ${this.props.data.Name}`
  }else if (codeString.length == 3) {
    return `0${codeString} - ${this.props.data.Name}`
  }else if (codeString.length == 4) {
    return `${codeString} - ${this.props.data.Name}`
  }
}

  render() {


    return (
      <>


<div class="_ProjectCard" style={{backgroundImage: `url("${this.props.data.img}")`}} onClick={() => {this.projectCardFunc()}}>
  <h1 class="_projNameCard">
    <span class="_projNamee">{this.GetProjectCode()}</span>
  </h1>
  {/* <div class="projCardPanel">
    <button type="button" class="btn btn-info" onClick={() => {this.projectCardFunc()}}>{this.props.type}</button>
  </div> */}
</div>
                   

      </>
    );
  }

  
}
const mapStateToProps = (state) => ({state})

export default connect(mapStateToProps , {setSelectedBtn,setSkillPageData,setUpdateId,setProjectObj})(ProjectCard_comp);





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