// import React from 'react';
// import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography,Box } from '@mui/material';
// import { Favorite, Reply, MoreVert } from '@mui/icons-material';

// interface TweetProps {
//     user_id: string;
//     post_id: string;
//     content: string;
//     img_url: string;  // 投稿画像
//     name: string;  // ユーザー名
//     user_profile_img: string;  // ユーザーのプロフィール画像
//     created_at: string;
//     edited_at: string;
//     deleted_at: string;
//     parent_post_id: string;
// }

// const Tweet: React.FC<TweetProps> = ({
//     user_id,
//     post_id,
//     content,
//     img_url,
//     name,
//     user_profile_img,
//     created_at,
//     edited_at,
//     deleted_at,
//     parent_post_id
// }) => {
//     const formatTime = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     };
    
//     return (
//         <Card sx={{ maxWidth: 345, mb: 2 }} elevation={10}>
//             <CardHeader
//                 avatar={
//                     <Avatar src={user_profile_img} aria-label="user avatar">
//                         {name[0]}  {/* ユーザー名の最初の文字を表示（画像がない場合） */}
//                     </Avatar>
//                 }
//                 action={
//                     <IconButton aria-label="settings">
//                         <MoreVert />
//                     </IconButton>
//                 }
//                 title={name} 
//                 subheader={formatTime(created_at)} 
//             />
//             <CardContent>
//             <Typography variant="body2" color="text.primary">
//                     {content}  
//                 </Typography>
//                 {img_url && (
//                     <Box sx={{ mt: 2 }}>
//                         <img src={img_url} alt="content image" style={{ width: '100%', borderRadius: '8px' }} />
//                     </Box>
//                 )}
//             </CardContent>
//             <CardActions disableSpacing>
//                 <IconButton aria-label="add to favorites">
//                     <Favorite />
//                 </IconButton>
//                 <IconButton aria-label="reply">
//                     <Reply />
//                 </IconButton>
//             </CardActions>
//         </Card>
//     );
// };

// export default Tweet;
import React, { useState,useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Link } from '@mui/material';
import { Favorite, Reply, MoreVert } from '@mui/icons-material';
import axios from 'axios';  // axiosをインポート
import { useNavigate } from 'react-router-dom'; // react-router-domをインポート


interface TweetProps {
    user_id: string;
    post_id: string;
    content: string;
    img_url: string;
    name: string;
    user_profile_img: string;
    created_at: string;
    edited_at: string;
    deleted_at: string;
    parent_post_id: string;
    reply_counts: number;
}

const Tweet: React.FC<TweetProps> = ({
    user_id,
    post_id,
    content,
    img_url,
    name,
    user_profile_img,
    created_at,
    edited_at,
    deleted_at,
    parent_post_id,
    reply_counts
}) => {
    const [liked, setLiked] = useState(false);  // いいねの状態
    const [likeCount, setLikeCount] = useState(0);  // いいねのカウント
    const navigate = useNavigate(); 

    // 時間をフォーマットする関数
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // コンポーネントの初期化時に、バックエンドからいいね数を取得
    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await axios.get(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${post_id}/likes`
                );
                
                const userIds = response.data.user_ids || [];  // likes の user_ids を取得
                setLikeCount(response.data.like_count);  // いいね数を状態に設定
                 // user_ids に '001' が含まれているかをチェック
                 if (userIds.includes("001")) {
                    setLiked(true);  // いいねが押されている状態にする
                }
            } catch (error) {
                console.error('Error fetching like count', error);
            }
        };

        fetchLikeCount();
    }, []);  // 初回レンダリング時に実行

    const handleLike = async () => {
        try {
            // いいねが押されていない状態 (unliked) の場合
            if (!liked) {
                const response = await axios.post(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/01JDA08CJZRK6CZ73Z27ZSFVNS/like`, 
                    {
                        user_id: "001",
                        post_id: post_id
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'  // JSONとして送信するためのヘッダー
                        }
                    }
                );
    
        
                setLiked(true);
                setLikeCount(likeCount+1)
            } else {
                // いいねが押されている状態 (liked) の場合
                const response = await axios.post(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/01JDA08CJZRK6CZ73Z27ZSFVNS/unlike`, 
                    {
                        user_id: "001",
                        post_id: post_id
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'  // JSONとして送信するためのヘッダー
                        }
                    }
                );
    
                setLiked(false);  // 状態をunlikedに変更
                setLikeCount(likeCount - 1);  // いいね数を減少
            }
        } catch (error) {
            console.error('Error toggling like status', error);
        }
    };
    // ユーザー詳細ページに遷移
    const handleUserClick = () => {
        navigate(`/user`);  // ユーザーIDに基づいて詳細ページに遷移
    };

    return (
        <Card sx={{ maxWidth: 345, mb: 2 }} elevation={10}>
            <CardHeader
                avatar={
                    <Avatar src={user_profile_img} aria-label="user avatar">
                        {name[0]}  {/* ユーザー名の最初の文字を表示（画像がない場合） */}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }
                title={<Link 
                    component="button" 
                    variant="body2" 
                    onClick={handleUserClick} 
                    sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
                >
                    {name}
                </Link>} 
                subheader={formatTime(created_at)} 
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {content}  
                </Typography>
                {img_url && (
                    <Box sx={{ mt: 2 }}>
                        <img src={img_url} alt="content image" style={{ width: '100%', borderRadius: '8px' }} />
                    </Box>
                )}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton 
                    aria-label="add to favorites" 
                    onClick={handleLike} 
                    sx={{ color: liked ? 'red' : 'gray' }}  // いいねされたら赤色、未設定ならグレー
                >
                    <Favorite />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    {likeCount}  {/* いいねの数を表示 */}
                </Typography>
                <IconButton aria-label="reply">
                    <Reply />
                </IconButton>
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {reply_counts}  {/* reply_countsの表示 */}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default Tweet;
