import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
} from '@mui/material';
import {
  Summarize as SummarizeIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const styles = {
  root: { display: 'flex' },
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: 3,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
  active: {
    background: '#f4f4f4',
  },
  title: {
    padding: 2,
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: {
    marginTop: 2,
  },
  apptitle: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: 2,
  },
};

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      text: 'Blogs',
      icon: <SummarizeIcon color="secondary" />,
      path: '/',
    },
    {
      text: 'Users',
      icon: <GroupIcon color="secondary" />,
      path: '/users',
    },
  ];

  return (
    <div style={styles.root}>
      {/* app bar */}
      <AppBar sx={styles.appbar} elevation={0}>
        <Toolbar>
          <Typography sx={styles.apptitle}>Welcome To Blog List App</Typography>
          <Typography>2023</Typography>
          <Avatar src="/user.jpg" sx={styles.avatar} />
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer sx={styles.drawer} variant="permanent" anchor="left">
        <div>
          <Typography variant="h5" style={styles.title}>
            Blog List App
          </Typography>
        </div>
        <List>
          {links.map((link) => (
            <ListItem
              button
              key={link.text}
              onClick={() => navigate(link.path)}
              sx={
                location.pathname === link.path ||
                (location.pathname.startsWith('/users') &&
                  link.path === '/users') ||
                (location.pathname.startsWith('/blogs') && link.path === '/')
                  ? styles.active
                  : null
              }
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={styles.page}>
        <Box sx={styles.toolbar} />
        {children}
      </Box>
    </div>
  );
};

export default Layout;
