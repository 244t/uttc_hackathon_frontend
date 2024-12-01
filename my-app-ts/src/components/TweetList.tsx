import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box } from '@mui/material';
import Tweet from './Tweet';
import axios from 'axios';
import { useLoginUser } from '../contexts/LoginUserContext';  // ログインユーザーIDを取得
import { useAvatar } from '../contexts/AvatarContext';  // AvatarContextをインポート

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

interface TweetListProps {
    mode: 'timeline' | 'user';  // モードを追加（タイムライン、ユーザー）
    user_id?: string;  // 指定ユーザーのID（モードが"user"のときのみ必要）
}

const TweetList: React.FC<TweetListProps> = ({ mode, user_id }) => {
    const { loginUser } = useLoginUser();  // ログインユーザーIDを取得
    const [tweets, setTweets] = useState<TweetData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { avatarUrl, loginName } = useAvatar(); // AvatarContextからavatarUrlとloginNameを取得

    // ユーザーのプロフィール情報（名前と画像URL）を取得する関数
    const fetchUserProfile = async (user_id: string) => {
        try {
            // ログインユーザーの場合、グローバルコンテキストから情報を取得
            if (user_id === loginUser) {
                return {
                    user_profile_img: avatarUrl,
                    name: loginName,
                };
            } else {
                const response = await axios.get(
                    `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`
                );
                return {
                    user_profile_img: response.data.img_url || '',
                    name: response.data.name || 'Unknown User',
                };
            }
        } catch (err) {
            console.error(`Failed to fetch profile for user ${user_id}`, err);
            return { user_profile_img: '', name: 'Unknown User' };
        }
    };

    // ツイート（またはリプライ）を取得する関数
    const fetchTweets = async () => {
        try {
            let endpoint = '';
            if (mode === 'user') {
                endpoint = `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}/posts`;
            } else if (mode === 'timeline') {
                endpoint = `https://uttc-hackathon-backend-951630660755.us-central1.run.app/timeline/${loginUser}`;
            }

            const response = await axios.get(endpoint);
            console.log(response);

            const modifiedTweets = await Promise.all(
                response.data.map(async (tweet: any) => {
                    const { user_profile_img, name } = await fetchUserProfile(tweet.user_id); // ユーザーIDからプロフィール情報を取得
                    return {
                        ...tweet,
                        user_profile_img,
                        name,
                        edited_at: tweet.edited_at?.Time || '',
                        deleted_at: tweet.deleted_at?.Time || '',
                        parent_post_id: tweet.parent_post_id?.String || '',
                    };
                })
            );

            // ツイートを created_at を基に新しい順にソート
            modifiedTweets.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB.getTime() - dateA.getTime(); // 新しいツイートが上に来るようにする
            });

            setTweets(modifiedTweets);
            setLoading(false);
        } catch (error) {
            setError('表示するものがありません');
            setLoading(false);
        }
    };

    // 依存関係にavatarUrlを追加して、avatarUrlが変更される度に再フェッチを実行
    useEffect(() => {
        if (loginUser) {
            fetchTweets();
        }
    }, [mode, user_id, loginUser, avatarUrl,loginName]);  // avatarUrlが変わったときにも再フェッチを実行

    // ローディング中
    if (loading) {
        return (
            <Container maxWidth="sm">
                <CircularProgress />
            </Container>
        );
    }

    // エラーメッセージ
    if (error) {
        return (
            <Container maxWidth="sm">
                <p>{error}</p>
            </Container>
        );
    }

    return (
        <Box>
            {tweets.map((tweet, index) => (
                <Box key={index} sx={{ mb: '3', py: 0.5, px: "24px" }}>
                    <Tweet {...tweet} />
                </Box>
            ))}
        </Box>
    );
};

export default TweetList;