import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailPage: React.FC = () => {
    const { post_id } = useParams();  // URLのパラメータからpost_idを取得

    return (
        <div>
            <h1>詳細ページ</h1>
            {/* 詳細ページの内容を表示 */}
            <p>投稿</p>
            {/* 他の詳細情報も表示可能 */}
        </div>
    );
};

export default PostDetailPage;
