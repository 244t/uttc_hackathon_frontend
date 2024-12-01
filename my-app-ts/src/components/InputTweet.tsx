// // // export default TweetInput;
// // import React, { useState } from 'react';
// // import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
// // import ImageIcon from '@mui/icons-material/Image';
// // import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// // import EmojiPicker from 'emoji-picker-react'; 
// // import { useAvatar } from '../contexts/AvatarContext'; // AvatarContextをインポート

// // interface TweetInputProps {
// //   onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
// //   isReplyMode ?:boolean;
// // }

// // const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode,onTweetSubmit }) => {
// //   const [tweetContent, setTweetContent] = useState('');
// //   const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
// //   const { avatarUrl } = useAvatar(); // AvatarContextからavatarUrlを取得


// //   // 絵文字が選択された時にテキストに追加する関数
// //   const handleEmojiSelect = (emoji: any) => {
// //     setTweetContent(tweetContent + emoji.emoji); // 絵文字をテキストに追加
// //     setEmojiPickerVisible(false); // 絵文字ピッカーを非表示にする
// //   };

// //   const toggleEmojiPicker = () => {
// //     setEmojiPickerVisible(!emojiPickerVisible); // 絵文字ピッカーの表示/非表示を切り替え
// //   };

// //   const handleTweetSubmit = () => {
// //     if (!tweetContent.trim()) return; // 内容が空なら送信しない

// //     onTweetSubmit(tweetContent, null); // 画像なしでツイート送信

// //     // ツイート送信後、状態のリセット
// //     setTweetContent('');
// //   };

// //   return (
// //     <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
// //       <Avatar src={avatarUrl || '/default-avatar.jpg'} />
// //       <Box sx={{ flexGrow: 1 }}>
// //         <TextField
// //           fullWidth
// //           multiline
// //           variant="standard"
// //           placeholder={isReplyMode ? "返信をツイート" : "いまどうしてる？"}
// //           value={tweetContent}
// //           onChange={(e) => setTweetContent(e.target.value)}
// //           InputProps={{
// //             disableUnderline: true,
// //           }}
// //           sx={{ mb: 2 }}
// //         />
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Box>
// //             <IconButton size="small" component="label">
// //               <ImageIcon />
// //               <input type="file" accept="image/*" hidden />
// //             </IconButton>
// //             <IconButton size="small" onClick={toggleEmojiPicker}>
// //               <EmojiEmotionsIcon />
// //             </IconButton>
// //           </Box>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             disabled={!tweetContent.trim()}
// //             onClick={handleTweetSubmit}
// //             sx={{ borderRadius: '9999px' }}
// //           >
// //             {isReplyMode ? '返信' : 'ツイートする'}
// //           </Button>
// //         </Box>

// //         {/* 絵文字ピッカーの表示 */}
// //         {emojiPickerVisible && (
// //           <Box sx={{ position: 'absolute', bottom: '10px' }}>
// //             <EmojiPicker 
// //                 onEmojiClick={handleEmojiSelect} />
// //           </Box>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default TweetInput;
// // export default TweetInput;
// import React, { useState } from 'react';
// import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import EmojiPicker from 'emoji-picker-react'; 
// import { storage } from '../firebase'; // Firebase storage import
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage methods
// import { useAvatar } from '../contexts/AvatarContext'; // AvatarContextをインポート

// interface TweetInputProps {
//   onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
//   isReplyMode ?:boolean;
// }

// const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode,onTweetSubmit }) => {
//   const [tweetContent, setTweetContent] = useState('');
//   const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null); // プレビュー用のステート
//   const [selectedImage, setSelectedImage] = useState<File | null>(null); // 選択された画像
//   const { avatarUrl } = useAvatar(); // AvatarContextからavatarUrlを取得
  

//   // 絵文字が選択された時にテキストに追加する関数
//   const handleEmojiSelect = (emoji: any) => {
//     setTweetContent(tweetContent + emoji.emoji); // 絵文字をテキストに追加
//     setEmojiPickerVisible(false); // 絵文字ピッカーを非表示にする
//   };

//   const toggleEmojiPicker = () => {
//     setEmojiPickerVisible(!emojiPickerVisible); // 絵文字ピッカーの表示/非表示を切り替え
//   };

//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string); // 画像プレビューを表示
//       };
//       reader.readAsDataURL(file); // プレビュー用にファイルを読み込む
//     }
//   };

