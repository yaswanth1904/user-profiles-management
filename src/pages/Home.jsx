import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { UserList } from '../components/UserList';
import { UserFormModal } from '../components/UserFormModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { ErrorBanner } from '../components/ErrorBanner';
import { Toast } from '../components/Toast';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  getUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  resetToSampleData, 
  toggleDevMode 
} from '../utils/storage';

export const Home = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [viewMode] = useState('grid');
  const [devMode, setDevMode] = useLocalStorage('user-profiles-dev-mode', 'false');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState(null);
  
  // Async actions
  const { loading: loadingUsers, error: usersError, execute: executeUsersAction } = useAsyncAction();
  const { loading: loadingAction, error: actionError, execute: executeAction } = useAsyncAction();

  // Load users from storage
  const loadUsers = useCallback(async () => {
    try {
      const usersData = await executeUsersAction(getUsers);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }, [executeUsersAction]);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Show toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Handle add user
  const handleAddUser = useCallback(() => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  }, []);

  // Handle edit user
  const handleEditUser = useCallback((user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  }, []);

  // Handle delete user
  const handleDeleteUser = useCallback((user) => {
    setDeletingUser(user);
    setIsConfirmDialogOpen(true);
  }, []);

  // Handle form submission
  const handleFormSubmit = useCallback(async (formData) => {
    try {
      if (editingUser) {
        // Update existing user
        const updatedUser = await executeAction(updateUser, editingUser.id, formData);
        setUsers(prev => prev.map(user => user.id === editingUser.id ? updatedUser : user));
        showToast('User updated successfully!');
      } else {
        // Add new user
        const newUser = await executeAction(addUser, formData);
        setUsers(prev => [...prev, newUser]);
        showToast('User created successfully!');
      }
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      showToast('Failed to save user. Please try again.', 'error');
    }
  }, [editingUser, executeAction, showToast]);

  // Handle user deletion
  const handleConfirmDelete = useCallback(async () => {
    if (!deletingUser) return;
    
    try {
      await executeAction(deleteUser, deletingUser.id);
      setUsers(prev => prev.filter(user => user.id !== deletingUser.id));
      showToast('User deleted successfully!');
      setIsConfirmDialogOpen(false);
      setDeletingUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast('Failed to delete user. Please try again.', 'error');
    }
  }, [deletingUser, executeAction, showToast]);

  // Handle reset data
  const handleResetData = useCallback(async () => {
    try {
      const sampleUsers = await executeAction(resetToSampleData);
      setUsers(sampleUsers);
      showToast('Data reset to sample data!');
    } catch (error) {
      console.error('Error resetting data:', error);
      showToast('Failed to reset data. Please try again.', 'error');
    }
  }, [executeAction, showToast]);

  // Handle dev mode toggle
  const handleToggleDevMode = useCallback(() => {
    const newDevMode = toggleDevMode();
    setDevMode(newDevMode.toString());
    showToast(`Dev mode ${newDevMode ? 'enabled' : 'disabled'}`, 'info');
  }, [setDevMode, showToast]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Search is handled in UserList component
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close modals
  const closeFormModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingUser(null);
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setIsConfirmDialogOpen(false);
    setDeletingUser(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 relative overflow-hidden">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
      
      {/* Beautiful Gradient Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-indigo-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-300/12 to-pink-400/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-l from-cyan-300/10 to-blue-400/6 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-emerald-300/8 to-teal-400/5 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-rose-300/6 to-orange-400/4 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-violet-300/5 to-fuchsia-400/3 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-gradient-to-tl from-sky-300/4 to-cyan-400/3 rounded-full blur-lg"></div>
      {/* Header */}
      <Header
        onAddUser={handleAddUser}
        onResetData={handleResetData}
        onToggleDevMode={handleToggleDevMode}
        isDevMode={devMode === 'true'}
        userCount={users.length}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Error Banner */}
        {(usersError || actionError) && (
          <ErrorBanner
            error={usersError || actionError}
            onDismiss={() => {
              // Reset errors
            }}
            className="mb-6"
          />
        )}

        {/* Dev Mode Indicator */}
        {devMode && (
          <div className="mb-6 bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-xl p-4 animate-slide-down">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-warning-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.924-1.36 3.49 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-warning-800">
                  Development Mode Active
                </h3>
                <div className="mt-1 text-sm text-warning-700">
                  <p>Random errors may occur during operations. This helps test error handling.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User List */}
        <UserList
          users={users}
          loading={loadingUsers}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterRole={filterRole}
          onFilterChange={setFilterRole}
          viewMode={viewMode}
        />
      </main>

      {/* Modals */}
      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        user={editingUser}
        existingUsers={users}
        loading={loadingAction}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deletingUser?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={loadingAction}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
