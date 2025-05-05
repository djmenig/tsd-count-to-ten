import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';

const date = new Date();

const dialogContent = {
    gameType: {
      dialogTitle: "FEATURE UNAVAILABLE",
      dialogContent: () => (
        <DialogContentText id="alert-dialog-slide-description">
          Coming soon. Please check back later!
        </DialogContentText>
      ), 
    },
    howToPlay: {
      dialogTitle: "HOW TO PLAY",
      dialogContent: () => (
        <>
        <DialogContentText id="alert-dialog-slide-description">
          Object of the game:
        </DialogContentText>
        <List disablePadding>
          <ListItem><ListItemText secondary="Match all number tiles to their corresponding Korean tiles." /></ListItem>
        </List>
        <br />
        <DialogContentText id="alert-dialog-slide-description">
          Gameplay:
        </DialogContentText>
          <List disablePadding>
            <ListItem><ListItemText sx={{ marginBottom: 0, }} secondary="Tap or click on a Korean tile to hear the pronunciation." /></ListItem>
            <ListItem><ListItemText sx={{ marginTop: 0, marginBottom: 0 }} secondary="Drag a number tile to a korean tile. When a match is made the number tile will be removed from the gameboard. Continue until all matches have been made." /></ListItem>
          </List>
        </>
      ),
    },
    about: {
      dialogTitle: "ABOUT",
      dialogContent: () => (
        <>
          <DialogContentText id="alert-dialog-slide-description">
            Version: Alpha 1
            <br />
            Developer: Donald Menig
            <br />
            <br />
            <a href="https://github.com/djmenig/wtsda-count-to-ten" target="_blank">Github</a>
          </DialogContentText>
          <br />
          <br />
          <small>© {date.getFullYear()} Donald J. Menig. All Rights Reserved.</small>
        </>
      ),
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MenuDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const content = props.menuItemValue && dialogContent[props.menuItemValue]
    ? dialogContent[props.menuItemValue]
    : {
        dialogTitle: '',
        dialogContent: () => (
          <DialogContentText id="alert-dialog-slide-description" />
        ),
      };

  React.useEffect(() => {
    props.dialogOpen ? setOpen(true) : setOpen(false);
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setDialogOpen(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{alignSelf: "center"}}>{content.dialogTitle}</DialogTitle>
        <DialogContent>{content.dialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MenuDialogs;