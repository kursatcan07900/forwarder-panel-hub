
// JWT utility functions
export const generateToken = (userId: string) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    userId,
    exp: Date.now() + 3600000 // 1 hour validity
  }));
  const signature = btoa(`${header}.${payload}.SECRET_KEY`);
  
  return `${header}.${payload}.${signature}`;
};

export const verifyToken = (token: string) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    if (!payload || !payload.exp) return false;
    
    return payload.exp > Date.now();
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
