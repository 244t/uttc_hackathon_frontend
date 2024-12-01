import React, { useState, useEffect } from 'react'; 
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Link, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Favorite, Reply, MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TweetInput from './InputTweet'; // TweetInputをインポート
import { useLoginUser } from '../contexts/LoginUserContext'; // ログインユーザーを取得するカスタムフック
import { useTweet } from '../contexts/TweetContext'; // TweetContextのインポート
import { Data } from 'emoji-mart';

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
    parentTweet?: {
        user_id: string;
        post_id: string;
        content: string;
        img_url: string;
        name: string;
        user_profile_img: string;
        created_at: string;
        edited_at: string;
        deleted_at: string;
        reply_counts: number;
    };  // 親ツイートの情報（省略可能）
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
    reply_counts,
}) => {
    const [liked, setLiked] = useState(false);
    const { loginUser } = useLoginUser();
    const [likeCount, setLikeCount] = useState(0);
    const [openReplyDialog, setOpenReplyDialog] = useState(false); // 返信ダイアログの表示状態
    const [replyContent, setReplyContent] = useState(''); // 返信内容
    // const [parentTweet, setParentTweet] = useState<{ content: string, name: string, user_profile_img: string } | null>(null); // 親ツイートの情報
    const navigate = useNavigate();
    const { tweet, setTweet } = useTweet(); // tweet情報とsetTweet関数を取得
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        
        const timeDifference = now.getTime() - date.getTime();
        const oneMinute = 60 * 1000; // 1分をミリ秒に換算
        const oneHour = 60 * oneMinute; // 1時間をミリ秒に換算
        const oneDay = 24 * oneHour; // 1日をミリ秒に換算
    
        if (timeDifference < oneMinute) {
            // 1分以内の場合は「何秒前」
            const secondsAgo = Math.floor(timeDifference / 1000);
            return `${secondsAgo}秒前`;
        } else if (timeDifference < oneHour) {
            // 1時間以内の場合は「何分前」
            const minutesAgo = Math.floor(timeDifference / oneMinute);
            return `${minutesAgo}分前`;
        } else if (timeDifference < oneDay) {
            // 1時間以上24時間以内の場合は「何時間前」
            const hoursAgo = Math.floor(timeDifference / oneHour);
            return `${hoursAgo}時間前`;
        } else {
            // 24時間以上前の場合は「年月日」
            return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    };
    
    

    // 親ツイートの情報を取得する処理（もし親ツイートがある場合）
    useEffect(() => {
        if (parent_post_id) {
            const fetchParentTweet = async () => {
                try {
                    const response = await axios.get(
                        `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${parent_post_id}`
                    );
                    const parentTweetData = response.data;
                    
                } catch (error) {
                    console.error('Error fetching parent tweet', error);
                }
            };

            fetchParentTweet();
        }
    }, [parent_post_id]);

    // コンポーネントがマウントされた時にいいねの数を取得
    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await axios.get(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${post_id}/likes`
                );
                if (response.status === 200) {
                    setLikeCount(response.data.like_count); // バックエンドから取得したいいねの数を状態にセット
                    if (response.data.user_ids && response.data.user_ids.includes(loginUser)) {
                        setLiked(true); // Set liked to true if the user has already liked the post
                    } else {
                        setLiked(false); // Set liked to false otherwise
                    }
                }
            } catch (error) {
                console.error('Error fetching like count', error);
            }
        };

        fetchLikeCount();
    }, [post_id]);

    // いいね機能
    const handleLike = async () => {
        try {
            if (!liked) {
                const response = await axios.post(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${post_id}/like`,
                    { user_id: loginUser, post_id: post_id },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                const response = await axios.post(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${post_id}/unlike`,
                    { user_id: loginUser, post_id: post_id },
                    { headers: { 'Content-Type': 'application/json' } }
                );
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (error) {
            console.error('Error toggling like status', error);
        }
    };

    // ユーザー詳細ページに遷移
    const handleUserClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Card全体のクリックイベントを防止
        navigate(`/user/${user_id}`);
    };

    const handleTweetClick = () => {
        setTweet({
            user_id: user_id,
            post_id: post_id,
            content: content,
            img_url,
            name,
            user_profile_img,
            created_at,
            edited_at,
            deleted_at,
            parent_post_id,
            reply_counts,
            likes : likeCount,
        })
    };

    // 返信ダイアログの開閉処理
    const handleOpenReplyDialog = () => setOpenReplyDialog(true);
    const handleCloseReplyDialog = () => setOpenReplyDialog(false);

    // 返信送信処理
    const handleReplySubmit = async (tweetContent: string, imageUrl: string|null) => {
        try {
            const tweetData = {
              user_id: loginUser, // ログインユーザーのIDを指定
              content: tweetContent.trim(),
              img_url: imageUrl || "", // 画像URLがあれば送信、なければ空文字
            };
      
            // バックエンドへ送信
            const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${post_id}/reply`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(tweetData),
            });
      
            if (response.ok) {
              console.log('Tweet successfully submitted');
              handleCloseReplyDialog();
            } else {
              console.error('Error submitting tweet:', response.statusText);
            }
          } catch (error) {
            console.error('Error submitting tweet:', error);
          }
    };

    return (
        <>
            {/* <Card sx={{ maxWidth: '100%', mb: 2 }} elevation={2}> */}
            <Card sx={{ width: '100%'}} elevation={2}>
                <CardHeader
                    avatar={
                        <Avatar src={user_profile_img} aria-label="user avatar">
                            {name[0]}
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
                <CardContent onClick={handleTweetClick}> {/* クリック時に詳細ページに遷移 */}
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
                        sx={{ color: liked ? 'red' : 'gray' }}
                    >
                        <Favorite />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {likeCount}
                    </Typography>
                    <IconButton aria-label="reply" onClick={handleOpenReplyDialog}>
                        <Reply />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {reply_counts}
                    </Typography>
                </CardActions>
            </Card>

            {/* 返信ダイアログ */}
            <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
                <DialogTitle>返信</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src={user_profile_img} />
                        <Box>
                            <Typography variant="body2" color="text.primary">
                                @{name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {content}
                            </Typography>
                        </Box>
                    </Box>
                    <TweetInput onTweetSubmit={handleReplySubmit} isReplyMode={true} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReplyDialog}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Tweet;
