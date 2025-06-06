// // import React, { useState, useEffect } from 'react';
// // import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
// // import ImageIcon from '@mui/icons-material/Image';
// // import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// // import MicIcon from '@mui/icons-material/Mic';
// // import MicOffIcon from '@mui/icons-material/MicOff';
// // import AssistantIcon from '@mui/icons-material/Assistant'; // AIアイコンのインポート
// // import EmojiPicker from 'emoji-picker-react'; 
// // import { storage } from '../firebase';
// // import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// // import { useAvatar } from '../contexts/AvatarContext';
// // import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; 
// // import axios from 'axios';

// // interface TweetInputProps {
// //   onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
// //   isReplyMode?: boolean;
// // }

// // const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode, onTweetSubmit }) => {
// //   const [tweetContent, setTweetContent] = useState('');
// //   const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
// //   const [imagePreview, setImagePreview] = useState<string | null>(null);
// //   const [selectedImage, setSelectedImage] = useState<File | null>(null);
// //   const [suggestedText, setSuggestedText] = useState<string>('');
// //   const [geminiMode, setGeminiMode] = useState<boolean>(false); // Geminiモードの状態を管理
// //   const [buttonActive, setButtonActive] = useState<boolean>(false); // ボタンのアクティブ状態を管理
// //   const { avatarUrl } = useAvatar();
  
// //   const { transcript, resetTranscript, listening } = useSpeechRecognition();

// //   // 音声認識の開始
// //   const startListening = () => {
// //     resetTranscript();
// //     SpeechRecognition.startListening({ continuous: true, language: 'ja-JP' });
// //   };

// //   // 音声認識の停止
// //   const stopListening = () => {
// //     SpeechRecognition.stopListening();
// //     setTweetContent(transcript);
// //     resetTranscript();
// //   };

// //   // Google Cloud Vertex AI APIを使って続きを提案する
// //   const getSuggestedText = async (inputText: string) => {
// //     if (!inputText.trim()) return;
    
// //     const tweetRequestText = `${inputText} ツイートを作成中です。これに続く1文を考えて魅力的なツイートを考えてください。1パターンのみ返してください。必ず${inputText}の続きから返して下さい。`;

// //     try {
// //       const response = await axios.post('https://uttc-hackathon-backend-951630660755.us-central1.run.app/generate-text', { text: tweetRequestText });
// //       setSuggestedText(response.data);
// //       console.log(response.data)
// //     } catch (error) {
// //       console.error("Error fetching suggested text:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     // geminiModeがオンの場合のみAPIリクエストを送る
// //     if (geminiMode && tweetContent.trim()) {
// //       const timer = setTimeout(() => {
// //         getSuggestedText(tweetContent);
// //       }, 500); // 500ms遅延でAPI呼び出し
// //       return () => clearTimeout(timer);
// //     }
// //   }, [tweetContent, geminiMode]); // geminiModeが変更された時にもリクエストを確認

// //   const handleEmojiSelect = (emoji: any) => {
// //     setTweetContent(tweetContent + emoji.emoji);
// //     setEmojiPickerVisible(false);
// //   };

// //   const toggleEmojiPicker = () => {
// //     setEmojiPickerVisible(!emojiPickerVisible);
// //   };

// //   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files ? event.target.files[0] : null;
// //     if (file) {
// //       setSelectedImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result as string);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const uploadImage = async (image: File, path: string) => {
// //     if (!image) return null;
// //     const imageRef = ref(storage, path);
// //     await uploadBytes(imageRef, image);
// //     const imageUrl = await getDownloadURL(imageRef);
// //     return imageUrl;
// //   };

// //   const handleTweetSubmit = async () => {
// //     if (!tweetContent.trim()) return;

// //     let imageUrl: string | null = null;

// //     if (selectedImage) {
// //       imageUrl = await uploadImage(selectedImage, `content_images/${encodeURIComponent(selectedImage.name)}`);
// //     }
// //     console.log("img_url",imageUrl)

// //     onTweetSubmit(tweetContent, imageUrl);

// //     setTweetContent('');
// //     setSelectedImage(null);
// //     setImagePreview(null);
// //   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setTweetContent(e.target.value);
// //   };

// //   const handleTabPress = (event: React.KeyboardEvent) => {
// //     if (event.key === 'Tab' && suggestedText && geminiMode) { // Geminiモードが有効な場合のみ置換
// //       // 提案されたテキストで現在のtweetContentを置換
// //       setTweetContent(suggestedText);
// //       event.preventDefault(); // タブキーによるフォーカス移動を防止
// //     }
// //   };

// //   // Geminiモードのトグル処理
// //   const toggleGeminiMode = () => {
// //     setGeminiMode(!geminiMode);
// //   };

// //   const handleButtonClick = () => {
// //     setButtonActive(true);
// //     setTimeout(() => setButtonActive(false), 200); // クリック後200msでリセット
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
// //           onChange={handleChange}
// //           onKeyDown={handleTabPress}  // タブキーを処理
// //           InputProps={{
// //             disableUnderline: true,
// //           }}
// //           sx={{ mb: 2 }}
// //         />
// //         {suggestedText && geminiMode && (
// //           <Box sx={{ mt: 2, color: 'grey', fontStyle: 'italic' }}>
// //             <strong>おすすめ:</strong> ({suggestedText})
// //           </Box>
// //         )}
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //           <Box>
// //             <IconButton size="small" component="label">
// //               <ImageIcon />
// //               <input 
// //                 type="file" 
// //                 accept="image/*" 
// //                 hidden 
// //                 onChange={handleImageSelect} 
// //               />
// //             </IconButton>
// //             <IconButton size="small" onClick={toggleEmojiPicker}>
// //               <EmojiEmotionsIcon />
// //             </IconButton>
// //             <IconButton size="small" onClick={listening ? stopListening : startListening}>
// //               {listening ? <MicOffIcon /> : <MicIcon />}
// //             </IconButton>
// //             <IconButton 
// //               size="small" 
// //               onClick={toggleGeminiMode} 
// //               sx={{ color: buttonActive ? 'yellow' : 'inherit' }} // ボタン押下時のアイコン色を変更
// //             >
// //               <AssistantIcon />
// //             </IconButton>
// //           </Box>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             disabled={!tweetContent.trim()}
// //             onClick={handleTweetSubmit}
// //             sx={{
// //               borderRadius: '9999px',
// //               backgroundColor: buttonActive ? 'darkblue' : 'primary.main', // ボタンの色を変える
// //               boxShadow: buttonActive ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none', // クリック時に影をつける
// //               '&:hover': {
// //                 backgroundColor: buttonActive ? 'darkblue' : 'primary.dark',
// //               },
// //             }}
// //           >
// //             {isReplyMode ? '返信' : 'ツイートする'}
// //           </Button>
// //         </Box>

// //         {imagePreview && (
// //           <Box sx={{ mt: 2 }}>
// //             <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
// //           </Box>
// //         )}

// //         {emojiPickerVisible && (
// //           <Box sx={{ position: 'absolute', bottom: '10px' }}>
// //             <EmojiPicker onEmojiClick={handleEmojiSelect} />
// //           </Box>
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default TweetInput;
// import React, { useState, useEffect,useRef } from 'react';
// import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import AssistantIcon from '@mui/icons-material/Assistant'; // 塗りつぶしアイコン（白埋め）
// import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined'; // 中抜きアイコン（アウトライン）
// import EmojiPicker from 'emoji-picker-react'; 
// import { storage } from '../firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useAvatar } from '../contexts/AvatarContext';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; 
// import axios from 'axios';

// interface TweetInputProps {
//   onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
//   isReplyMode?: boolean;
// }

// const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode, onTweetSubmit }) => {
//   const [tweetContent, setTweetContent] = useState('');
//   const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [suggestedText, setSuggestedText] = useState<string>('');
//   const [geminiMode, setGeminiMode] = useState<boolean>(false); // Geminiモードの状態を管理
//   const [buttonActive, setButtonActive] = useState<boolean>(false); // ボタンのアクティブ状態を管理
//   const { avatarUrl } = useAvatar();
  
