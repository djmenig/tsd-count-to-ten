import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const dialogContent = {
    gameType: {
        dialogTitle: "Feature Unavailable",
        dialogContentText: "Coming soon. Please check back later!",
    },
    howToPlay: {
        dialogTitle: "HOW TO PLAY",
        dialogContentText: "Drag a number tile to a korean tile and drop to see if it is a match. You win when all number tiles have been matched to their corresponding Korean tiles.",
    },
    about: {
        dialogTitle: "About",
        dialogContentText: "Version 1",
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MenuDialogs(props) {
  const [open, setOpen] = React.useState(false);

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
        <DialogTitle>{dialogContent.gameType.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogContent.gameType.dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MenuDialogs;