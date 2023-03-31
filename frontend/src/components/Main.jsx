import React, { useState, useEffect } from 'react'
import { Paginator, Container, PageGroup, usePaginator } from "chakra-paginator"
import { Grid } from '@chakra-ui/react';
import PostList from './blogComponents/PostList';

export default function Main() {

  const [postsTotal, setPostsTotal] = useState(undefined);
  const [posts, setPosts] = useState([]);

  /**
   * fetching post from db
   */
  const fetchPosts = async (pageSize, offset) => {
    const res = await fetch(
      `http://localhost/php/reactPhp/api/posts?limit=${pageSize}&offset=${offset}`
    );
    return await res.json();
  }

  useEffect(() => {
    let pageSize = 10;
    let offset = 0;
    fetchPosts(pageSize, offset).then((posts) => {
      setPostsTotal(posts.count);
      setPosts(posts.posts);
    })
  }, [])
  return (
    <Paginator>
      <Grid templateColumns='(4, 1fr)' gap={6}>
        {posts.map(function ({ id, title, content, image, user_id }) {
          return <PostList key={id} id={id} title={title} content={content} image={image} userId={user_id} />
         
        })}
      </Grid>
      <Container align={'center'} justify="space-between" w={"full"} marginTop="50px">
        <PageGroup isInline align={'center'} />
      </Container>
    </Paginator>
  )
}
