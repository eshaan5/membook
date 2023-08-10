import React from 'react'
import Post from './Post/Post'

import useStyles from './style'
import { Grid, CircularProgress } from '@material-ui/core'

import { useSelector } from 'react-redux'

const Posts = ({ setCurrentId }) => {

    const posts = useSelector((state) => state.app.posts.data)
    const isLoading = useSelector((state) => state.app.posts.isLoading)
    const classes = useStyles()

    if (!posts.length && !isLoading) return 'No posts'
    
  return (
    <>
        {isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )}
    </>
  )
}

export default Posts