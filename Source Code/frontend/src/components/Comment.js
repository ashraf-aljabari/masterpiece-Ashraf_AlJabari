import React from 'react';
// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
// (calculates time difference between when
// was the complaint created and now()
// to show the difference).
import TimeAgo from 'timeago-react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '0.5rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    fontSize: '10px',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  avatar: {
    marginTop: '1.3rem',
    marginLeft: '0.7rem',
  },
}));

const CommentCard = ({ comment }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Avatar aria-label='recipe' className={classes.avatar}>
        {comment.name.charAt(0)}
      </Avatar>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography>{comment.name}</Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            <TimeAgo color='black' datetime={comment.createdAt} />
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant='body1' color='textPrimary'>
            {comment.comment}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export default CommentCard;
