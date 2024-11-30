import React from 'react';

const ArtistBanner: React.FC = () => {
  const styles = {
    banner: {
      height: '100vh', // 画面全体の高さに設定
      width: '100%', // 幅を画面いっぱいに設定
      backgroundSize: 'cover', // 画像がコンテナ全体に収まるように
      backgroundPosition: 'center', // 画像を中央に配置
      color: 'white',
      display: 'flex', // 中身をフレックスボックスで配置
      alignItems: 'center', // 垂直方向に中央揃え
      justifyContent: 'center', // 水平方向に中央揃え
      position: 'relative', // オーバーレイのための位置調整
    } as React.CSSProperties, // 型を明示的に指定
    
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明の黒いオーバーレイ
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center', // テキストを中央に配置
      position: 'absolute', // 背景の上に重ねる
      bottom: '20px', // 下に少し余白を設定
      left: '50%', // 水平方向に中央揃え
      transform: 'translateX(-50%)', // 完全に中央に配置
    } as React.CSSProperties,

    artistName: {
      fontSize: '36px',
      marginBottom: '10px',
    },

    followButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#1DB954',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
    }
  };

  const artistName = "アーティスト名";
  const artistImageUrl = "https://kamitsubaki.jp/wp-content/uploads/2020/09/c36a4eaae44eb84c4a9095aa065aaa36.png";

  return (
    <div style={{ ...styles.banner, backgroundImage: `url(${artistImageUrl})` }}>
      <div style={styles.overlay}>
        <h1 style={styles.artistName}>{artistName}</h1>
        <button style={styles.followButton}>フォロー</button>
      </div>
    </div>
  );
};

export default ArtistBanner;