//   const { transcript, resetTranscript, listening } = useSpeechRecognition();
//   const emojiPickerRef = useRef<HTMLDivElement>(null); // ポップアップの参照を追加

//   useEffect(() => {
//     console.log("Avatar URL has been updated:", avatarUrl);
//   }, [avatarUrl]);
  

//   // 音声認識の開始
//   const startListening = () => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: true, language: 'ja-JP' });
//   };

//   // 音声認識の停止
//   const stopListening = () => {
//     SpeechRecognition.stopListening();
//     setTweetContent(transcript);
//     resetTranscript();
//   };

//   // Google Cloud Vertex AI APIを使って続きを提案する
//   const getSuggestedText = async (inputText: string) => {
//     if (!inputText.trim()) return;
    
//     const tweetRequestText = `${inputText} ツイートを作成中です。これに続く1文を考えて魅力的なツイートにしてください。1パターンのみ返してください。必ず${inputText}の続きから返して下さい。 ツイ廃構文でお願いします。`;

//     try {
//       const response = await axios.post('https://uttc-hackathon-backend-951630660755.us-central1.run.app/generate-text', { text: tweetRequestText });
//       setSuggestedText(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching suggested text:", error);
//     }
//   };

//   useEffect(() => {
//     // geminiModeがオンの場合のみAPIリクエストを送る
//     if (geminiMode && tweetContent.trim()) {
//       const timer = setTimeout(() => {
//         getSuggestedText(tweetContent);
//       }, 500); // 500ms遅延でAPI呼び出し
//       return () => clearTimeout(timer);
//     }
//   }, [tweetContent, geminiMode]); // geminiModeが変更された時にもリクエストを確認

//    // ポップアップ外をクリックした際に閉じるための効果
//    useEffect(() => {
//     // クリックイベントをリッスンして、ポップアップ外をクリックしたら閉じる
//     const handleClickOutside = (event: MouseEvent) => {
//       if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
//         setEmojiPickerVisible(false); // 外部クリック時にポップアップを閉じる
//       }
//     };

//     // ドキュメントにクリックイベントを追加
//     document.addEventListener('mousedown', handleClickOutside);

