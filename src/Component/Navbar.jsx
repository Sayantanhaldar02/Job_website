import { AppBar, Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import navlogo from "../assets/nav_logo.png"
import { useState } from "react";

const Navbar = () => {
    const styles = { "background": "transparent" }

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <>
            <AppBar className=" bg-opacity-0 px-[75px] " style={styles}>
                <Toolbar className="flex justify-between">
                    <div className="w-[40%] flex items-center justify-between gap-[20px]">
                        <Link to='/' className="flex items-center gap-[15px]">
                            <img src={navlogo} alt="" className="h-[25px]" />
                            <p className=" font-extrabold text-[25px] text-black ">JOB POST</p>
                        </Link>
                        <div className="flex gap-[35px] font-medium mq900:hidden  ">
                            <Link to='/' className="text-black hover:text-primary-text">
                                Home
                            </Link>
                            <Link to='/about' className=" text-black hover:text-primary-text">
                                About
                            </Link>
                            <Link to='/contact' className="text-black hover:text-primary-text">
                                Contact
                            </Link>
                        </div>
                    </div>
                    <Link className=" bg-primary-text flex items-center justify-center gap-[10px] rounded-[10px] text-whitesmoke px-[20px] py-[10px] hover:bg-white hover:text-primary-text  hover:delay-500 hover:duration-100 mq900:hidden "><LoginIcon />Login</Link>

                    
                    < Button className="mq1700:hidden mq1325:hidden" onClick={toggleDrawer(true)} > Open drawer</Button >

                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar


