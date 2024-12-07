// import React from 'react';
// import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import ShareIcon from '@mui/icons-material/Share';
// import { useTweet } from '../contexts/TweetContext';
// import ReplyList from './ReplyList';

// export const TweetTimestamp: React.FC<{ created_at: string }> = ({ created_at }) => {
//     const formatDate = (dateString: string) => {
//       const date = new Date(dateString);
  
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
      
//       const hours = String(date.getHours()).padStart(2, '0');
//       const minutes = String(date.getMinutes()).padStart(2, '0');
  
//       return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
//     }
//     return (
//         <Typography variant="body2" color="text.secondary">{formatDate(created_at)}</Typography>
//     );
// };

// const TweetDetail: React.FC = () => {
//     const { tweet } = useTweet();

//     if (!tweet) {
//         return (
//             <Box sx={{ p: 2 }}>
//                 <Typography variant="h6">ツイート</Typography>
//                 <Typography variant="body1" color="text.secondary">
//                     ツイートを選択すると、ここに詳細が表示されます。
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ p: 2, width: '100%' }}>
//             <Typography variant="h6">ツイート詳細</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
//                 <Avatar src={tweet.user_profile_img} sx={{ mr: 2, width: 48, height: 48 }} />
//                 <Box>
//                     <Typography variant="subtitle1" fontWeight="bold">{tweet.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">@{tweet.user_id}</Typography>
//                 </Box>
//             </Box>
//             <Typography variant="body1" sx={{ mb: 2, fontSize: '1.25rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{tweet.content}</Typography>
//             {tweet.img_url && (
//                 <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
//                     <img src={tweet.img_url} alt="tweet image" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
//                 </Box>
//             )}
//             <TweetTimestamp created_at={tweet.created_at} />
//             <Divider sx={{ my: 2 }} />
//             <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, gap: 4 }}>
//                 <Typography variant="body2"><strong>{tweet.reply_counts}</strong> リプライ</Typography>
//                 <Typography variant="body2"><strong>{tweet.likes}</strong> いいね</Typography>
//             </Box>
//             <Divider sx={{ my: 2 }} />
//             {/* <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
//                 <IconButton size="large"><ChatBubbleOutlineIcon /></IconButton>
//                 <IconButton size="large"><RepeatIcon /></IconButton>
//                 <IconButton size="large"><FavoriteIcon /></IconButton>
//                 <IconButton size="large"><ShareIcon /></IconButton>
//             </Box> */}
//             <ReplyList />
//         </Box>
//     );
// };

// export default TweetDetail;

import React from 'react';
import { Box, Typography, Avatar, IconButton, Divider } from '@mui/material';
import { useLoginUser } from '../contexts/LoginUserContext';  // LoginUserContextをインポート
import { useAvatar } from '../contexts/AvatarContext';  // AvatarContextをインポート
import { useTweet } from '../contexts/TweetContext';
import ReplyList from './ReplyList';

export const TweetTimestamp: React.FC<{ created_at: string }> = ({ created_at }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}年${month}月${day}日 ${hours}時${minutes}分`;
    }
    return (
        <Typography variant="body2" color="text.secondary">{formatDate(created_at)}</Typography>
    );
};

const TweetDetail: React.FC = () => {
    const { loginUser } = useLoginUser(); // ログインユーザーIDを取得
    const { avatarUrl, loginName } = useAvatar(); // AvatarContextからavatarUrlとloginNameを取得
    const { tweet } = useTweet();

    if (!tweet) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">ツイート</Typography>
                <Typography variant="body1" color="text.secondary">
                    ツイートを選択すると、ここに詳細が表示されます。
                </Typography>
            </Box>
        );
    }

    // tweet.user_id が loginUser と等しい場合は AvatarContext を使用
    const isCurrentUser = tweet.user_id === loginUser;

    return (
        <Box sx={{ p: 2, width: '100%' }}>
            <Typography variant="h6">ツイート詳細</Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <Avatar 
                    src={tweet.user_profile_img} // 自分の画像を表示
                    sx={{ mr: 2, width: 48, height: 48 }} 
                />
                <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{isCurrentUser ? loginName : tweet.name}</Typography> {/* ログインユーザーの場合はloginNameを表示 */}
                    <Typography variant="body2" color="text.secondary">@{tweet.user_id}</Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.25rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{tweet.content}</Typography>
            {tweet.img_url && (
                <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                    <img src={tweet.img_url} alt="tweet image" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                </Box>
            )}
            <TweetTimestamp created_at={tweet.created_at} />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, gap: 4 }}>
                <Typography variant="body2"><strong>{tweet.reply_counts}</strong> リプライ</Typography>
                <Typography variant="body2"><strong>{tweet.likes}</strong> いいね</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <ReplyList />
        </Box>
    );
};

export default TweetDetail;
