/**
 * Pixel Mystery Quiz - Trình điều phối trò chơi chính (App Controller)
 */

class QuizGame {
  constructor() {
    this.currentPresetIndex = 0;
    this.activePack = null;
    this.questionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.isAnswered = false;

    // Bộ nhớ tạm cho Studio tải ảnh
    this.tempPixelArt = null;
    this.editingQuestionIndex = -1;

    this.init();
  }

  init() {
    this.loadSavedPack();
    this.bindEvents();
    this.startNewGame();
  }

  // Tải bộ đề từ localStorage nếu có, nếu không thì lấy bộ mẫu
  loadSavedPack() {
    const saved = localStorage.getItem('pixel_quiz_custom_pack');
    if (saved) {
      try {
        this.activePack = JSON.parse(saved);
        return;
      } catch (e) {
        console.error('Lỗi đọc pack từ localStorage:', e);
      }
    }
    // Mặc định chọn bộ đầu tiên (Trái Tim 8-Bit)
    this.activePack = JSON.parse(JSON.stringify(window.DEFAULT_PRESETS[0]));
  }

  saveCustomPack() {
    localStorage.setItem('pixel_quiz_custom_pack', JSON.stringify(this.activePack));
  }

  startNewGame() {
    this.questionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.isAnswered = false;

    // Nạp tranh pixel vào Engine
    window.pixelEngine.loadPixelArt(this.activePack.pixelArt);

    // Cập nhật giao diện
    this.updateStatsUI();
    this.renderCurrentQuestion();

    // Ẩn bảng giải thích & nút tiếp tục
    const feedbackEl = document.getElementById('feedback-box');
    if (feedbackEl) feedbackEl.classList.add('hidden');
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.classList.add('hidden');

    document.getElementById('pack-title').textContent = this.activePack.name || 'Bức Tranh Bí Ẩn';
  }

