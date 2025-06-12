import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import articles from '../../article-content'; // adjust the path if needed
import { Typography, Button, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const DashArticleListPage = () => {
  const [articleRows, setArticleRows] = useState([]);

  useEffect(() => {
    const formatted = articles.map((article, index) => ({
      id: index + 1, // DataGrid requires an 'id' field
      name: article.name,
      title: article.title,
      content: article.content.join(' '), // join paragraphs into one string
    }));
    setArticleRows(formatted);
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'content',
      headerName: 'Content Preview',
      flex: 2,
      renderCell: (params) => (
        <Tooltip title={params.row.content}>
          <span>
            {params.row.content.length > 60
              ? params.row.content.substring(0, 60) + '...'
              : params.row.content}
          </span>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" size="small">Edit</Button>
          <Button variant="outlined" color="error" size="small">Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Article Management</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          Add Article
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={articleRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Box>
    </Box>
  );
};

export default DashArticleListPage;
