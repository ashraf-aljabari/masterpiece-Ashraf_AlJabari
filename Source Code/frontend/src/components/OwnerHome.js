import {
  Button,
  CircularProgress,
  Container,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Zoom,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPlayground,
  listMyPlaygrounds,
} from '../redux/actions/playgroundActions';
import { PLAYGROUND_CREATE_RESET } from '../redux/constants/playgroundConstants';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import PlaygroundCard from '../components/PlaygroundCard';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: '60%',
    height: '68%',
    backgroundColor: 'white',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeModal: {
    color: 'red',
    position: 'absolute',
    right: '15px',
  },
  container: {
    // position: 'relative',
    display: 'flex',
    // flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  right: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '100%',
  },
  left: {
    width: '50%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10px',
  },
  textField: {
    margin: '0px auto 10px auto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const OwnerHome = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState(null);
  const [playName, setPlayName] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState('');
  const [errorText, setErrorText] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const playgroundCreate = useSelector((state) => state.playgroundCreate);
  const { loading, error, success } = playgroundCreate;

  const playgroundListMy = useSelector((state) => state.playgroundListMy);
  const { loading: loadingPlaygrounds, playgrounds } = playgroundListMy;

  console.log(playgrounds);

  useEffect(() => {
    // dispatch({ type: COMPLAINT_CREATE_RESET });
    dispatch(listMyPlaygrounds());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setLocation('');
    setCapacity(0);
    setPlayName('');
    setErrorText('');
    setSubmitLoading(false);
  };

  const submitHandler = async () => {
    console.log(
      playName.trim().length !== 0 &&
        location.trim().length !== 0 &&
        capacity > 0 &&
        file.name.length !== 0
    );
    if (
      playName.trim().length !== 0 &&
      location.trim().length !== 0 &&
      capacity >= 0
    ) {
      setSubmitLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await axios.post(`/api/images`, formData, config);
      const playgroundImage = response.data.filename;
      dispatch(createPlayground(playgroundImage, playName, capacity, location));
      dispatch({ type: PLAYGROUND_CREATE_RESET });
      dispatch(listMyPlaygrounds());
      if (error) {
        console.log(error);
      } else {
        handleClose();
      }
    } else {
      setErrorText("You can't leave any filed empty");
    }
  };

  return (
    <section>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <IconButton
              className={classes.closeModal}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <div className={classes.container}>
              {/* <div className={classes.right}> */}
              <img
                width='50%'
                src={
                  file == null
                    ? 'https://elizabethtownky.org/wp-content/uploads/2019/01/soccer3.jpeg'
                    : URL.createObjectURL(file)
                }
              />
              {/* </div> */}
              <div className={classes.left}>
                <h4>Add Playground</h4>
                <TextField
                  id='image'
                  name='image'
                  type='file'
                  label='Image'
                  className={classes.textField}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  fullWidth
                />
                <TextField
                  id='playName'
                  name='playName'
                  type='text'
                  label='Playground Name'
                  className={classes.textField}
                  value={playName}
                  onChange={(e) => {
                    setPlayName(e.target.value);
                  }}
                  fullWidth
                />
                <TextField
                  id='capacity'
                  name='capacity'
                  type='number'
                  label='Playground Capacity'
                  className={classes.textField}
                  value={capacity}
                  onChange={(e) => {
                    if (e.target.value < 0) {
                      setCapacity(0);
                    } else {
                      setCapacity(e.target.value);
                    }
                  }}
                  fullWidth
                />
                <TextField
                  id='location'
                  name='location'
                  type='text'
                  label='location'
                  className={classes.textField}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  fullWidth
                />
                {errorText && <Alert severity='error'>{errorText}</Alert>}
                {error && <Alert severity='error'>{error}</Alert>}
                <div className={classes.buttonContainer}>
                  <Button
                    color='primary'
                    variant='contained'
                    disabled={loading}
                    style={{ marginTop: '0.8rem' }}
                    onClick={() => submitHandler()}
                  >
                    {submitLoading ? <CircularProgress size={30} /> : 'Submit'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>

      <Container>
        <Grid
          container
          className={classes.rightCon}
          spacing={2}
          justify='center'
        >
          {loadingPlaygrounds ? (
            <CircularProgress size={80} />
          ) : (
            playgrounds &&
            playgrounds.map((playground) => (
              <PlaygroundCard playground={playground} key={playground._id} />
            ))
          )}
        </Grid>
      </Container>

      <Fab
        aria-label={'Add'}
        className={classes.fab}
        color={'primary'}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>
    </section>
  );
};

export default OwnerHome;
