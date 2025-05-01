import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDialogs from './MenuDialogs';

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const entryClick = () => {
    setDialogOpen(true);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{position: "absolute", top: 5, right: 0}}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={entryClick}>Game Type</MenuItem>
        <MenuItem onClick={handleClose}>How To Play</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </Menu>
      <MenuDialogs dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}

export default BasicMenu;