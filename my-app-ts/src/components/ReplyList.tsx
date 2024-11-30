import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, CircularProgress, Divider } from '@mui/material';
import { useTweet } from '../contexts/TweetContext';
import { TweetTimestamp } from './TweetDetail'; 
import axios from 'axios';
import Tweet from './Tweet';  // Import the Tweet component

interface Reply {
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

const ReplyList: React.FC = () => {
  const { tweet } = useTweet();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async (user_id: string) => {
    try {
        const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`);
        return {
            user_profile_img: response.data.img_url || '',
            name: response.data.name || 'Unknown User'
        };
    } catch (err) {
        console.error(`Failed to fetch profile for user ${user_id}`, err);
        return { user_profile_img: '', name: 'Unknown User' };
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      if (tweet && tweet.post_id) {
        setLoading(true);
        try {
          const response = await fetch(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/post/${tweet.post_id}/reply`);
          if (!response.ok) {
            throw new Error('Failed to fetch replies');
          }
          const data = await response.json();
          if (data) {
            const modifiedTweets = await Promise.all(data.map(async (tweet: any) => {
              const { user_profile_img, name } = await fetchUserProfile(tweet.user_id);
              return {
                  ...tweet,
                  user_profile_img,
                  name,
                  edited_at: tweet.edited_at?.Time || '',
                  deleted_at: tweet.deleted_at?.Time || '',
                  parent_post_id: tweet.parent_post_id?.String || ''
              };
            }));
            modifiedTweets.sort((a, b) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              return dateB.getTime() - dateA.getTime();
            });
            setReplies(modifiedTweets);
          } else {
            setReplies(data);
          }
        } catch (error) {
          console.error('Error fetching replies:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReplies();
  }, [tweet]);

  if (!tweet) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>返信</Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : replies ? (
        replies.map((reply) => (
          <Box key={reply.post_id} sx={{ mb: 3 }}>
            {/* Render the Tweet component to show the main tweet */}
            <Tweet 
              user_id={reply.user_id} 
              post_id={reply.post_id} 
              content={reply.content} 
              img_url={reply.img_url || ''} 
              name={reply.name} 
              user_profile_img={reply.user_profile_img} 
              created_at={reply.created_at} 
              edited_at={reply.edited_at} 
              deleted_at={reply.deleted_at} 
              parent_post_id={reply.parent_post_id} 
              reply_counts={reply.reply_counts || 0} 
            />
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', my: 4 }}>
          まだ返信がありません。
        </Typography>
      )}
    </Box>
  );
};

export default ReplyList;
