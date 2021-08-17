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
    Box} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import clsx from 'clsx'
import {useSelector,useDispatch} from 'react-redux'
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { REMOVE_USERS_JOIN, SET_ADMITID } from '../../../constants/actions';

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

    const handleAdmit = ()=>{
      dispatch({type:SET_ADMITID,payload:{id:usersToJoin[0].id,allow:true}})
      setOpen(false)
      dispatch({type:REMOVE_USERS_JOIN,payload:usersToJoin[0].id})
    }

    const handleDeny = ()=>{
      dispatch({type:SET_ADMITID,payload:{id:usersToJoin[0].id,allow:false}})
      setOpen(false)
      dispatch({type:REMOVE_USERS_JOIN,payload:usersToJoin[0].id})
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
                  Someone wants to join this call:
                </DialogTitle>
                <DialogContent dividers>
                
                  <ListItem button >
                    <ListItemIcon>
                      <Avatar
                        src={usersToJoin[0].profilePic}
                        alt={usersToJoin[0].name}
                      >
                        {usersToJoin[0].name.charAt(0)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={usersToJoin[0].name} />
                  </ListItem>
                
                  {/* <Typography gutterBottom>
                    {usersToJoin[0].name}
                  </Typography> */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeny} color="primary">
                    Deny Entry
                  </Button>
                  <Button onClick={handleAdmit} color="primary">
                    Admit
                  </Button>
                </DialogActions>
              </Dialog>
            ):null
          }
      
    </div>
    )
}

export default UsersToJoinDialog;
