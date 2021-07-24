import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
    video1: {
      borderRadius: "20px",
      width: '650px',
  
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
      [theme.breakpoints.down('md')]: {
        width: '650px',
        marginLeft:"200px",
      },
    },
    video2: {
      width: "0",
    },
  
    offvideo: {
      width: '100%',
      height: "60vh",
  
    },
    gridContainer: {
      margin: "10px 20px 10px 100px",
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      border: '2px solid black',
      borderRadius: "10px",
    },
    actionBtns: {
      // marginTop:"-100px",
      // marginLeft:"320px",
      display: "flex",
      width: "650px",
      height: "auto",
      color: "white",
      justifyContent: "center",
      [theme.breakpoints.down('md')]: {
        width: "1100px",
      },
      
  
    },
    descText:{
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down('sm')]: {
          position:"absolute",
          top:"700px",
          left:"500px"
      },
      [theme.breakpoints.down('xs')]: {
        width:"400px",
        position:"absolute",
        top:"700px",
        left:"500px"
      },
    },
    camOff :{
      width: "650px",
      height: "60vh",
      margin: "0 !important",
      background: "#080808",
      borderRadius: "20px",
      // background: "-webkit-linear-gradient(to right, #ffefba, #ffffff)",  
      // background: "linear-gradient(to right, #ffefba, #ffffff)", 
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width:"600px",
        height:"60vh" 
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width:"600px",
        height:"60vh" ,
        padding:"0",
        maxWidth:"500px !important"
      },
      camOffText:{
        textAlign: "center",
        paddingTop: "180px",
        fontSize: "38px",
        color: "white",
      },
      btn:{
        color: "white",
        backgroundColor: "blue",
        padding: "10px 15px ",
        borderRadius: "30px",
        margin:"5px",
        boxShadow:"1px 0px 10px grey"
      }
    },
  }));
export default styles;