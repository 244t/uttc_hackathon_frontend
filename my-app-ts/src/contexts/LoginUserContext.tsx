// // LoginUserContext.tsx
// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // loginUserの型を定義
// interface LoginUserContextType {
//   loginUser: string;
//   setLoginUser: (userId: string) => void;
// }

// // 初期状態
// const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

// // ContextのProviderを作成
// export const LoginUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [loginUser, setLoginUser] = useState<string>('001');  // 初期ユーザーID

//   return (
//     <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
//       {children}
//     </LoginUserContext.Provider>
//   );
// };

// // Contextを使うためのカスタムフック
// export const useLoginUser = (): LoginUserContextType => {
//   const context = useContext(LoginUserContext);
//   if (!context) {
//     throw new Error('useLoginUser must be used within a LoginUserProvider');
//   }
//   return context;
// };
import React, { createContext, useContext, useState, ReactNode } from 'react';

// loginUserの型を定義（string | nullを許容）
interface LoginUserContextType {
  loginUser: string | null;
  setLoginUser: (userId: string) => void;
}

// 初期状態
const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);

// ContextのProviderを作成
export const LoginUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loginUser, setLoginUser] = useState<string | null>(null);  // 初期値をnullに設定

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

// Contextを使うためのカスタムフック
export const useLoginUser = (): LoginUserContextType => {
  const context = useContext(LoginUserContext);
  if (!context) {
    throw new Error('useLoginUser must be used within a LoginUserProvider');
  }
  return context;
};

