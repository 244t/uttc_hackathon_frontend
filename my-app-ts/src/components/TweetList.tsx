import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import Tweet from './Tweet';
import axios from 'axios';

interface TweetData {
    user_id: string;
    post_id: string;
    content: string;
    img_url: string;  // 投稿画像のURL（必要に応じて）
    name: string;     // ユーザー名
    user_profile_img: string;  // ユーザーのプロフィール画像
    created_at: string;
    edited_at: string;
    deleted_at: string;
    parent_post_id: string;
}

const TweetList: React.FC = () => {
    const [tweets, setTweets] = useState<TweetData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ユーザーのプロフィール情報（名前と画像URL）を取得する関数
    const fetchUserProfile = async (user_id: string) => {
        try {
            const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`);
            return {
                user_profile_img: response.data.img_url || '',  // プロフィール画像URLを取得
                name: response.data.name || 'Unknown User'      // 名前を取得
            };
        } catch (err) {
            console.error(`Failed to fetch profile for user ${user_id}`, err);
            return { user_profile_img: '', name: 'Unknown User' };  // 失敗時のデフォルト値
        }
    };

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await axios.get('https://uttc-hackathon-backend-951630660755.us-central1.run.app/timeline/001');
                console.log(response);
                // APIから取得したデータを状態にセット
                const modifiedTweets = await Promise.all(response.data.map(async (tweet: any) => {
                    const { user_profile_img, name } = await fetchUserProfile(tweet.user_id);  // ユーザーIDから画像URLと名前を取得
                    return {
                        ...tweet,
                        user_profile_img,  // 取得したプロフィール画像URLをセット
                        name,  // 取得した名前をセット
                        edited_at: tweet.edited_at?.Time || '', // 編集日時
                        deleted_at: tweet.deleted_at?.Time || '', // 削除日時
                        parent_post_id: tweet.parent_post_id?.String || '' // 親ポストID
                    };
                }));
                setTweets(modifiedTweets);
                setLoading(false);
            } catch (error) {
                setError('データの取得に失敗しました');
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    // ローディング中の表示
    if (loading) {
        return (
            <Container maxWidth="sm">
                <CircularProgress />
            </Container>
        );
    }

    // エラーメッセージの表示
    if (error) {
        return (
            <Container maxWidth="sm">
                <p>{error}</p>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            {tweets.map((tweet, index) => (
                <Tweet key={index} {...tweet} />
            ))}
        </Container>
    );
};

export default TweetList;
