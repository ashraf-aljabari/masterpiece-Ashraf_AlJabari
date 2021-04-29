import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextareaAutosize,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
// redux imports
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ComplaintCard from '../components/Complaint';
import {
  listComplaints,
  createComplaint,
} from '../redux/actions/complaintActions';
import { COMPLAINT_CREATE_RESET } from '../redux/constants/complaintsConstants';

// landing page containing all users complains
// and user can comment on each other's complaints
const HomePage = () => {
  const [complaintText, setComplaintText] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const complaintList = useSelector((state) => state.complaintList);
  const { loading: loadingList, complaints } = complaintList;

  const complaintCreate = useSelector((state) => state.complaintCreate);
  const {
    loading,
    error: complaintError,
    success: complaintSuccess,
  } = complaintCreate;

  useEffect(() => {
    dispatch({ type: COMPLAINT_CREATE_RESET });
    dispatch(listComplaints());
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (complaintText.trim().length !== 0) {
      dispatch(createComplaint(complaintText));
      dispatch({ type: COMPLAINT_CREATE_RESET });
      dispatch(listComplaints());
      setComplaintText('');
    } else {
      setErrorText("You can't leave complaint filed empty");
    }
  };
  return (
    <section>
      <Grid
        container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          style={{
            minWidth: 400,
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '1rem',
          }}
        >
          {userInfo ? !userInfo.isAdmin && <h2>Write your complaint</h2> : ''}
          {userInfo && userInfo.name && !userInfo.isAdmin ? (
            <form
              onSubmit={submitHandler}
              style={{
                minWidth: 400,
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <TextareaAutosize
                aria-label='Write your complaint'
                minWidth={20}
                minLength={10}
                rowsMin={7}
                cols={40}
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
              />
              {complaintError && (
                <Alert severity='error'>{complaintError}</Alert>
              )}
              {errorText && <Alert severity='error'>{errorText}</Alert>}
              {complaintSuccess && (
                <Alert severity='success'>
                  Complaint Submitted Successfully
                </Alert>
              )}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                style={{ marginTop: '0.8rem' }}
              >
                {loading ? <CircularProgress size={30} /> : 'Send'}
              </Button>
            </form>
          ) : userInfo ? (
            userInfo.isAdmin && (
              <Alert severity='info'>
                Check complaints at{' '}
                <Link to='/admin/complaints'>admin dashboard</Link>
              </Alert>
            )
          ) : (
            <Alert severity='info'>
              You need to be singed in to write a complaint
            </Alert>
          )}
        </Paper>
      </Grid>
      <h2 style={{ textAlign: 'center' }}>All Complaints</h2>

      <Grid container>
        <Grid item sm />
        <Grid
          item
          sm
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {loadingList ? (
            <CircularProgress size={80} />
          ) : (
            complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))
          )}
        </Grid>
        <Grid item sm />
      </Grid>
    </section>
  );
};

export default HomePage;