//     // クリーンアップ: コンポーネントがアンマウントされるときにイベントリスナーを削除
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleEmojiSelect = (emoji: any) => {
//     setTweetContent(tweetContent + emoji.emoji);
//     setEmojiPickerVisible(false);
//   };

//   const toggleEmojiPicker = () => {
//     setEmojiPickerVisible(!emojiPickerVisible);
//   };

//   const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadImage = async (image: File, path: string) => {
//     if (!image) return null;
//     const imageRef = ref(storage, path);
//     await uploadBytes(imageRef, image);
//     const imageUrl = await getDownloadURL(imageRef);
//     return imageUrl;
//   };

//   const handleTweetSubmit = async () => {
//     if (!tweetContent.trim()) return;

//     let imageUrl: string | null = null;

//     if (selectedImage) {
//       imageUrl = await uploadImage(selectedImage, `content_images/${encodeURIComponent(selectedImage.name)}`);
//     }
//     console.log("img_url",imageUrl)

//     onTweetSubmit(tweetContent, imageUrl);

//     setTweetContent('');
//     setSelectedImage(null);
//     setImagePreview(null);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTweetContent(e.target.value);
//   };

//   const handleTabPress = (event: React.KeyboardEvent) => {
//     if (event.key === 'Tab' && suggestedText && geminiMode) { // Geminiモードが有効な場合のみ置換
//       // 提案されたテキストで現在のtweetContentを置換
//       setTweetContent(suggestedText);
//       event.preventDefault(); // タブキーによるフォーカス移動を防止
//     }
//   };

//   // Geminiモードのトグル処理
//   const toggleGeminiMode = () => {
//     setGeminiMode(!geminiMode);
//   };

//   const handleButtonClick = () => {
//     setButtonActive(true);
//     setTimeout(() => setButtonActive(false), 200); // クリック後200msでリセット
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
//           onChange={handleChange}
//           onKeyDown={handleTabPress}  // タブキーを処理
//           InputProps={{
//             disableUnderline: true,
//           }}
//           sx={{ mb: 2 }}
//         />
//         {suggestedText && geminiMode && (
//           <Box sx={{ mt: 2, color: 'grey', fontStyle: 'italic' }}>
//             <strong>おすすめ:</strong> ({suggestedText})
//           </Box>
//         )}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box>
//             <IconButton size="small" component="label">
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
//             {/* <IconButton 
//               size="small" 
//               onClick={listening ? stopListening : startListening}>
//               {listening ? <MicOffIcon /> : <MicIcon />}
//             </IconButton> */}
//             <IconButton 
//               size="small" 
//               onClick={listening ? stopListening : startListening} 
//               sx={{
//                 color: buttonActive ? 'yellow' : 'inherit', 
//                 backgroundColor: listening ? 'primary.main' : 'inherit', // マイクがオンの時は背景色を水色に
//                 '&:hover': {
//                   backgroundColor: listening ? 'primary.main' : 'rgba(0, 0, 0, 0.08)', // hover時にも背景色が水色
//                 }
//               }}
//             >
//               {listening ? <MicOffIcon /> : <MicIcon />}
//             </IconButton>
//             <IconButton 
//               size="small" 
//               onClick={toggleGeminiMode} 
//               sx={{
//                 color: buttonActive ? 'yellow' : 'inherit', 
//                 backgroundColor: geminiMode ?  'primary.main' : 'inherit', 
//                 '&:hover': {
//                   backgroundColor: geminiMode ? 'primary.main' : 'rgba(0, 0, 0, 0.08)', 
//                 }
//               }}
//             >
//               {geminiMode ? <AssistantOutlinedIcon /> : <AssistantIcon />}  {/* アイコン切替（逆に変更） */}
//             </IconButton>


//           </Box>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!tweetContent.trim()}
//             onClick={handleTweetSubmit}
//             sx={{
//               borderRadius: '9999px',
//               backgroundColor: buttonActive ? 'darkblue' : 'primary.main', // ボタンの色を変える
//               boxShadow: buttonActive ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none', // クリック時に影をつける
//               '&:hover': {
//                 backgroundColor: buttonActive ? 'darkblue' : 'primary.dark',
//               },
//             }}
//           >
//             {isReplyMode ? '返信' : 'ツイートする'}
//           </Button>
//         </Box>

//         {imagePreview && (
//           <Box sx={{ mt: 2 }}>
//             <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
//           </Box>
//         )}

//         {emojiPickerVisible && (
//           <Box ref={emojiPickerRef}  sx={{ position: 'absolute', bottom: '10px' }}>
//             <EmojiPicker onEmojiClick={handleEmojiSelect} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default TweetInput;
import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, IconButton, Avatar } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import AssistantIcon from '@mui/icons-material/Assistant'; // 塗りつぶしアイコン（白埋め）
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined'; // 中抜きアイコン（アウトライン）
import EmojiPicker from 'emoji-picker-react'; 
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useLoginUser } from '../contexts/LoginUserContext';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; 
import axios from 'axios';

interface TweetInputProps {
  onTweetSubmit: (tweetContent: string, imageUrl: string | null) => void;
  isReplyMode?: boolean;
}

