import { CircularProgress, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaygroundCard from '../components/PlaygroundCard';
import { listPlaygrounds } from '../redux/actions/playgroundActions';

const AllPlaygroundsPage = () => {
  const dispatch = useDispatch();
  const playgroundList = useSelector((state) => state.playgroundList);
  const { loading: loadingPlaygrounds, playgrounds } = playgroundList;

  useEffect(() => {
    dispatch(listPlaygrounds());
  }, [dispatch]);
  return (
    <div>
      <Container>
        <Grid container spacing={2} justify='center'>
          {loadingPlaygrounds ? (
            <CircularProgress size={80} />
          ) : (
            playgrounds &&
            playgrounds.map((playground) =>
              playground.approved ? (
                <PlaygroundCard playground={playground} key={playground._id} />
              ) : (
                ''
              )
            )
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default AllPlaygroundsPage;
