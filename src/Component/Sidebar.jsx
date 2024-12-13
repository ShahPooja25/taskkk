import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import Main from './Main';
import {
  Menu,
  Dashboard,
  Description,
  
  Update,
  Settings,
  FolderOpen,
  ViewQuilt,
  BarChart,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <Router>
      <div className="flex">
        <Drawer
          variant="permanent"
          className={`${
            isOpen ? 'w-64' : 'w-16'
          } bg-white border-r border-gray-200 transition-width duration-300`}
          classes={{
            paper: `${
              isOpen ? 'w-64' : 'w-16'
            } bg-white border-r border-gray-200 transition-width duration-300`,
          }}
        >
          <div className="flex items-center justify-end p-2">
         
          <IconButton onClick={toggleSidebar}>
            
              <Menu style={{ color: blue[500] }} />
            </IconButton>
          </div>
          <List>
            <ListItem button onClick={toggleDashboard}>
              <ListItemIcon>
                <Dashboard style={{ color: blue[500] }} />
              </ListItemIcon>
              {isOpen && <ListItemText primary="Dashboards" />}
              {isOpen && (isDashboardOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            <Collapse in={isOpen && isDashboardOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink
                  to="/tasks"
                  className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Description style={{ color: blue[500] }} />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Tasks" />}
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/drive"
                  className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <FolderOpen style={{ color: blue[500] }} />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Drive Files" />}
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/boards"
                  className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
                >
                  <ListItem button>
                    <ListItemIcon>
                      <ViewQuilt style={{ color: blue[500] }} />
                    </ListItemIcon>
                    {isOpen && <ListItemText primary="Boards" />}
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            <NavLink
              to="/updates"
              className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
            >
              <ListItem button>
                <ListItemIcon>
                  <Update style={{ color: blue[500] }} />
                </ListItemIcon>
                {isOpen && <ListItemText primary="Updates" />}
              </ListItem>
            </NavLink>
            <NavLink
              to="/crm-dashboard"
              className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
            >
              <ListItem button>
                <ListItemIcon>
                  <BarChart style={{ color: blue[500] }} />
                </ListItemIcon>
                {isOpen && <ListItemText primary="CRM Dashboard" />}
              </ListItem>
            </NavLink>
            <NavLink
              to="/settings"
              className="text-black font-bold pl-4"
                  activeClassName="bg-blue-100 font-bold"
            >
              <ListItem button>
                <ListItemIcon>
                  <Settings style={{ color: blue[500] }} />
                </ListItemIcon>
                {isOpen && <ListItemText primary="Settings" />}
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        <main className="flex-grow p-4">
        <Main/>
        </main>
      </div>
    </Router>
  );
};

export default Sidebar;
