## 圣经故事7一15【出埃及至王权时代】
<div class="scripture-box">
  "起初神创造天地。地是空虚混沌。渊面黑暗。神的灵运行在水面上。神说，要有光，就有了光。"
  <div class="verse-ref">—— 创1:1-3</div>
</div>

<div class="video-container serene-bg">
  <!-- 微信专用播放器 -->
  <div class="wx-video-player" data-video-id="orr4z1jcvk">
    <div class="wx-loading-prompt">
      <i class="fa fa-spinner fa-pulse"></i>
      正在加载视频...
    </div>
    <button class="wx-play-button" onclick="loadWistiaVideo()">▶ 点击播放</button>
  </div>

  <!-- 原有Wistia播放器 -->
  <div class="wistia-player-container" style="display:none;">
    <script src="https://fast.wistia.com/playlist.js" async></script>
    <wistia-playlist
      channel-id="orr4z1jcvk"
      playlist-style="advanced"
      playlist-color="#2D5F91"
      playlist-font="georgia"
      player-resize="true">
    </wistia-playlist>
  </div>
</div>

<script>
function loadWistiaVideo() {
  // 隐藏微信播放按钮
  document.querySelector('.wx-play-button').style.display = 'none';
  document.querySelector('.wx-loading-prompt').style.display = 'none';

  // 显示Wistia播放器
  document.querySelector('.wistia-player-container').style.display = 'block';

  // 重新加载Wistia脚本
  var script = document.createElement('script');
  script.src = 'https://fast.wistia.com/playlist.js';
  document.head.appendChild(script);
}

// 检测微信浏览器
function isWeixinBrowser() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

// 页面加载时检测
if (isWeixinBrowser()) {
  document.querySelector('.wistia-player-container').style.display = 'none';
  document.querySelector('.wx-video-player').style.display = 'block';
} else {
  document.querySelector('.wx-video-player').style.display = 'none';
  document.querySelector('.wistia-player-container').style.display = 'block';
}
</script>

---

<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">亚当</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">第一个有灵的活人</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">挪亚</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">方舟的救恩</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">亚伯拉罕</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">信心之父</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">以撒</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">神赐的孩子</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">雅各</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">抓住福分的以色列</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h4 class="timeline-title">约瑟</h4>
      <div class="timeline-connector"></div>
      <p class="timeline-desc">埃及的宰相人生</p>
    </div>
  </div>
</div>