import React, { useEffect, useState } from 'react';
// Redux imports
import {
  listComplaintDetails,
  createComplaintComment,
  updateComplaint,
  listComplaints,
} from '../redux/actions/complaintActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  COMPLAINT_CREATE_COMMENT_RESET,
  COMPLAINT_UPDATE_RESET,
} from '../redux/constants/complaintsConstants';
// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
// (calculates time difference between when
// was the complaint created and now()
// to show the difference).
import TimeAgo from 'timeago-react';
// sub components
import CommentCard from '../components/Comment';
import Alert from '@material-ui/lab/Alert';

// Material UI style
const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    maxWidth: 600,
    marginBottom: '0.8rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// single complaint page cna be viewed
// here and view the comments of the complaint and comment on it
const ComplaintPage = ({ history, match }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const complaintDetails = useSelector((state) => state.complaintDetails);
  const { loading, error, complaint } = complaintDetails;

  const [status, setStatus] = useState(complaint.status);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const complaintUpdate = useSelector((state) => state.complaintUpdate);
  const { loading: loadingComplaint } = complaintUpdate;

  const complaintCommentCreate = useSelector(
    (state) => state.complaintCommentCreate
  );
  const {
    success: successComplaintComment,
    loading: loadingComplaintComment,
    error: errorComplaintComment,
  } = complaintCommentCreate;

  useEffect(() => {
    if (successComplaintComment) {
      setComment('');
    }
    if (!complaint._id || complaint._id !== match.params.id) {
      dispatch(listComplaintDetails(match.params.id));
      dispatch({ type: COMPLAINT_CREATE_COMMENT_RESET });
    }
  }, [dispatch, match, successComplaintComment, complaint._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createComplaintComment(match.params.id, comment));
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid item sm>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label='recipe' className={classes.avatar}>
                {complaint.user_name && complaint.user_name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={complaint.user_name}
            subheader={<TimeAgo color='black' datetime={complaint.createdAt} />}
          />
          <CardContent>
            {error && <p>{error}</p>}
            {userInfo &&
              (userInfo.isAdmin ? (
                loadingComplaint ? (
                  <CircularProgress size={30} />
                ) : (
                  <FormControl className={classes.formControl}>
                    <InputLabel id='demo-simple-select-label'>
                      Status
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                        dispatch(
                          updateComplaint(e.target.value, complaint._id)
                        );
                        dispatch({ type: COMPLAINT_UPDATE_RESET });
                        dispatch(listComplaints());
                      }}
                    >
                      <MenuItem value='resolved'>Resolved</MenuItem>
                      <MenuItem value='pending'>Pending</MenuItem>
                      <MenuItem value='dismissed'>Dismissed</MenuItem>
                    </Select>
                  </FormControl>
                )
              ) : (
                <Typography
                  variant='caption'
                  color='textSecondary'
                  component='p'
                >
                  Status: {complaint.status}
                </Typography>
              ))}
            <Typography variant='body2' color='textPrimary' component='p'>
              {complaint.complaint_text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
              <small style={{ fontSize: '15px' }}>
                {complaint.numberOfComments}
              </small>
            </IconButton>
          </CardActions>
        </Card>
        {userInfo && (
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
            <form
              onSubmit={submitHandler}
              style={{
                minWidth: 400,
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextField
                id='comment'
                name='comment'
                type='text'
                label='Comment'
                className={classes.textField}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
              />
              {errorComplaintComment && (
                <Alert severity='error'>{errorComplaintComment}</Alert>
              )}
              {/* {errorText && <Alert severity='error'>{errorText}</Alert>} */}
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={loading}
                style={{ marginTop: '0.8rem' }}
              >
                {loadingComplaintComment ? (
                  <CircularProgress size={30} />
                ) : (
                  'Send'
                )}
              </Button>
            </form>
          </Paper>
        )}
        {complaint.comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default ComplaintPage;
