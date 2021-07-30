import React from 'react'
import {Drawer,IconButton,ListItem,ListItemText,makeStyles,List,ListItemIcon,Divider,useTheme,Chip,Typography,Box,Paper,Avatar,ListItemSecondaryAction} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MicNoneSharpIcon from '@material-ui/icons/MicNoneSharp';
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useSelector } from 'react-redux';
import moment from 'moment'
import clsx from 'clsx'

const drawerWidth = 380;

const useStyles = makeStyles((theme)=>({
    drawer:{
        width: drawerWidth,
        flexShrink: 0,
        height:800
    },
    drawerPaper: {
        width: drawerWidth,
        height:"90%",
    },
    innerPaper:{
      height:"99%",
      borderRadius:"40px"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    subHeader:{
      display: 'flex',

      alignItems: 'center',
      padding: theme.spacing(1, 1),
      justifyContent:"center"
    },
    listIcon:{
        width:"100%",
        display:"flex",
        alignItems:"baseline"
    },
    msgCont:{
        padding:"0.6rem"
    },
    senderName:{
        fontWeight:"bold",
        color:"#000",
        paddingRight:"0.5rem"
    },
    // msgTime:{
    //     display:"flex",
    //     alignItems:"baseline"
    // }
}))


const Chat = ({open,setDrawerOpen}) => {
    const classes = useStyles();
    const theme = useTheme();
    const profile = useSelector(state=>state.profile)
    const user=useSelector(state=>state.user)

    const handleDrawerClose = ()=>{
        setDrawerOpen(false)
    }

    const chatData = [{senderName:profile.name,msgTime:moment(Date.now()).format(' h:mm a'),videoOn:user.videoOn},
                        {senderName:profile.name,msgTime:moment(Date.now()).format(' h:mm a'),videoOn:user.videoOn}, 
                        {senderName:profile.name,msgTime:moment(Date.now()).format(' h:mm a'),videoOn:user.videoOn}, 
                        {senderName:profile.name,msgTime:moment(Date.now()).format(' h:mm a'),videoOn:user.videoOn}]
    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Paper className={classes.innerPaper}>
        <div className={classes.drawerHeader}>
           <Typography variant="h6">
            In Call Messages
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon/>
          </IconButton>
          
        </div>
        <div className={classes.subHeader}>
            <Chip label="Messages can only be seen by the people in this call" />
        </div>
        <Divider />
        <List>
          {/* {chatData.map((text, index) => (
            <ListItem button key={text.name}>
              <ListItemIcon>
                <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                    {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                </Avatar></ListItemIcon>
              <ListItemText primary={text.name} />
              <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                      {text.micOn?<MicNoneSharpIcon/>:<MicOffOutlinedIcon/>}
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                      {text.videoOn?<VideocamIcon/>:<VideocamOffIcon/>}
                  </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))} */}
          {
              chatData.map((msg,index)=>(
                <div className={classes.msgCont}  key={msg.senderName}>
                    <div className={classes.listIcon}>
                        <Typography className={classes.senderName}>
                            {msg.senderName}
                        </Typography>
                        <Typography variant="body2" className={classes.msgTime}>
                            {msg.msgTime}
                        </Typography>
                    </div>
                    <div>
                        Hello
                    </div>
                </div>
              ))
          }
        </List>
        </Paper>
        
      </Drawer>
    )
}

export default Chat