const TweetInput: React.FC<TweetInputProps> = ({ isReplyMode, onTweetSubmit }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [suggestedText, setSuggestedText] = useState<string>('');
  const [geminiMode, setGeminiMode] = useState<boolean>(false); // Geminiモードの状態を管理
  const [buttonActive, setButtonActive] = useState<boolean>(false); // ボタンのアクティブ状態を管理
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // avatarUrlの状態を追加

  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  const emojiPickerRef = useRef<HTMLDivElement>(null); // ポップアップの参照を追加

  const {loginUser} = useLoginUser(); // ログインユーザーID（仮定）

  useEffect(() => {
    if (loginUser) {
      axios
        .get(`https://uttc-hackathon-backend-951630660755.us-central1.run.app/user/${loginUser}`)
        .then((response) => {
          console.log(response)
          setAvatarUrl(response.data.img_url); // APIから取得したアバターURLを設定
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [loginUser]); // loginUserが変更された場合に実行

  // その後の処理は元のコード通り
  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'ja-JP' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTweetContent(transcript);
    resetTranscript();
  };

  const getSuggestedText = async (inputText: string) => {
    if (!inputText.trim()) return;
    
    const tweetRequestText = `${inputText} ツイートを作成中です。これに続く1文を考えて魅力的なツイートにしてください。1パターンのみ返してください。必ず${inputText}の続きから返して下さい。 ツイ廃構文でお願いします。`;

    try {
      const response = await axios.post('https://uttc-hackathon-backend-951630660755.us-central1.run.app/generate-text', { text: tweetRequestText });
      setSuggestedText(response.data);
    } catch (error) {
      console.error("Error fetching suggested text:", error);
    }
  };

  useEffect(() => {
    if (geminiMode && tweetContent.trim()) {
      const timer = setTimeout(() => {
        getSuggestedText(tweetContent);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [tweetContent, geminiMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setEmojiPickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiSelect = (emoji: any) => {
    setTweetContent(tweetContent + emoji.emoji);
    setEmojiPickerVisible(false);
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (image: File, path: string) => {
    if (!image) return null;
    const imageRef = ref(storage, path);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  const handleTweetSubmit = async () => {
    if (!tweetContent.trim()) return;

    let imageUrl: string | null = null;

    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage, `content_images/${encodeURIComponent(selectedImage.name)}`);
    }

    onTweetSubmit(tweetContent, imageUrl);

    setTweetContent('');
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweetContent(e.target.value);
  };

  const handleTabPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' && suggestedText && geminiMode) {
      setTweetContent(suggestedText);
      event.preventDefault();
    }
  };

  const toggleGeminiMode = () => {
    setGeminiMode(!geminiMode);
  };

  const handleButtonClick = () => {
    setButtonActive(true);
    setTimeout(() => setButtonActive(false), 200);
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
          onChange={handleChange}
          onKeyDown={handleTabPress}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ mb: 2 }}
        />
        {suggestedText && geminiMode && (
          <Box sx={{ mt: 2, color: 'grey', fontStyle: 'italic' }}>
            <strong>Copilot:</strong> ({suggestedText})
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton size="small" component="label">
              <ImageIcon />
              <input type="file" accept="image/*" hidden onChange={handleImageSelect} />
            </IconButton>
            <IconButton size="small" onClick={toggleEmojiPicker}>
              <EmojiEmotionsIcon />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={listening ? stopListening : startListening} 
              sx={{
                color: buttonActive ? 'yellow' : 'inherit', 
                backgroundColor: listening ? 'primary.main' : 'inherit', // マイクがオンの時は背景色を水色に
                '&:hover': {
                  backgroundColor: listening ? 'primary.main' : 'rgba(0, 0, 0, 0.08)', // hover時にも背景色が水色
                }
              }}
            >
              {listening ? <MicOffIcon /> : <MicIcon />}
            </IconButton>


            <IconButton size="small" onClick={toggleGeminiMode}
            sx={{
              color: buttonActive ? 'yellow' : 'inherit', 
              backgroundColor: geminiMode ?  'primary.main' : 'inherit', 
              '&:hover': {
                backgroundColor: geminiMode ? 'primary.main' : 'rgba(0, 0, 0, 0.08)', 
              }
            }}
            >
              {geminiMode ? <AssistantOutlinedIcon /> : <AssistantIcon />}
            </IconButton>
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!tweetContent.trim()}
            onClick={handleTweetSubmit}
            sx={{
              borderRadius: '9999px',
              backgroundColor: buttonActive ? 'darkblue' : 'primary.main',
              boxShadow: buttonActive ? '0 2px 10px rgba(0, 0, 0, 0.2)' : 'none',
              '&:hover': {
                backgroundColor: buttonActive ? 'darkblue' : 'primary.dark',
              },
            }}
          >
            {isReplyMode ? '返信' : 'ツイートする'}
          </Button>
        </Box>

        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
          </Box>
        )}

        {emojiPickerVisible && (
          <Box ref={emojiPickerRef} sx={{ position: 'absolute', bottom: '10px' }}>
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TweetInput;