//   // Upload image to Firebase Storage
//   const uploadImage = async (image: File, path: string) => {
//     if (!image) return null;
//     const imageRef = ref(storage, path);  // Create a reference for the image
//     await uploadBytes(imageRef, image);  // Upload image to Firebase
//     const imageUrl = await getDownloadURL(imageRef);  // Get the download URL
//     return imageUrl;
//   }

//   const handleTweetSubmit = () => {
//     if (!tweetContent.trim()) return; // 内容が空なら送信しない

//     if (selectedImage) {
//       // Firebase Storageに画像をアップロード
//       const imageUrl = uploadImage(selectedImage, `content_images/${encodeURIComponent(selectedImage)}`)
//     }

//     onTweetSubmit(tweetContent, null); // 画像なしでツイート送信

//     // ツイート送信後、状態のリセット
//     setTweetContent('');
//     setTweetContent('');
//     setSelectedImage(null);
//   };

//   return (
//     <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//       <Avatar src={avatarUrl || '/default-avatar.jpg'} />
//       <Box sx={{ flexGrow: 1 }}>
//         <TextField
//           fullWidth
//           multiline
//           variant="standard"
//           placeholder={isReplyMode ? "返信をツイート" : "いまどうしてる？"}
//           value={tweetContent}
//           onChange={(e) => setTweetContent(e.target.value)}
//           InputProps={{
//             disableUnderline: true,
//           }}
//           sx={{ mb: 2 }}
//         />
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box>
//           <IconButton size="small" component="label">
//               <ImageIcon />
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 hidden 
//                 onChange={handleImageSelect} 
//               />
//             </IconButton>
//             <IconButton size="small" onClick={toggleEmojiPicker}>
//               <EmojiEmotionsIcon />
//             </IconButton>
//           </Box>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!tweetContent.trim()}
//             onClick={handleTweetSubmit}
//             sx={{ borderRadius: '9999px' }}
//           >
//             {isReplyMode ? '返信' : 'ツイートする'}
//           </Button>
//         </Box>

//         {/* 絵文字ピッカーの表示 */}
//         {emojiPickerVisible && (
//           <Box sx={{ position: 'absolute', bottom: '10px' }}>
//             <EmojiPicker 
//                 onEmojiClick={handleEmojiSelect} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default TweetInput;
import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react'; 
import { storage } from '../firebase'; // Firebase storage import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage methods
import { useAvatar } from '../contexts/AvatarContext'; // AvatarContextをインポート

interface TweetInputProps {
  onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
  isReplyMode?: boolean;
}

const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode, onTweetSubmit }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // プレビュー用のステート
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 選択された画像
  const { avatarUrl } = useAvatar(); // AvatarContextからavatarUrlを取得
  
  // 絵文字が選択された時にテキストに追加する関数
  const handleEmojiSelect = (emoji: any) => {
    setTweetContent(tweetContent + emoji.emoji); // 絵文字をテキストに追加
    setEmojiPickerVisible(false); // 絵文字ピッカーを非表示にする
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible); // 絵文字ピッカーの表示/非表示を切り替え
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // 画像プレビューを表示
      };
      reader.readAsDataURL(file); // プレビュー用にファイルを読み込む
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (image: File, path: string) => {
    if (!image) return null;
    const imageRef = ref(storage, path);  // Create a reference for the image
    await uploadBytes(imageRef, image);  // Upload image to Firebase
    const imageUrl = await getDownloadURL(imageRef);  // Get the download URL
    return imageUrl;
  }

  const handleTweetSubmit = async () => {
    if (!tweetContent.trim()) return; // 内容が空なら送信しない

    let imageUrl: string | null = null;

    // 画像が選択されていれば、Firebase Storageにアップロード
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage, `content_images/${encodeURIComponent(selectedImage.name)}`);
    }

    // ツイート送信
    onTweetSubmit(tweetContent, imageUrl);

    // ツイート送信後、状態のリセット
    setTweetContent('');
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Avatar src={avatarUrl || '/default-avatar.jpg'} />
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          fullWidth
          multiline
          variant="standard"
          placeholder={isReplyMode ? "返信をツイート" : "いまどうしてる？"}
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
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                onChange={handleImageSelect} 
              />
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
            {isReplyMode ? '返信' : 'ツイートする'}
          </Button>
        </Box>

        {/* 画像プレビュー */}
        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        )}

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
