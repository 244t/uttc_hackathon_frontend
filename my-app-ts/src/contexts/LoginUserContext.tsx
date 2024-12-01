import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LoginUserContextType {
  loginUser: string;
  setLoginUser: (userId: string) => void;
}

const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

export const LoginUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<string>(() => {
    // 初期値としてlocalStorageからユーザーIDを取得
    return localStorage.getItem('loginUser') || ''; // 初期値は空文字列
  });

  // loginUserが変わったときにlocalStorageに保存
  useEffect(() => {
    if (loginUser) {
      localStorage.setItem('loginUser', loginUser);
    }
  }, [loginUser]);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = (): LoginUserContextType => {
  const context = useContext(LoginUserContext);
  if (!context) {
    throw new Error('useLoginUser must be used within a LoginUserProvider');
  }
  return context;
};
