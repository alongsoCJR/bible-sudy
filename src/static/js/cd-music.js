/**
 * CD 活动音乐台
 * 内置曲目来源：
 * - Kevin MacLeod (incompetech.com) — CC BY 4.0
 * - SoundHelix 示例曲 — 可直链播放的程序化音乐
 */
(function (global) {
  const BASE_KM = 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/';
  const BASE_SH = 'https://www.soundhelix.com/examples/mp3/';

  const PLAYLIST = {
    pre: [
      { id: 'pre-1', title: 'Carefree', artist: 'Kevin MacLeod', mood: '轻松暖场', url: BASE_KM + 'Carefree.mp3' },
      { id: 'pre-2', title: 'Enter the Party', artist: 'Kevin MacLeod', mood: '入场氛围', url: BASE_KM + 'Enter%20the%20Party.mp3' },
      { id: 'pre-3', title: 'Digital Lemonade', artist: 'Kevin MacLeod', mood: '明亮科技', url: BASE_KM + 'Digital%20Lemonade.mp3' },
      { id: 'pre-4', title: 'Jaunty Gumption', artist: 'Kevin MacLeod', mood: '轻快活泼', url: BASE_KM + 'Jaunty%20Gumption.mp3' },
      { id: 'pre-5', title: 'Wallpaper', artist: 'Kevin MacLeod', mood: '背景铺垫', url: BASE_KM + 'Wallpaper.mp3' },
      { id: 'pre-6', title: 'Local Forecast', artist: 'Kevin MacLeod', mood: '柔和等候', url: BASE_KM + 'Local%20Forecast%20-%20Elevator.mp3' },
      { id: 'pre-7', title: 'SoundHelix #2', artist: 'SoundHelix', mood: '程序感暖场', url: BASE_SH + 'SoundHelix-Song-2.mp3' },
      { id: 'pre-8', title: 'SoundHelix #3', artist: 'SoundHelix', mood: '电子等待', url: BASE_SH + 'SoundHelix-Song-3.mp3' }
    ],
    battle: [
      { id: 'bat-1', title: 'Impact Moderato', artist: 'Kevin MacLeod', mood: '比赛推进', url: BASE_KM + 'Impact%20Moderato.mp3' },
      { id: 'bat-2', title: 'Danger Storm', artist: 'Kevin MacLeod', mood: '紧张对抗', url: BASE_KM + 'Danger%20Storm.mp3' },
      { id: 'bat-3', title: 'Exciting Trailer', artist: 'Kevin MacLeod', mood: '高能预告', url: BASE_KM + 'Exciting%20Trailer.mp3' },
      { id: 'bat-4', title: 'Achilles', artist: 'Kevin MacLeod', mood: '史诗对决', url: BASE_KM + 'Achilles.mp3' },
      { id: 'bat-5', title: 'Heroic Age', artist: 'Kevin MacLeod', mood: '热血冲刺', url: BASE_KM + 'Heroic%20Age.mp3' },
      { id: 'bat-6', title: 'SoundHelix #1', artist: 'SoundHelix', mood: '电子对战', url: BASE_SH + 'SoundHelix-Song-1.mp3' },
      { id: 'bat-7', title: 'SoundHelix #8', artist: 'SoundHelix', mood: '节奏驱动', url: BASE_SH + 'SoundHelix-Song-8.mp3' },
      { id: 'bat-8', title: 'SoundHelix #9', artist: 'SoundHelix', mood: '科技竞技', url: BASE_SH + 'SoundHelix-Song-9.mp3' },
      { id: 'bat-9', title: 'SoundHelix #10', artist: 'SoundHelix', mood: '持续加压', url: BASE_SH + 'SoundHelix-Song-10.mp3' }
    ],
    award: [
      { id: 'awd-1', title: 'Heroic Age', artist: 'Kevin MacLeod', mood: '颁奖登台', url: BASE_KM + 'Heroic%20Age.mp3' },
      { id: 'awd-2', title: 'Exciting Trailer', artist: 'Kevin MacLeod', mood: '荣耀时刻', url: BASE_KM + 'Exciting%20Trailer.mp3' },
      { id: 'awd-3', title: 'Impact Moderato', artist: 'Kevin MacLeod', mood: '庄重有力', url: BASE_KM + 'Impact%20Moderato.mp3' },
      { id: 'awd-4', title: 'Achilles', artist: 'Kevin MacLeod', mood: '冠军气场', url: BASE_KM + 'Achilles.mp3' },
      { id: 'awd-5', title: 'Enter the Party', artist: 'Kevin MacLeod', mood: '庆祝收尾', url: BASE_KM + 'Enter%20the%20Party.mp3' },
      { id: 'awd-6', title: 'SoundHelix #15', artist: 'SoundHelix', mood: '电子凯旋', url: BASE_SH + 'SoundHelix-Song-15.mp3' },
      { id: 'awd-7', title: 'SoundHelix #16', artist: 'SoundHelix', mood: '终章余韵', url: BASE_SH + 'SoundHelix-Song-16.mp3' }
    ]
  };

  const PHASE_META = {
    pre: { label: '赛前暖场', icon: '🌅' },
    battle: { label: '比赛进行', icon: '⚡' },
    award: { label: '颁奖庆典', icon: '🏆' }
  };

  function createPlayer(options) {
    const opts = Object.assign({
      audioId: 'cdBgMusic',
      rootId: 'cdMusicDock',
      compact: false
    }, options || {});

    const audio = document.getElementById(opts.audioId);
    const root = document.getElementById(opts.rootId);
    if (!audio || !root) return null;

    let phase = 'pre';
    let current = null;
    let localUrl = null;
    let isPlaying = false;

    root.innerHTML = buildUI(opts.compact);
    bind();

    function buildUI(compact) {
      const phases = ['pre', 'battle', 'award'].map(p => {
        const m = PHASE_META[p];
        return `<button type="button" class="cdm-phase${p === phase ? ' active' : ''}" data-phase="${p}">
          <span class="cdm-phase-icon">${m.icon}</span>
          <span class="cdm-phase-label">${m.label}</span>
        </button>`;
      }).join('');

      return `
        <div class="cdm-shell ${compact ? 'is-compact' : ''}">
          <div class="cdm-top">
            <div class="cdm-brand">
              <span class="cdm-pulse"></span>
              <div>
                <div class="cdm-title">MUSIC DECK</div>
                <div class="cdm-now" id="cdmNow">选择曲目后播放</div>
              </div>
            </div>
            <div class="cdm-controls">
              <button type="button" class="cdm-btn cdm-play" id="cdmPlay" title="播放/暂停">▶</button>
              <button type="button" class="cdm-btn" id="cdmStop" title="停止">■</button>
              <label class="cdm-btn cdm-file" title="本地音乐">
                📁
                <input type="file" id="cdmLocal" accept="audio/*" hidden>
              </label>
            </div>
          </div>
          <div class="cdm-phases">${phases}</div>
          <div class="cdm-quick">
            <button type="button" class="cdm-quick-btn" data-quick="pre">一键赛前</button>
            <button type="button" class="cdm-quick-btn" data-quick="battle">一键比赛</button>
            <button type="button" class="cdm-quick-btn" data-quick="award">一键颁奖</button>
          </div>
          <div class="cdm-tracks" id="cdmTracks"></div>
          <div class="cdm-credit">内置曲目：Kevin MacLeod (CC BY) · SoundHelix · 可上传本地音频</div>
        </div>
      `;
    }

    function bind() {
      root.querySelectorAll('.cdm-phase').forEach(btn => {
        btn.addEventListener('click', () => {
          phase = btn.dataset.phase;
          root.querySelectorAll('.cdm-phase').forEach(b => b.classList.toggle('active', b === btn));
          renderTracks();
        });
      });
      root.querySelectorAll('.cdm-quick-btn').forEach(btn => {
        btn.addEventListener('click', () => playPhase(btn.dataset.quick));
      });
      document.getElementById('cdmPlay').addEventListener('click', togglePlay);
      document.getElementById('cdmStop').addEventListener('click', stop);
      document.getElementById('cdmLocal').addEventListener('change', onLocal);
      audio.addEventListener('ended', () => {
        isPlaying = false;
        syncPlayBtn();
      });
      audio.addEventListener('play', () => {
        isPlaying = true;
        syncPlayBtn();
        root.classList.add('is-playing');
      });
      audio.addEventListener('pause', () => {
        isPlaying = false;
        syncPlayBtn();
        root.classList.remove('is-playing');
      });
      renderTracks();
    }

    function renderTracks() {
      const list = PLAYLIST[phase] || [];
      const box = document.getElementById('cdmTracks');
      box.innerHTML = list.map(t => `
        <button type="button" class="cdm-track${current && current.id === t.id ? ' active' : ''}" data-id="${t.id}">
          <span class="cdm-track-title">${escapeHtml(t.title)}</span>
          <span class="cdm-track-meta">${escapeHtml(t.mood)} · ${escapeHtml(t.artist)}</span>
        </button>
      `).join('');
      box.querySelectorAll('.cdm-track').forEach(btn => {
        btn.addEventListener('click', () => {
          const track = list.find(t => t.id === btn.dataset.id);
          if (track) playTrack(track);
        });
      });
    }

    function playTrack(track) {
      current = track;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
        localUrl = null;
      }
      audio.src = track.url;
      audio.loop = true;
      audio.play().catch(err => {
        alert('无法播放该曲目（可能被网络拦截）。可改用「本地音乐」上传文件。');
        console.error(err);
      });
      document.getElementById('cdmNow').textContent = `${PHASE_META[phase].label} · ${track.title}`;
      renderTracks();
    }

    function playPhase(p) {
      phase = p;
      root.querySelectorAll('.cdm-phase').forEach(b => b.classList.toggle('active', b.dataset.phase === p));
      renderTracks();
      const list = PLAYLIST[p] || [];
      if (list.length) playTrack(list[0]);
    }

    function togglePlay() {
      if (!audio.src) {
        playPhase(phase);
        return;
      }
      if (audio.paused) audio.play().catch(console.error);
      else audio.pause();
    }

    function stop() {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
      syncPlayBtn();
      root.classList.remove('is-playing');
    }

    function onLocal(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (localUrl) URL.revokeObjectURL(localUrl);
      localUrl = URL.createObjectURL(file);
      current = { id: 'local', title: file.name, artist: '本地文件', mood: '自定义' };
      audio.src = localUrl;
      audio.loop = true;
      audio.play().catch(err => {
        alert('本地音乐无法播放');
        console.error(err);
      });
      document.getElementById('cdmNow').textContent = `本地 · ${file.name}`;
      renderTracks();
    }

    function syncPlayBtn() {
      const btn = document.getElementById('cdmPlay');
      if (btn) btn.textContent = isPlaying ? '⏸' : '▶';
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    return { playPhase, playTrack, stop, PLAYLIST, PHASE_META };
  }

  global.CDMusic = { PLAYLIST, PHASE_META, createPlayer };
})(window);
