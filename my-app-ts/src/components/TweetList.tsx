// import React, { useEffect, useState } from 'react';
// import { Container, CircularProgress } from '@mui/material';
// import Tweet from './Tweet';
// import axios from 'axios';
// import { useLoginUser } from '../contexts/LoginUserContext';  // カスタムフックをインポート

// interface TweetData {
//     user_id: string;
//     post_id: string;
//     content: string;
//     img_url: string;  // 投稿画像のURL（必要に応じて）
//     name: string;     // ユーザー名
//     user_profile_img: string;  // ユーザーのプロフィール画像
//     created_at: string;
//     edited_at: string;
//     deleted_at: string;
//     parent_post_id: string;
//     reply_counts: number;
// }



// const TweetList: React.FC= () => {
//     const { loginUser } = useLoginUser();  // グローバルなloginUserを取得
//     const [tweets, setTweets] = useState<TweetData[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     // ユーザーのプロフィール情報（名前と画像URL）を取得する関数
//     const fetchUserProfile = async (user_id: string) => {
//         try {
//             const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}`);
//             return {
//                 user_profile_img: response.data.img_url || '',  // プロフィール画像URLを取得
//                 name: response.data.name || 'Unknown User'      // 名前を取得
//             };
//         } catch (err) {
//             console.error(`Failed to fetch profile for user ${user_id}`, err);
//             return { user_profile_img: '', name: 'Unknown User' };  // 失敗時のデフォルト値
//         }
//     };

//     useEffect(() => {
//         const fetchTweets = async () => {
//             try {
//                 const response = await axios.get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/timeline/${loginUser}`);
//                 console.log(response);
//                 // APIから取得したデータを状態にセット
//                 const modifiedTweets = await Promise.all(response.data.map(async (tweet: any) => {
//                     const { user_profile_img, name } = await fetchUserProfile(tweet.user_id);  // ユーザーIDから画像URLと名前を取得
//                     return {
//                         ...tweet,
//                         user_profile_img,  // 取得したプロフィール画像URLをセット
//                         name,  // 取得した名前をセット
//                         edited_at: tweet.edited_at?.Time || '', // 編集日時
//                         deleted_at: tweet.deleted_at?.Time || '', // 削除日時
//                         parent_post_id: tweet.parent_post_id?.String || '' // 親ポストID
//                     };
//                 }));
//                 setTweets(modifiedTweets);
//                 setLoading(false);
//             } catch (error) {
//                 setError('データの取得に失敗しました');
//                 setLoading(false);
//             }
//         };

//         fetchTweets();
//     }, []);

//     // ローディング中の表示
//     if (loading) {
//         return (
//             <Container maxWidth="sm">
//                 <CircularProgress />
//             </Container>
//         );
//     }

//     // エラーメッセージの表示
//     if (error) {
//         return (
//             <Container maxWidth="sm">
//                 <p>{error}</p>
//             </Container>
//         );
//     }

//     return (
//         <Container maxWidth="sm">
//             {tweets.map((tweet, index) => (
//                 <Tweet key={index} {...tweet} />
//             ))}
//         </Container>
//     );
// };

// export default TweetList;
import React, { useEffect, useState } from 'react';
import { Container, CircularProgress } from '@mui/material';
import Tweet from './Tweet';
import axios from 'axios';
import { useLoginUser } from '../contexts/LoginUserContext';  // カスタムフックをインポート

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
    mode: 'timeline' | 'user';  // モードを指定（タイムラインか指定ユーザーか）
    user_id?: string;  // 指定ユーザーのID（モードが"user"のときのみ必要）
}

const TweetList: React.FC<TweetListProps> = ({ mode, user_id }) => {
    const { loginUser } = useLoginUser();  // ログインユーザーIDを取得
    const [tweets, setTweets] = useState<TweetData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ユーザーのプロフィール情報（名前と画像URL）を取得する関数
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
        const fetchTweets = async () => {
            try {
                // モードが "user" の場合は指定ユーザーの投稿を取得、"timeline" の場合はログインユーザーのタイムラインを取得
                const endpoint = mode === 'user' 
                    ? `https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${user_id}/posts` 
                    : `https://uttc-hackathon-backend-951630660755.us-central1.run.app/timeline/${loginUser}`;

                const response = await axios.get(endpoint);
                console.log(response);

                const modifiedTweets = await Promise.all(response.data.map(async (tweet: any) => {
                    const { user_profile_img, name } = await fetchUserProfile(tweet.user_id);  // ユーザーIDからプロフィール情報を取得
                    return {
                        ...tweet,
                        user_profile_img,
                        name,
                        edited_at: tweet.edited_at?.Time || '',
                        deleted_at: tweet.deleted_at?.Time || '',
                        parent_post_id: tweet.parent_post_id?.String || ''
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
    }, [mode, user_id, loginUser]);  // mode, user_id, loginUser が変わるたびに再フェッチ

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
        <Container maxWidth="sm">
            {tweets.map((tweet, index) => (
                <Tweet key={index} {...tweet} />
            ))}
        </Container>
    );
};

export default TweetList;
