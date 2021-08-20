import React from "react";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  withStyles,
  Avatar,
  ListItemText,
  ListItem,
  ListItemIcon,
  List,
  Box,
} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { useSelector, useDispatch } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { REMOVE_USERS_JOIN, SET_ADMITID ,SET_MULTIPLES_ADMITS} from "../../../constants/actions";
  
const UsersToJoinDialog = ({open,setOpen}) => {
    const usersToJoin = useSelector(state=>state.usersToJoin)
    const dispatch = useDispatch()
    const handleClose = () => {
      setOpen(false);
    };

    const handleAdmit = (socId)=>{
      dispatch({type:SET_ADMITID,payload:{id:socId,allow:true}})
      setOpen(false)
      dispatch({type:REMOVE_USERS_JOIN,payload:socId})
    }

    const handleDeny = (socId)=>{
      dispatch({type:SET_ADMITID,payload:{id:socId,allow:false}})
      setOpen(false)
      dispatch({type:REMOVE_USERS_JOIN,payload:socId})
    }
    const handleAdmitAll = (users)=>{
      dispatch({type:SET_MULTIPLES_ADMITS,payload:users.map(user=>user.id)})
    }
    
    
      
     

    return (
        <div>
          {
            usersToJoin.length>0?(
              <Dialog
                  maxWidth="xs"
                  fullWidth={true}
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  {
                    usersToJoin.length>1?(
                      "Several people want to join this call:"
                    ):("Someone wants to join this call:")
                  }        
                </DialogTitle>
                <DialogContent>
                  <List>
                    {
                      usersToJoin.map((user)=>(
                        <ListItem button >
                          <ListItemIcon>
                            <Avatar
                              src={user.profilePic}
                              alt={user.name}
                            >
                              {user.name.charAt(0)}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText primary={user.name} />
                          <DialogActions>
                            <Button onClick={()=>handleDeny((user.id))} style={{ textTransform: "none" }}>
                            <Typography variant="subtitle" color="primary" component="div">
                              Deny Entry
                            </Typography>
                            </Button>
                            <Button onClick={()=>handleAdmit(user.id)} style={{ textTransform: "none" }}>
                            <Typography variant="subtitle" color="primary">
                              Admit
                            </Typography>
                            </Button>
                          </DialogActions>
                        </ListItem>
                      ))
                    }
                  </List>
                </DialogContent>
              </Dialog>
            ):null
          }
    </div>
  );
};

export default UsersToJoinDialog;
