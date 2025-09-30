# <span class="bible-title">📖 圣经有声平台</span>
## <span class="bible-title">🎧 音频播放器</span>

<div class="audio-section">
  <div class="audio-player-card">
    <h3>📖 灵性与灵魂</h3>
    <div class="audio-container">
      <audio controls style="width: 100%; max-width: 600px;">
        <source src="https://ydschool-online.nosdn.127.net/tiku/6511ac479452ca2cd348f1d01150067cbebbf50d45bf326311db674eb093589b.mp3" type="audio/mpeg">
        您的浏览器不支持音频播放，请<a href="https://ydschool-online.nosdn.127.net/tiku/6511ac479452ca2cd348f1d01150067cbebbf50d45bf326311db674eb093589b.mp3" target="_blank">点击这里下载音频</a>
      </audio>
    </div>
  </div>
</div>

<style>
.audio-section {
  margin: 30px 0;
}

.audio-player-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
}

.audio-player-card h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.3em;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

.audio-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.audio-info {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
}

.audio-info p {
  margin: 8px 0;
  color: #495057;
}

.audio-info a {
  color: #1976d2;
  text-decoration: none;
}

.audio-info a:hover {
  text-decoration: underline;
}

audio {
  border-radius: 8px;
  background: #f8f9fa;
}

audio::-webkit-media-controls-panel {
  background-color: #f8f9fa;
}

audio::-webkit-media-controls-play-button {
  background-color: #4CAF50;
  border-radius: 50%;
}

audio::-webkit-media-controls-current-time-display,
audio::-webkit-media-controls-time-remaining-display {
  color: #2c3e50;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .audio-player-card {
    padding: 20px;
    margin: 0 10px;
  }
  
  .audio-player-card h3 {
    font-size: 1.2em;
  }
  
  audio {
    width: 100%;
  }
}
</style>