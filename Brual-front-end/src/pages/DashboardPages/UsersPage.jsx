import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { createUser, fetchUsers, updateUser } from '../../Service/UserService';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  Typography,
  TextField,
  Stack
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'user', // Add default type
    isActive: true,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetchUsers();
      console.log('Full API response:', response);
      console.log('Response data:', response.data);
      
      // Handle different response structures
      let userData;
      if (Array.isArray(response.data)) {
        userData = response.data;
      } else if (response.data && Array.isArray(response.data.users)) {
        userData = response.data.users;
      } else if (Array.isArray(response)) {
        userData = response;
      } else {
        console.error('Unexpected response structure:', response);
        userData = [];
      }
      
      console.log('Setting users state to:', userData);
      setUsers(userData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      type: 'user',
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id || user.id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: '' });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    try {
      const userToSend = {
        ...newUser,
        age: Number(newUser.age),
      };
      console.log('Saving user:', userToSend);

      let result;
      if (isEditing) {
        const updatedUser = { ...userToSend };
        if (!updatedUser.password) {
          delete updatedUser.password;
        }
        result = await updateUser(editUserId, updatedUser);
      } else {
        result = await createUser(userToSend);
      }
      
      console.log('Save result:', result);
      
      // Reload users data
      await loadUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  // Debug: Log current users state
  console.log('Current users state:', users);
  console.log('Users array length:', users.length);
  console.log('Loading state:', loading);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (params) => {
        if (!params || !params.row) return '';
        return params.row.name || '';
      },
    },
    { field: 'age', headerName: 'Age', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1, sortable: true },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        if (!params || !params.row) return null;
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEdit(params.row._id || params.row.id)}
            >
              Edit
            </Button>
            <Switch
              checked={params.row.isActive}
              onChange={() => handleToggleActive(params.row._id || params.row.id, params.row.isActive)}
              color="primary"
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Box>

      {/* Debug info */}
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Users loaded: {users.length} | Loading: {loading ? 'Yes' : 'No'}
      </Typography>

      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={Array.isArray(users) ? users : []}
          columns={columns}
          getRowId={(row) => {
            if (!row) return Math.random(); // fallback for invalid rows
            return row._id || row.id || Math.random();
          }}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10]}
          noRowsOverlay={() => (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography>
                {loading ? 'Loading users...' : users.length === 0 ? 'No users found' : 'No rows to display'}
              </Typography>
            </Box>
          )}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            {isEditing ? 'Edit User' : 'Add New User'}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Age"
              type="number"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contact Number"
              value={newUser.contactNumber}
              onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newUser.type}
                onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Active:</Typography>
              <Switch
                checked={newUser.isActive}
                onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
              />
            </Box>
            <Button variant="contained" onClick={handleSaveUser}>
              {isEditing ? 'Update User' : 'Create User'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default UsersPage;