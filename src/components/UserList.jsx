import React, { useState, useMemo } from 'react';
import { UserCard } from './UserCard';
import { LoadingSkeleton } from './LoadingSkeleton';

export const UserList = ({ 
  users, 
  loading, 
  onEditUser, 
  onDeleteUser, 
  searchTerm, 
  onSearchChange,
  filterRole,
  onFilterChange,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (filterRole && filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'role':
          aValue = a.role.toLowerCase();
          bValue = b.role.toLowerCase();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, filterRole, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return (
        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortOrder === 'asc' ? (
      <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton type="card" count={6} />
      </div>
    );
  }

  if (filteredAndSortedUsers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-lg relative overflow-hidden">
          {/* Moderate gradient overlay */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-200/4 to-gray-300/3 rounded-full blur-xl"></div>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-gray-200 rounded-full flex items-center justify-center relative z-10">
            <svg className="h-8 w-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 relative z-10">No users found</h3>
          <p className="text-sm text-gray-600 max-w-md mx-auto relative z-10">
            {searchTerm || filterRole !== 'all' 
              ? 'Try adjusting your search or filter criteria to find what you\'re looking for.' 
              : 'Get started by adding your first user to the system.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
    <div className="bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/70 backdrop-blur-lg rounded-3xl p-6 border border-blue-200/40 shadow-xl shadow-blue-200/15 relative overflow-hidden">
      {/* Beautiful gradient overlay */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-300/8 to-indigo-400/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-300/6 to-pink-400/4 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-300/4 to-teal-400/3 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 relative z-10">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-blue-300/60 rounded-xl leading-5 bg-gradient-to-r from-white/95 to-blue-50/80 placeholder-blue-500 focus:outline-none focus:placeholder-blue-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 sm:text-sm transition-all duration-200 shadow-sm shadow-blue-200/25"
              />
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex items-center space-x-3">
            {/* Role Filter */}
            <select
              value={filterRole}
              onChange={(e) => onFilterChange(e.target.value)}
              className="block w-full pl-3 pr-10 py-3 text-base border border-blue-300/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 sm:text-sm rounded-xl transition-all duration-200 bg-gradient-to-r from-white/95 to-blue-50/80 shadow-sm shadow-blue-200/25"
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="User">User</option>
            </select>

            {/* Sort Options */}
            <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-50/90 to-indigo-50/80 rounded-xl p-1">
              <span className="text-sm text-blue-600 px-2 font-medium">Sort:</span>
              <button
                onClick={() => handleSort('name')}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-200"
                aria-label="Sort by name"
              >
                <span>Name</span>
                {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSort('role')}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-200"
                aria-label="Sort by role"
              >
                <span>Role</span>
                {getSortIcon('role')}
              </button>
              <button
                onClick={() => handleSort('createdAt')}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 rounded-lg transition-all duration-200"
                aria-label="Sort by date"
              >
                <span>Date</span>
                {getSortIcon('createdAt')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="bg-gradient-to-r from-white/85 via-blue-50/80 to-indigo-50/75 backdrop-blur-lg rounded-2xl px-6 py-3 border border-blue-200/40 shadow-lg shadow-blue-200/15 relative overflow-hidden">
        {/* Beautiful gradient overlay */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300/8 to-indigo-400/6 rounded-full blur-xl"></div>
        <div className="flex items-center justify-between relative z-10">
          <span className="text-sm font-medium text-blue-700">
            Showing <span className="text-blue-600 font-semibold">{filteredAndSortedUsers.length}</span> of <span className="text-blue-900 font-semibold">{users.length}</span> users
          </span>
          <div className="flex items-center space-x-2 text-xs text-blue-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>

      {/* User Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      }`}>
        {filteredAndSortedUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEditUser}
            onDelete={onDeleteUser}
            isHoverable={true}
          />
        ))}
      </div>
    </div>
  );
};
