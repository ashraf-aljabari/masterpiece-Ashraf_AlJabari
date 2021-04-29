import React, { useState } from 'react';
// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
// (calculates time difference between when
// was the complaint created and now()
// to show the difference).
import TimeAgo from 'timeago-react';
// sub components
import CommentCard from './Comment';
//redux imports
import { useDispatch, useSelector } from 'react-redux';
import {
  listComplaints,
  updateComplaint,
} from '../redux/actions/complaintActions';
import { COMPLAINT_UPDATE_RESET } from '../redux/constants/complaintsConstants';
import { Link } from 'react-router-dom';

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

const ComplaintCard = ({ complaint }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(complaint.status);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const complaintUpdate = useSelector((state) => state.complaintUpdate);
  const { loading, error } = complaintUpdate;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {complaint.user_name.charAt(0)}
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
            loading ? (
              <CircularProgress size={30} />
            ) : (
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    dispatch(updateComplaint(e.target.value, complaint._id));
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
            <Typography variant='caption' color='textSecondary' component='p'>
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
        <IconButton
          aria-label='share'
          component={Link}
          to={`/complaint/${complaint._id}`}
        >
          <VisibilityIcon />
          <small style={{ fontSize: '10px' }}>view complaint</small>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          {complaint.comments.map((comment) => (
            <CommentCard comment={comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ComplaintCard;
