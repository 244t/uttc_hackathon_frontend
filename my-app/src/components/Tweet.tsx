import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography,Box } from '@mui/material';
import { Favorite, Reply, MoreVert } from '@mui/icons-material';

interface TweetProps {
    user_id: string;
    post_id: string;
    content: string;
    img_url: string;  // 投稿画像
    name: string;  // ユーザー名
    user_profile_img: string;  // ユーザーのプロフィール画像
    created_at: string;
    edited_at: string;
    deleted_at: string;
    parent_post_id: string;
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
    parent_post_id
}) => {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                title={name} 
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
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="reply">
                    <Reply />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Tweet;
