import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    root : {
      margin:"0 !important",
      padidng:"0 !important",
      width:"0",
      display:"none !important"
    },
    btn:{
      color: "white",
      backgroundColor: "#1a73e8",
      padding: "10px 15px ",
      borderRadius: "30px",
      margin:"5px",
      boxShadow:"1px 0px 10px grey",
      "&:hover": {
        backgroundColor: 'blue'
      }
    },
    icon:{
      color:"white !important",
      fontSize:"28px",
    },
    iconBg:{
        width:"50px",
        borderRadius:"50%",
        border:"1px solid black",
        padding:"10px",
        backgroundColor :"#f44336",
        "&:hover": {
          backgroundColor: '#f44336'
        },
        
    },

    video1: {

      width: '650px',
      height:"500px",
      borderRadius: "30px !important",
  
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
      [theme.breakpoints.down('md')]: {
        width: '650px',
        margin:"0px 164px",
      },
    },
    video2: {
      width: "0",
      display:"none"
    },
  
    offvideo: {
      width: '100%',
      height: "60vh",
  
    },
    video :{
      padding:"100px 100px",
      
    },
    gridContainer: {
      // margin: "100px 20px 10px 0px",  
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      border: '2px solid black',
      borderRadius: "10px",
    },
    actionBtns: {
      marginTop:"-85px",
      // marginLeft:"320px",
      display: "flex",
      width: "625px",
      height: "auto",
      color: "white",
      justifyContent: "center",
      [theme.breakpoints.down('md')]: {
        width: "1100px",
      },
      
  
    },
    descText:{
     paddingLeft:"100px ",
     marginLeft:"20px",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.down('sm')]: {
          width:"100%",
          position:"absolute",
          // paddingLeft:"100px ",
          // marginLeft:"200px",
          top:"700px",
          left:"240px",
          marginTop : " 0px",
      },
      [theme.breakpoints.down('xs')]: {
        width:"100%",
        position:"absolute",
        top:"700px",
        left:"240px",
      },
    },
    camOff :{
        width:"650px",
        height:"390px",
      background: "#080808",
      borderRadius: "20px",
      // background: "-webkit-linear-gradient(to right, #ffefba, #ffffff)",  
      // background: "linear-gradient(to right, #ffefba, #ffffff)", 
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        marginLeft:"200px !important",
        border:"2px solid red",

        width:"550px",
        height:"40vh" ,

      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        marginRight:"0px !important",
     
        width:"550px",
        height:"40vh" ,
        padding:"0",

      },
    },
      camOffText:{
        textAlign: "center",
        paddingTop:"180px",
        fontSize: "38px",
        color: "white",
        // display:"flex",
        // flexDirection:"column",
        // alignItems:"center",
        // justifyContent:"center",
      }
  }));
  

export default styles;