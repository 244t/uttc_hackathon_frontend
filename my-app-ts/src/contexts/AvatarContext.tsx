// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import axios from 'axios';
// import { useLoginUser } from './LoginUserContext'; // LoginUserContextからloginUserを取得

// const AvatarContext = createContext<{ avatarUrl: string, setAvatarUrl: (url: string) => void } | undefined>(undefined);

// export const useAvatar = () => {
//   const context = useContext(AvatarContext);
//   if (!context) {
//     throw new Error('useAvatar must be used within an AvatarProvider');
//   }
//   return context;
// };

// interface AvatarProviderProps {
//   children: ReactNode;
// }

// export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
//   const [avatarUrl, setAvatarUrl] = useState<string>('');
//   const { loginUser } = useLoginUser(); // LoginUserContextからloginUserを取得

//   useEffect(() => {
//     // loginUserが存在する場合にアバターURLを取得
//     if (loginUser) {
//       axios
//         .get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}`)
//         .then((response) => {
//           setAvatarUrl(response.data.img_url); // APIから取得したアバターURLを設定
//         })
//         .catch((error) => {
//           console.error('Error fetching user data:', error);
//         });
//     }
//   }, [loginUser]); // loginUserが変わるたびに再度APIを呼び出す

//   return (
//     <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
//       {children}
//     </AvatarContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useLoginUser } from './LoginUserContext'; // LoginUserContextからloginUserを取得

// AvatarContextの型を定義。nameはstring型、avatarUrlもstring型
const AvatarContext = createContext<{
  avatarUrl: string;
  loginName: string; // nameにstring型の型注釈を追加
  setAvatarUrl: (url: string) => void;
  setLoginName: (name: string) => void;
} | undefined>(undefined);

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};

interface AvatarProviderProps {
  children: ReactNode;
}

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(''); // avatarUrlにstring型
  const [loginName, setLoginName] = useState<string>(''); // nameにstring型
  const { loginUser } = useLoginUser(); // LoginUserContextからloginUserを取得

  useEffect(() => {
    // loginUserが存在する場合にアバターURLと名前を取得
    if (loginUser) {
      axios
        .get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}`)
        .then((response) => {
          console.log(response)
          setAvatarUrl(response.data.img_url); // APIから取得したアバターURLを設定
          setLoginName(response.data.name); // APIから取得したユーザー名を設定
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
        console.log(avatarUrl)
    }
  }, [loginUser]); // loginUserが変わるたびに再度APIを呼び出す

  return (
    <AvatarContext.Provider value={{ avatarUrl, loginName, setAvatarUrl, setLoginName }}>
      {children}
    </AvatarContext.Provider>
  );
};