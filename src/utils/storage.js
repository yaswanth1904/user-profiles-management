import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'user-profiles';
const DEV_MODE_KEY = 'user-profiles-dev-mode';

// Sample data for seeding
const SAMPLE_USERS = [
  {
    id: uuidv4(),
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:30:00Z',
    lastModified: '2024-01-15T10:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-16T14:20:00Z',
    lastModified: '2024-01-16T14:20:00Z'
  },
  {
    id: uuidv4(),
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-17T09:15:00Z',
    lastModified: '2024-01-17T09:15:00Z'
  },
  {
    id: uuidv4(),
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-18T16:45:00Z',
    lastModified: '2024-01-18T16:45:00Z'
  },
  {
    id: uuidv4(),
    name: 'Eva Brown',
    email: 'eva.brown@example.com',
    role: 'User',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-19T11:30:00Z',
    lastModified: '2024-01-19T11:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-20T08:15:00Z',
    lastModified: '2024-01-20T08:15:00Z'
  }
];

// Simulate async operations with delay
const simulateAsync = async (ms = 300) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

// Check if dev mode is enabled
export const isDevMode = () => {
  return localStorage.getItem(DEV_MODE_KEY) === 'true';
};

// Toggle dev mode
export const toggleDevMode = () => {
  const current = isDevMode();
  localStorage.setItem(DEV_MODE_KEY, (!current).toString());
  return !current;
};

// Simulate random errors in dev mode
const shouldSimulateError = () => {
  return isDevMode() && Math.random() < 0.1; // 10% chance of error
};

// Get all users from localStorage
export const getUsers = async () => {
  await simulateAsync();
  
  if (shouldSimulateError()) {
    throw new Error('Failed to fetch users');
  }
  
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  
  try {
    const parsed = JSON.parse(data);
    return parsed.users || [];
  } catch (error) {
    console.error('Error parsing users data:', error);
    return [];
  }
};

// Save users to localStorage
export const saveUsers = async (users) => {
  await simulateAsync();
  
  if (shouldSimulateError()) {
    throw new Error('Failed to save users');
  }
  
  const data = {
    users,
    lastUpdated: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

// Add a new user
export const addUser = async (userData) => {
  const users = await getUsers();
  const newUser = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString()
  };
  
  const updatedUsers = [...users, newUser];
  await saveUsers(updatedUsers);
  return newUser;
};

// Update an existing user
export const updateUser = async (id, userData) => {
  const users = await getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...userData,
    lastModified: new Date().toISOString()
  };
  
  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;
  
  await saveUsers(updatedUsers);
  return updatedUser;
};

// Delete a user
export const deleteUser = async (id) => {
  const users = await getUsers();
  const updatedUsers = users.filter(user => user.id !== id);
  
  if (updatedUsers.length === users.length) {
    throw new Error('User not found');
  }
  
  await saveUsers(updatedUsers);
  return true;
};

// Reset to sample data
export const resetToSampleData = async () => {
  await simulateAsync();
  
  if (shouldSimulateError()) {
    throw new Error('Failed to reset data');
  }
  
  await saveUsers(SAMPLE_USERS);
  return SAMPLE_USERS;
};

// Clear all data
export const clearAllData = async () => {
  await simulateAsync();
  
  if (shouldSimulateError()) {
    throw new Error('Failed to clear data');
  }
  
  localStorage.removeItem(STORAGE_KEY);
  return [];
};
