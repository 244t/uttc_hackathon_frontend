import React, { useState, useEffect } from 'react'; 
import { Card, CardHeader, CardContent, CardActions, Avatar,IconButton, Typography, Box, Link, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Favorite, Reply, MoreVert,SubdirectoryArrowRight } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TweetInput from './InputTweet'; // TweetInputをインポート
import { useLoginUser } from '../contexts/LoginUserContext'; // ログインユーザーを取得するカスタムフック
import { useTweet } from '../contexts/TweetContext'; // TweetContextのインポート

interface TweetData {
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

interface TweetProps {
    childTweet: TweetData,
    parentTweet: TweetData
}

const TweetWithReply: React.FC<TweetProps> = ({ childTweet, parentTweet }) => {
    const [childLiked, setChildLiked] = useState(false);
    const [parentLiked, setParentLiked] = useState(false);
    const { loginUser } = useLoginUser();
    const [likeChildCount, setChildLikeCount] = useState(0);
    const [likeParentCount, setParentLikeCount] = useState(0);
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    const [currentPostId, setCurrentPostId] = useState<string>(''); // 返信対象の親ツイートの post_id を保持
    const navigate = useNavigate();
    const { setTweet } = useTweet(); 

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const timeDifference = now.getTime() - date.getTime();
        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;
    
        if (timeDifference < oneMinute) {
            return `${Math.floor(timeDifference / 1000)}秒前`;
        } else if (timeDifference < oneHour) {
            return `${Math.floor(timeDifference / oneMinute)}分前`;
        } else if (timeDifference < oneDay) {
            return `${Math.floor(timeDifference / oneHour)}時間前`;
        } else {
            return date.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    };

    // 子と親のいいね数を取得する共通関数
    const fetchLikeCount = async (postId: string, setLikeCount: React.Dispatch<React.SetStateAction<number>>, setLiked: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${postId}/likes`);
            if (response.status === 200) {
                setLikeCount(response.data.like_count);
                if (response.data.user_ids && response.data.user_ids.includes(loginUser)) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            }
        } catch (error) {
            console.error('Error fetching like count', error);
        }
    };

    useEffect(() => {
        fetchLikeCount(childTweet.post_id, setChildLikeCount, setChildLiked);
        fetchLikeCount(parentTweet.post_id, setParentLikeCount, setParentLiked);
    }, [childTweet.post_id, parentTweet.post_id, loginUser]);

    const handleLike = async (postId: string, liked: boolean, setLiked: React.Dispatch<React.SetStateAction<boolean>>, likeCount: number, setLikeCount: React.Dispatch<React.SetStateAction<number>>) => {
        try {
            const url = liked
                ? `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${postId}/unlike`
                : `https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${postId}/like`;
            const response = await axios.post(url, { user_id: loginUser, post_id: postId }, { headers: { 'Content-Type': 'application/json' } });
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1); // likeCount を引数として受け取っている
        } catch (error) {
            console.error('Error toggling like status', error);
        }
    };
    

    const handleTweetClick = (tweet: TweetData) => {
        setTweet(tweet);
    };

    // 返信ダイアログを開く処理
    const handleOpenReplyDialog = (postId: string) => {
        setOpenReplyDialog(true);
        setCurrentPostId(postId); // 現在の親ツイートの post_id を状態に保存
    };

    const handleCloseReplyDialog = () => setOpenReplyDialog(false);

    // 返信の投稿処理
    const handleReplySubmit = async (tweetContent: string, imageUrl: string | null) => {
        try {
            const tweetData = {
                user_id: loginUser, // ログインユーザーのIDを指定
                content: tweetContent.trim(),
                img_url: imageUrl || "", // 画像URLがあれば送信、なければ空文字
            };

            // 現在の post_id を使用して、親ツイートに対する返信として送信
            const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${currentPostId}/reply`, {
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
             {/* 子ツイート */}
             <Card
                sx={{
                    width: '100%',
                    transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // 色と影の変化にかかる時間
                    '&:hover': {
                        backgroundColor: '#3A4045', // ホバー時に背景色を少し変える
                        boxShadow: 'none', // 影をなくして浮き上がり感を消す
                    },
                }}
                elevation={2}
            >
                <CardHeader
                    avatar={<Avatar src={childTweet.user_profile_img}>{childTweet.name[0]}</Avatar>}
                    action={<IconButton aria-label="settings"><MoreVert /></IconButton>}
                    title={<Link component="button" variant="body2" onClick={() => navigate(`/user/${childTweet.user_id}`)}>{childTweet.name}</Link>}
                    subheader={formatTime(childTweet.created_at)}
                />
                <IconButton size="small" onClick={() => handleTweetClick(parentTweet)}>
                    <SubdirectoryArrowRight fontSize="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>返信先ツイートを見る</Typography>
                </IconButton>
                <CardContent onClick={() => handleTweetClick(childTweet)}>
                    <Typography variant="body2" color="text.primary">{childTweet.content}</Typography>
                    {childTweet.img_url && <Box sx={{ mt: 2 }}><img src={childTweet.img_url} alt="content image" style={{ width: '100%', borderRadius: '8px' }} /></Box>}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={() => handleLike(childTweet.post_id, childLiked, setChildLiked, likeChildCount, setChildLikeCount)} sx={{ color: childLiked ? 'red' : 'gray' }}><Favorite /></IconButton>
                    <Typography variant="body2" color="text.secondary">{likeChildCount}</Typography>
                    <IconButton aria-label="reply" onClick={()=>handleOpenReplyDialog(childTweet.post_id)}><Reply /></IconButton>
                    <Typography variant="body2" color="text.secondary">{childTweet.reply_counts}</Typography>
                </CardActions>
            </Card>

            {/* Reply Dialog */}
            <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
                <DialogTitle>返信</DialogTitle>
                <DialogContent>
                    <TweetInput onTweetSubmit={(content, imgUrl) => handleReplySubmit(content, imgUrl)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReplyDialog}>キャンセル</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TweetWithReply;
