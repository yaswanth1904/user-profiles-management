import React from 'react';

export const UserCard = ({ 
  user, 
  onEdit, 
  onDelete, 
  isHoverable = true 
}) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200 shadow-sm';
      case 'Manager':
        return 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200 shadow-sm';
      case 'Developer':
        return 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200 shadow-sm';
      case 'User':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200 shadow-sm';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className={`bg-gradient-to-br from-white/95 via-blue-50/80 to-indigo-50/70 backdrop-blur-lg rounded-3xl border border-blue-200/50 p-6 card-hover animate-fade-in shadow-xl shadow-blue-200/15 hover:shadow-2xl hover:shadow-blue-300/25 relative overflow-hidden ${
        isHoverable
          ? 'cursor-pointer'
          : ''
      }`}
      onClick={isHoverable ? () => onEdit(user) : undefined}
      role={isHoverable ? 'button' : undefined}
      tabIndex={isHoverable ? 0 : undefined}
      onKeyDown={isHoverable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit(user);
        }
      } : undefined}
      aria-label={isHoverable ? `Edit user ${user.name}` : undefined}
    >
      {/* Beautiful gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/8 to-indigo-400/6 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-300/6 to-pink-400/4 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-cyan-300/4 to-teal-400/3 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="flex items-center space-x-4 relative z-10">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 animate-float"
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=48`;
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                {user.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {user.email}
              </p>
            </div>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ml-3 ${getRoleColor(user.role)} animate-scale-in`}>
              {user.role}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Joined {formatDate(user.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user);
            }}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label={`Edit ${user.name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user);
            }}
            className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-danger-500 focus:ring-offset-2"
            aria-label={`Delete ${user.name}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
