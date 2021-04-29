import React, { useEffect } from 'react';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress, IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { ListUsers, deleteUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';

// Material UI style
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// view all users in the database and admins and can edit them or delete them.
export default function UserAdminPage({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(ListUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <CircularProgress size={30} className={classes.progress} />
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align='right'>name</TableCell>
                <TableCell align='right'>email</TableCell>
                <TableCell align='right'>Admin</TableCell>
                <TableCell align='right'>Edit</TableCell>
                <TableCell align='right'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell component='th' scope='row'>
                    {user.name}
                  </TableCell>
                  <TableCell align='right'>{user.email}</TableCell>
                  <TableCell align='right'>
                    {user.isAdmin ? (
                      <ThumbUpIcon style={{ color: 'green' }} />
                    ) : (
                      <ThumbDownIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='delete'
                      className={classes.margin}
                      size='small'
                      component={Link}
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <EditIcon fontSize='inherit' />
                    </IconButton>
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='delete'
                      className={classes.margin}
                      size='small'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <DeleteForeverIcon
                        style={{ color: 'red' }}
                        fontSize='inherit'
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
