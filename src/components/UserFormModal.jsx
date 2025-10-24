import React, { useState, useEffect } from 'react';
import { validateUser, isEmailUnique } from '../utils/validators';

export const UserFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user = null, 
  existingUsers = [],
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    avatar: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEdit = !!user;

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          role: user.role || 'User',
          avatar: user.avatar || ''
        });
      } else {
        setFormData({
          name: '',
          email: '',
          role: 'User',
          avatar: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateUser(formData);
    
    // Check email uniqueness
    if (!isEmailUnique(formData.email, existingUsers, user?.id)) {
      validation.errors.email = 'Email already exists';
      validation.isValid = false;
    }
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/85 backdrop-blur-lg rounded-2xl text-left overflow-hidden shadow-2xl shadow-blue-300/25 transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-scale-in border border-blue-200/40">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-300/25 to-indigo-400/20 sm:mx-0 sm:h-10 sm:w-10 animate-bounce-subtle">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {isEdit ? 'Edit User' : 'Add New User'}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    className={`mt-1 block w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 sm:text-sm transition-all duration-200 ${
                      errors.name ? 'border-danger-300 bg-danger-50' : 'border-blue-300/60 bg-gradient-to-r from-white/95 to-blue-50/80'
                    }`}
                        placeholder="Enter full name"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-danger-600 animate-slide-down">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 sm:text-sm transition-colors duration-150 ${
                          errors.email ? 'border-red-300' : 'border-blue-300/60 bg-gradient-to-r from-white/95 to-blue-50/80'
                        }`}
                        placeholder="Enter email address"
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    {/* Role Field */}
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role *
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 sm:text-sm transition-all duration-200 ${
                          errors.role ? 'border-danger-300 bg-danger-50' : 'border-blue-300/60 bg-gradient-to-r from-white/95 to-blue-50/80'
                        }`}
                        disabled={isSubmitting}
                      >
                        <option value="User">User</option>
                        <option value="Developer">Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                      </select>
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                      )}
                    </div>

                    {/* Avatar Field */}
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        name="avatar"
                        id="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-150"
                        placeholder="Enter avatar URL (optional)"
                        disabled={isSubmitting}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Leave empty to use a generated avatar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="btn-primary w-full sm:ml-3 sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEdit ? 'Update User' : 'Create User'
                )}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="btn-secondary mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
