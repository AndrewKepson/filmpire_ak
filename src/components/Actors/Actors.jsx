import React, { useState } from 'react'
import { Box, Typography, Button, CircularProgress, Grid } from '@mui/material'
import { useParams, useHistory } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'

import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery
} from '../../services/TMDB'
import useStyles from './styles'

import { MovieList, Pagination } from '..'

const Actors = () => {
  const [page, setPage] = useState(1)
  const { id } = useParams()
  const history = useHistory()
  const { data: actorDetails, isFetching, error } = useGetActorsDetailsQuery(id)
  const { data: moviesByActor } = useGetMoviesByActorIdQuery({ id, page })
  const classes = useStyles()

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color='primary'>
          Go Back
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${actorDetails?.profile_path}`}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}>
          <Typography variant='h2' gutterBottom>
            {actorDetails?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(actorDetails?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='justify' paragraph>
            {actorDetails?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button
              variant='contained'
              color='primary'
              target='_blank'
              href={`https://www.imdb.com/name/${actorDetails?.imdb_id}`}>
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
              color='primary'>
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>
          Movies
        </Typography>
        {moviesByActor && (
          <MovieList movies={moviesByActor} numberOfMovies={12} />
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={moviesByActor?.total_pages}
        />
      </Box>
    </>
  )
}

export default Actors
