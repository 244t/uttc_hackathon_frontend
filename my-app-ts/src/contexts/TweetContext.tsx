// TweetContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TweetContextProps {
    tweet: {
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
        likes : number;
    } | null;
    setTweet: (tweet: any) => void;
}

const TweetContext = createContext<TweetContextProps | undefined>(undefined);

export const useTweet = () => {
    const context = useContext(TweetContext);
    if (!context) {
        throw new Error('useTweet must be used within a TweetProvider');
    }
    return context;
};

export const TweetProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [tweet, setTweet] = useState<TweetContextProps['tweet']>(null);

    return (
        <TweetContext.Provider value={{ tweet, setTweet }}>
            {children}
        </TweetContext.Provider>
    );
};
