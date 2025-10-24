// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (name.trim().length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateRole = (role) => {
  if (!role) return 'Role is required';
  const validRoles = ['Admin', 'Manager', 'Developer', 'User'];
  if (!validRoles.includes(role)) return 'Please select a valid role';
  return null;
};

// Validate entire user object
export const validateUser = (user) => {
  const errors = {};
  
  const nameError = validateName(user.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(user.email);
  if (emailError) errors.email = emailError;
  
  const roleError = validateRole(user.role);
  if (roleError) errors.role = roleError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Check if email is unique (excluding current user for updates)
export const isEmailUnique = (email, users, excludeId = null) => {
  return !users.some(user => 
    user.email.toLowerCase() === email.toLowerCase() && 
    user.id !== excludeId
  );
};
