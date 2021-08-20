import React from 'react'
import {
    makeStyles,
    Button,
    Dialog,
    Typography,
    IconButton,
    withStyles,
    Avatar,
    ListItemText,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    List,
    Box} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import clsx from 'clsx'
import {useSelector,useDispatch} from 'react-redux'
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { REMOVE_USERS_JOIN, SET_ADMITID, SET_MULTIPLES_ADMITS } from '../../../constants/actions';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    small: {
      textTransform: "none",
      color: "black",
    },
}));

  
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
    
    const DialogTitle = (props) => {
        const classes = useStyles();
        const { children, onClose, ...other } = props;
        return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
              <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        );
      };
      
      const DialogContent = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
        },
      }))(MuiDialogContent);

    return (
        <div>
          {
            usersToJoin.length>0?(
              <Dialog
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
                <DialogContent dividers>
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
                            <Button onClick={()=>handleDeny((user.id))} color="primary">
                              Deny Entry
                            </Button>
                            <Button onClick={()=>handleAdmit(user.id)} color="primary">
                              Admit
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
    )
}

export default UsersToJoinDialog;
