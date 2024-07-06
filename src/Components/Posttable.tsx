import React from 'react';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className='bg-transparent'>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow  >
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default PostTable;
