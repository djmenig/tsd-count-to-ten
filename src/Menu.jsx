import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDialogs from './MenuDialogs';

function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [menuItemValue, setMenuItemValue] = React.useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleMenuItemClick(value) {
    setDialogOpen(true);
    setMenuItemValue(value);
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
        <MenuIcon fontSize='large'/>
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
        <MenuItem onClick={ () => {handleMenuItemClick("gameType")} }>Game Type</MenuItem>
        <MenuItem onClick={ () => {handleMenuItemClick("howToPlay")} }>How To Play</MenuItem>
        <MenuItem onClick={ () => {handleMenuItemClick("about")} }>About</MenuItem>
      </Menu>
      <MenuDialogs dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} menuItemValue={menuItemValue} />
    </div>
  );
}

export default BasicMenu;