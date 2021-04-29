import React, { useEffect } from 'react';
// Material UI imports
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';

import ComplaintCard from '../components/Complaint';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
// Material UI style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '85vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  panel: {
    overflow: 'scroll',
    width: '100%',
    overflowX: 'hidden',
  },
  data: {
    // height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '3rem',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  formContainer: {
    padding: '1rem',
    width: '400px',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

// Admin can view all complaints and edit them.
const ComplaintAdminPage = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const complaintList = useSelector((state) => state.complaintList);
  const { loading: loadingComplaints, complaints } = complaintList;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, user, success]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        className={classes.tabs}
      >
        <Tab label='Complaints' {...a11yProps(0)} />
        <Tab label='resolved' {...a11yProps(1)} />
        <Tab label='pending' {...a11yProps(2)} />
        <Tab label='dismissed' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.panel}>
        <div className={classes.data}>
          {loadingComplaints ? (
            <CircularProgress size={30} className={classes.progress} />
          ) : (
            complaints &&
            complaints.map((complaint) => (
              <div style={{ margin: '0 auto 0 auto' }}>
                <ComplaintCard key={complaint._id} complaint={complaint} />
              </div>
            ))
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.panel}>
        <div className={classes.data}>
          {loadingComplaints ? (
            <CircularProgress size={30} className={classes.progress} />
          ) : (
            complaints &&
            complaints.map((complaint) => {
              if (complaint.status === 'resolved') {
                return (
                  <div style={{ margin: '0 auto 0 auto' }}>
                    <ComplaintCard key={complaint._id} complaint={complaint} />
                  </div>
                );
              }
            })
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.panel}>
        <div className={classes.data}>
          {loadingComplaints ? (
            <CircularProgress size={30} className={classes.progress} />
          ) : (
            complaints &&
            complaints.map((complaint) => {
              if (complaint.status === 'pending') {
                return (
                  <div style={{ margin: '0 auto 0 auto' }}>
                    <ComplaintCard key={complaint._id} complaint={complaint} />
                  </div>
                );
              }
            })
          )}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.panel}>
        <div className={classes.data}>
          {loadingComplaints ? (
            <CircularProgress size={30} className={classes.progress} />
          ) : (
            complaints &&
            complaints.map((complaint) => {
              if (complaint.status === 'dismissed') {
                return (
                  <div style={{ margin: '0 auto 0 auto' }}>
                    <ComplaintCard key={complaint._id} complaint={complaint} />
                  </div>
                );
              }
            })
          )}
        </div>
      </TabPanel>
    </div>
  );
};

export default ComplaintAdminPage;
