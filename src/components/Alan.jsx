import React, { useEffect, useContext } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  selectGenreOrCategory,
  searchMovie
} from '../features/currentGenreOrCategory'
import { fetchToken } from '../utils'
import { ColorModeContext } from '../utils/ToggleColorMode'

function useAlan() {
  const { setMode } = useContext(ColorModeContext)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    alanBtn({
      key: 'eac63dc35769373bb776d232daabaad02e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            g => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          )

          if (foundGenre) {
            history.pushState('/')
            dispatchEvent(selectGenreOrCategory(foundGenre.id))
          } else {
            const parsedGenre = genreOrCategory.startsWith('top')
              ? 'top_rated'
              : genreOrCategory

            history.push('/')
            dispatch(selectGenreOrCategory(category))
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light')
          } else {
            setMode('dark')
          }
        } else if (command === 'login') {
          fetchToken()
        } else if (command === 'logout') {
          localStorage.clear()

          history.push('/')
        } else if (command === 'search') {
          dispatch(searchMovie(query))
        }
      }
    })
  }, [])
}

export default useAlan
