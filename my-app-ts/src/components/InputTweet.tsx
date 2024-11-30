// export default TweetInput;
import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react'; // emoji-picker-reactをインポート

interface TweetInputProps {
  onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ onTweetSubmit }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  // 絵文字が選択された時にテキストに追加する関数
  const handleEmojiSelect = (emoji: any) => {
    setTweetContent(tweetContent + emoji.emoji); // 絵文字をテキストに追加
    setEmojiPickerVisible(false); // 絵文字ピッカーを非表示にする
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible); // 絵文字ピッカーの表示/非表示を切り替え
  };

  const handleTweetSubmit = () => {
    if (!tweetContent.trim()) return; // 内容が空なら送信しない

    onTweetSubmit(tweetContent, null); // 画像なしでツイート送信

    // ツイート送信後、状態のリセット
    setTweetContent('');
  };

  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Avatar src="/path-to-user-avatar.jpg" />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder="いまどうしてる？"
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton size="small" component="label">
              <ImageIcon />
              <input type="file" accept="image/*" hidden />
            </IconButton>
            <IconButton size="small" onClick={toggleEmojiPicker}>
              <EmojiEmotionsIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!tweetContent.trim()}
            onClick={handleTweetSubmit}
            sx={{ borderRadius: '9999px' }}
          >
            ツイートする
          </Button>
        </Box>

        {/* 絵文字ピッカーの表示 */}
        {emojiPickerVisible && (
          <Box sx={{ position: 'absolute', bottom: '10px' }}>
            <EmojiPicker 
                onEmojiClick={handleEmojiSelect} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TweetInput;
