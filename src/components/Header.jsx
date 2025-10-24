import React from 'react';

export const Header = ({ 
  onAddUser, 
  onResetData, 
  onToggleDevMode, 
  isDevMode, 
  userCount 
}) => {
  return (
    <header className="bg-gradient-to-r from-white/95 via-blue-50/90 to-indigo-50/85 backdrop-blur-lg border-b border-blue-200/40 sticky top-0 z-40 shadow-lg shadow-blue-200/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-semibold text-gradient animate-fade-in">
                User Profiles
              </h1>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 animate-scale-in">
                {userCount} users
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Dev Mode Toggle */}
            <button
              onClick={onToggleDevMode}
              className={`btn-ghost text-sm px-3 py-2 rounded-lg transition-all duration-200 ${
                isDevMode 
                  ? 'bg-warning-100 text-warning-700 hover:bg-warning-200' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label={`${isDevMode ? 'Disable' : 'Enable'} dev mode`}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="hidden sm:inline">Dev Mode</span>
            </button>

            {/* Reset Data Button */}
            <button
              onClick={onResetData}
              className="btn-secondary text-sm px-3 py-2 rounded-lg"
              aria-label="Reset to sample data"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Add User Button */}
            <button
              onClick={onAddUser}
              className="btn-primary text-sm px-4 py-2 rounded-lg animate-bounce-subtle"
              aria-label="Add new user"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