  // Hiển thị câu hỏi hiện tại
  renderCurrentQuestion() {
    const questions = this.activePack.questions;
    if (!questions || questions.length === 0) {
      document.getElementById('question-text').textContent = 'Chưa có câu hỏi nào trong bộ đề! Vui lòng vào Quản lý để thêm câu hỏi.';
      document.getElementById('options-container').innerHTML = '';
      return;
    }

    if (this.questionIndex >= questions.length) {
      this.finishGame();
      return;
    }

    this.isAnswered = false;
    const currentQ = questions[this.questionIndex];

    // Cập nhật chỉ số câu hỏi
    document.getElementById('question-counter').textContent = `Câu hỏi ${this.questionIndex + 1} / ${questions.length}`;
    document.getElementById('question-text').textContent = currentQ.question;

    // Ẩn thanh giải thích
    const feedbackEl = document.getElementById('feedback-box');
    feedbackEl.classList.add('hidden');
    feedbackEl.className = 'feedback-box hidden';

    const nextBtn = document.getElementById('next-btn');
    nextBtn.classList.add('hidden');

    // Tạo các nút lựa chọn
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const optionLabels = ['A', 'B', 'C', 'D'];
    currentQ.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-key">${optionLabels[idx]}</span>
        <span class="option-text">${optText}</span>
      `;
      btn.addEventListener('click', () => this.handleAnswer(idx));
      optionsContainer.appendChild(btn);
    });
  }

  // Xử lý khi người chơi chọn một đáp án
  handleAnswer(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const currentQ = this.activePack.questions[this.questionIndex];
    const isCorrect = selectedIndex === currentQ.correctIndex;
    const optionButtons = document.querySelectorAll('.option-btn');

    const feedbackEl = document.getElementById('feedback-box');
    const nextBtn = document.getElementById('next-btn');

    if (isCorrect) {
      // TRẢ LỜI ĐÚNG
      this.correctCount++;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;

      // Tính điểm thưởng combo
      const basePoints = 100;
      const streakBonus = (this.streak - 1) * 30;
      const totalEarned = basePoints + streakBonus;
      this.score += totalEarned;

      // Âm thanh
      if (this.streak > 1) {
        window.soundEngine.playStreak(this.streak);
      } else {
        window.soundEngine.playCorrect();
      }

      // Tô màu các ô vuông pixel tương ứng
      const totalQ = this.activePack.questions.length;
      const isLastQ = this.questionIndex === totalQ - 1;
      const stats = window.pixelEngine.getStats();
      const unrevealedCount = stats.total - stats.revealed;
      const remainingQuestions = totalQ - this.questionIndex;
      const batchSize = Math.max(1, Math.ceil(unrevealedCount / remainingQuestions));

      const revealedNow = window.pixelEngine.revealBatch(batchSize, isLastQ);

      // Hiệu ứng nút bấm
      optionButtons[selectedIndex].classList.add('correct');

      // Bảng thông báo
      feedbackEl.className = 'feedback-box feedback-correct';
      feedbackEl.innerHTML = `
        <div class="feedback-title">🎉 Chính xác! (+${totalEarned} điểm)</div>
        <div class="feedback-desc">Bạn vừa tô màu thêm <strong>${revealedNow} ô pixel</strong> của bức tranh!</div>
        ${currentQ.explanation ? `<div class="feedback-expl">💡 ${currentQ.explanation}</div>` : ''}
      `;
      feedbackEl.classList.remove('hidden');

    } else {
      // TRẢ LỜI SAI
      this.wrongCount++;
      this.streak = 0; // Đứt chuỗi streak

      window.soundEngine.playWrong();

      optionButtons[selectedIndex].classList.add('wrong');
      if (optionButtons[currentQ.correctIndex]) {
        optionButtons[currentQ.correctIndex].classList.add('correct');
      }

      feedbackEl.className = 'feedback-box feedback-wrong';
      feedbackEl.innerHTML = `
        <div class="feedback-title">❌ Chưa chính xác!</div>
        <div class="feedback-desc">Đáp án đúng là: <strong>${currentQ.options[currentQ.correctIndex]}</strong></div>
        ${currentQ.explanation ? `<div class="feedback-expl">💡 ${currentQ.explanation}</div>` : ''}
      `;
      feedbackEl.classList.remove('hidden');
    }

    // Khóa các nút khác
    optionButtons.forEach(btn => btn.setAttribute('disabled', 'true'));

    // Cập nhật UI
    this.updateStatsUI();

    // Hiện nút Tiếp tục
    nextBtn.classList.remove('hidden');
    nextBtn.focus();
  }

  nextQuestion() {
    window.soundEngine.playClick();
    this.questionIndex++;
    this.renderCurrentQuestion();
  }

  // Cập nhật điểm, streak, tiến độ mở pixel
  updateStatsUI() {
    document.getElementById('score-display').textContent = this.score;

    const streakBadge = document.getElementById('streak-badge');
    const streakCount = document.getElementById('streak-count');
    streakCount.textContent = `x${this.streak}`;

    if (this.streak >= 2) {
      streakBadge.classList.add('streak-active');
    } else {
      streakBadge.classList.remove('streak-active');
    }

    // Tiến độ mở pixel
    const stats = window.pixelEngine.getStats();
    document.getElementById('progress-percent').textContent = `${stats.percent}%`;
    document.getElementById('progress-bar-fill').style.width = `${stats.percent}%`;
    document.getElementById('pixel-count-text').textContent = `${stats.revealed} / ${stats.total} ô đã mở`;
  }

  // Kết thúc trò chơi & Chiến thắng
  finishGame() {
    window.pixelEngine.revealAll();
    window.soundEngine.playVictory();
    window.confettiEngine.burst(160);

    const victoryDialog = document.getElementById('victory-dialog');
    document.getElementById('final-score').textContent = this.score;
    document.getElementById('final-correct').textContent = `${this.correctCount} / ${this.activePack.questions.length}`;
    document.getElementById('final-streak').textContent = this.maxStreak;

    // Xem trước tranh hoàn thiện trên canvas modal
    const finalImg = document.getElementById('final-pixel-preview');
    if (finalImg) {
      finalImg.src = window.pixelEngine.exportDataURL();
    }

    if (victoryDialog && victoryDialog.showModal) {
      victoryDialog.showModal();
    }
  }

  // Gắn sự kiện (Click, Phím tắt, Modal)
  bindEvents() {
    // Nút Câu tiếp theo
    document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());

    // Nút Bật/Tắt âm thanh
    const muteBtn = document.getElementById('mute-btn');
    const updateMuteIcon = () => {
      muteBtn.textContent = window.soundEngine.isMuted() ? '🔇' : '🔊';
      muteBtn.title = window.soundEngine.isMuted() ? 'Bật âm thanh' : 'Tắt âm thanh';
    };
    updateMuteIcon();
    muteBtn.addEventListener('click', () => {
      window.soundEngine.toggleMute();
      updateMuteIcon();
      if (!window.soundEngine.isMuted()) window.soundEngine.playClick();
    });

    // Phím tắt bàn phím: 1, 2, 3, 4 hoặc A, B, C, D; Phím Space hoặc Enter để sang câu tiếp
    window.addEventListener('keydown', (e) => {
      // Nếu đang mở dialog thì không bắt phím tắt chơi game
      const studioDialog = document.getElementById('studio-dialog');
      const victoryDialog = document.getElementById('victory-dialog');
      if ((studioDialog && studioDialog.open) || (victoryDialog && victoryDialog.open)) return;

      const key = e.key.toUpperCase();
      if (!this.isAnswered) {
        if (key === '1' || key === 'A') this.handleAnswer(0);
        else if (key === '2' || key === 'B') this.handleAnswer(1);
        else if (key === '3' || key === 'C') this.handleAnswer(2);
        else if (key === '4' || key === 'D') this.handleAnswer(3);
      } else {
        if (key === 'ENTER' || key === ' ') {
          e.preventDefault();
          this.nextQuestion();
        }
      }
    });

    // Nút Chơi lại
    document.getElementById('restart-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      this.startNewGame();
    });

    // Nút Chơi lại trong modal chiến thắng
    document.getElementById('play-again-btn').addEventListener('click', () => {
      const victoryDialog = document.getElementById('victory-dialog');
      if (victoryDialog) victoryDialog.close();
      window.soundEngine.playClick();
      this.startNewGame();
    });

    // Tải ảnh Pixel về máy
    document.getElementById('download-art-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      const dataUrl = window.pixelEngine.exportDataURL();
      if (dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `pixel-artwork-${Date.now()}.png`;
        a.click();
      }
    });

    // Chuyển đổi bộ đề mẫu (Presets)
    const presetSelector = document.getElementById('preset-selector');
    presetSelector.addEventListener('change', (e) => {
      window.soundEngine.playClick();
      const val = e.target.value;
      const found = window.DEFAULT_PRESETS.find(p => p.id === val);
      if (found) {
        this.activePack = JSON.parse(JSON.stringify(found));
        this.saveCustomPack();
        this.startNewGame();
      }
    });

    // Quản lý Modal Studio
    this.bindStudioEvents();
  }

  // Các sự kiện trong Studio Quản lý câu hỏi & Tải ảnh
  bindStudioEvents() {
    const studioDialog = document.getElementById('studio-dialog');
    const openStudioBtn = document.getElementById('open-studio-btn');
    const closeStudioBtn = document.getElementById('close-studio-btn');

    openStudioBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      this.renderStudioQuestionsList();
      studioDialog.showModal();
    });

    closeStudioBtn.addEventListener('click', () => {
      window.soundEngine.playClick();
      studioDialog.close();
    });

    // Đóng khi click ngoài backdrop dialog
    studioDialog.addEventListener('click', (e) => {
      const rect = studioDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        studioDialog.close();
      }
    });

    // Chuyển Tabs trong Studio
    const tabButtons = document.querySelectorAll('.studio-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabTarget = btn.getAttribute('data-tab');
        document.querySelectorAll('.studio-tab-panel').forEach(panel => {
          panel.classList.add('hidden');
        });
        document.getElementById(`tab-${tabTarget}`).classList.remove('hidden');
      });
    });

    // 1. TAB TẢI ẢNH: Đọc file ảnh từ người dùng
    const imageInput = document.getElementById('image-upload-input');
    const resolutionSelect = document.getElementById('pixel-resolution-select');
    const applyImageBtn = document.getElementById('apply-image-btn');

    const processSelectedImage = () => {
      const file = imageInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = async () => {
          const res = parseInt(resolutionSelect.value, 10) || 16;
          // Hiển thị ảnh gốc xem trước
          document.getElementById('original-image-preview').src = event.target.result;

          // Pixel hóa ảnh qua canvas
          this.tempPixelArt = await PixelEngine.pixelateFromImage(img, res);

          // Vẽ preview pixel hóa lên canvas nhỏ
          const previewCanvas = document.getElementById('pixelated-preview-canvas');
          previewCanvas.width = 160;
          previewCanvas.height = 160;
          const pCtx = previewCanvas.getContext('2d');
          pCtx.imageSmoothingEnabled = false;
          pCtx.clearRect(0, 0, 160, 160);

          const cellW = 160 / res;
          this.tempPixelArt.pixels.forEach(p => {
            if (p.color !== 'transparent') {
              pCtx.fillStyle = p.color;
              pCtx.fillRect(p.x * cellW, p.y * cellW, cellW, cellW);
            }
          });

          applyImageBtn.removeAttribute('disabled');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    };

    imageInput.addEventListener('change', processSelectedImage);
    resolutionSelect.addEventListener('change', () => {
      if (imageInput.files[0]) processSelectedImage();
    });

    // Nút áp dụng tranh pixel mới
    applyImageBtn.addEventListener('click', () => {
      if (!this.tempPixelArt) return;
      window.soundEngine.playClick();
      const customTitle = document.getElementById('custom-art-name').value.trim() || 'Tranh Ảnh Tự Tạo';
      this.activePack.name = `🖼️ ${customTitle}`;
      this.activePack.pixelArt = this.tempPixelArt;
      this.saveCustomPack();
      alert('Đã áp dụng tranh pixel mới thành công!');
      studioDialog.close();
      this.startNewGame();
    });

    // 2. TAB QUẢN LÝ CÂU HỎI
    const questionForm = document.getElementById('question-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');

    questionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.soundEngine.playClick();

      const qText = document.getElementById('form-question-text').value.trim();
      const optA = document.getElementById('form-opt-0').value.trim();
      const optB = document.getElementById('form-opt-1').value.trim();
      const optC = document.getElementById('form-opt-2').value.trim();
      const optD = document.getElementById('form-opt-3').value.trim();
      const correctRadio = document.querySelector('input[name="correct-option"]:checked');
      const correctIdx = correctRadio ? parseInt(correctRadio.value, 10) : 0;
      const explanation = document.getElementById('form-explanation').value.trim();

      if (!qText || !optA || !optB || !optC || !optD) {
        alert('Vui lòng điền đầy đủ câu hỏi và 4 phương án lựa chọn!');
        return;
      }

      const newQ = {
        id: Date.now(),
        question: qText,
        options: [optA, optB, optC, optD],
        correctIndex: correctIdx,
        explanation
      };

      if (this.editingQuestionIndex >= 0) {
        this.activePack.questions[this.editingQuestionIndex] = newQ;
        this.editingQuestionIndex = -1;
      } else {
        this.activePack.questions.push(newQ);
      }

      this.saveCustomPack();
      questionForm.reset();
      cancelEditBtn.classList.add('hidden');
      document.getElementById('form-submit-btn').textContent = '➕ Thêm câu hỏi này';
      this.renderStudioQuestionsList();
    });

    cancelEditBtn.addEventListener('click', () => {
      this.editingQuestionIndex = -1;
      questionForm.reset();
      cancelEditBtn.classList.add('hidden');
      document.getElementById('form-submit-btn').textContent = '➕ Thêm câu hỏi này';
    });

    // 3. TAB NHẬP / XUẤT DỮ LIỆU
    // Xuất file JSON
    document.getElementById('export-json-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.activePack, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `pixel-quiz-pack-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    // Nhập file JSON
    const importFileInput = document.getElementById('import-json-file');
    document.getElementById('import-json-btn').addEventListener('click', () => {
      importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (!imported.questions || !imported.pixelArt) {
            throw new Error('Định dạng file không đúng cấu trúc (thiếu questions hoặc pixelArt)');
          }
          this.activePack = imported;
          this.saveCustomPack();
          alert('Nhập bộ câu hỏi & tranh pixel thành công!');
          studioDialog.close();
          this.startNewGame();
        } catch (err) {
          alert('Lỗi nhập file: ' + err.message);
        }
      };
      reader.readAsText(file);
    });

    // Khôi phục mặc định
    document.getElementById('reset-default-btn').addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn khôi phục lại bộ câu hỏi và tranh mẫu mặc định? Các câu hỏi tự tạo sẽ bị xóa.')) {
        window.soundEngine.playClick();
        localStorage.removeItem('pixel_quiz_custom_pack');
        this.activePack = JSON.parse(JSON.stringify(window.DEFAULT_PRESETS[0]));
        this.renderStudioQuestionsList();
        studioDialog.close();
        this.startNewGame();
      }
    });
  }

  // Hiển thị danh sách câu hỏi trong tab quản lý
  renderStudioQuestionsList() {
    const listContainer = document.getElementById('studio-questions-list');
    listContainer.innerHTML = '';

    const questions = this.activePack.questions;
    document.getElementById('total-questions-badge').textContent = `${questions.length} câu hỏi`;

    if (questions.length === 0) {
      listContainer.innerHTML = '<div class="empty-state">Chưa có câu hỏi nào. Hãy thêm câu hỏi bên dưới!</div>';
      return;
    }

    questions.forEach((q, idx) => {
      const item = document.createElement('div');
      item.className = 'studio-q-item';
      item.innerHTML = `
        <div class="q-item-header">
          <span class="q-item-number">Câu ${idx + 1}</span>
          <div class="q-item-actions">
            <button class="btn-sm btn-edit" data-index="${idx}">✏️ Sửa</button>
            <button class="btn-sm btn-delete" data-index="${idx}">🗑️ Xóa</button>
          </div>
        </div>
        <div class="q-item-title">${q.question}</div>
        <div class="q-item-options">
          ${q.options.map((opt, i) => `
            <span class="opt-tag ${i === q.correctIndex ? 'correct-tag' : ''}">
              ${['A', 'B', 'C', 'D'][i]}. ${opt} ${i === q.correctIndex ? '✓' : ''}
            </span>
          `).join('')}
        </div>
      `;

      // Nút sửa
      item.querySelector('.btn-edit').addEventListener('click', () => {
        this.editingQuestionIndex = idx;
        const targetQ = questions[idx];
        document.getElementById('form-question-text').value = targetQ.question;
        document.getElementById('form-opt-0').value = targetQ.options[0];
        document.getElementById('form-opt-1').value = targetQ.options[1];
        document.getElementById('form-opt-2').value = targetQ.options[2];
        document.getElementById('form-opt-3').value = targetQ.options[3];
        document.getElementById('form-explanation').value = targetQ.explanation || '';

        const radios = document.querySelectorAll('input[name="correct-option"]');
        if (radios[targetQ.correctIndex]) radios[targetQ.correctIndex].checked = true;

        document.getElementById('cancel-edit-btn').classList.remove('hidden');
        document.getElementById('form-submit-btn').textContent = '💾 Lưu câu hỏi này';

        // Cuộn tới form
        document.getElementById('question-form').scrollIntoView({ behavior: 'smooth' });
      });

      // Nút xóa
      item.querySelector('.btn-delete').addEventListener('click', () => {
        if (questions.length <= 1) {
          alert('Cần giữ lại ít nhất 1 câu hỏi để chơi trò chơi!');
          return;
        }
        if (confirm(`Bạn có chắc muốn xóa câu hỏi ${idx + 1}?`)) {
          questions.splice(idx, 1);
          this.saveCustomPack();
          this.renderStudioQuestionsList();
          this.updateStatsUI();
        }
      });

      listContainer.appendChild(item);
    });
  }
}

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  window.app = new QuizGame();
});
