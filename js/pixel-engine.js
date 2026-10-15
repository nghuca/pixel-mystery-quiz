/**
 * Pixel Canvas Engine
 * Quản lý lưới pixel, hiệu ứng mở màu (pop/glow), và tự động pixel hóa ảnh từ người dùng
 */
class PixelEngine {
  constructor(canvasId = 'pixel-canvas') {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.gridWidth = 16;
    this.gridHeight = 16;
    this.pixels = [];
    this.animatingPixels = new Map(); // Lưu trữ các pixel đang có hiệu ứng pop
    this.animationId = null;

    if (this.canvas) {
      this.resizeCanvas();
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.render();
      });
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const size = Math.min(rect.width || 360, rect.height || 360);
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = false;
    }
  }

  // Nạp dữ liệu pixel tranh
  loadPixelArt(pixelArtData) {
    this.gridWidth = pixelArtData.width || 16;
    this.gridHeight = pixelArtData.height || 16;
    // Sao chép sâu mảng pixel
    this.pixels = pixelArtData.pixels.map(p => ({
      x: p.x,
      y: p.y,
      color: p.color,
      revealed: false
    }));
    this.animatingPixels.clear();
    this.resizeCanvas();
    this.render();
  }

  // Reset toàn bộ pixel về trạng thái chưa mở
  reset() {
    this.pixels.forEach(p => (p.revealed = false));
    this.animatingPixels.clear();
    this.render();
  }

  // Mở tất cả pixel (khi chiến thắng hoặc xem trước)
  revealAll() {
    this.pixels.forEach(p => (p.revealed = true));
    this.render();
  }

  // Thống kê tiến độ mở
  getStats() {
    // Chỉ tính các pixel có màu thực sự (bỏ qua pixel hoàn toàn trong suốt)
    const activePixels = this.pixels.filter(p => p.color !== 'transparent' && !p.color.endsWith(', 0)'));
    const total = activePixels.length || this.pixels.length;
    const revealed = activePixels.filter(p => p.revealed).length;
    const percent = total > 0 ? Math.round((revealed / total) * 100) : 0;
    return { total, revealed, percent };
  }

  // Mở một số lượng pixel ngẫu nhiên khi người chơi trả lời đúng
  revealBatch(count, isLastQuestion = false) {
    // Lọc danh sách pixel chưa mở
    const unrevealed = this.pixels.filter(p => !p.revealed);
    if (unrevealed.length === 0) return 0;

    let targetCount = count;
    if (isLastQuestion || targetCount >= unrevealed.length) {
      targetCount = unrevealed.length;
    }

    // Xáo trộn ngẫu nhiên để chọn các pixel sẽ mở
    const shuffled = [...unrevealed].sort(() => Math.random() - 0.5);
    const toReveal = shuffled.slice(0, targetCount);

    const startTime = performance.now();
    toReveal.forEach(p => {
      p.revealed = true;
      this.animatingPixels.set(`${p.x}_${p.y}`, {
        startTime,
        duration: 350,
        pixel: p
      });
    });

    this.startAnimationLoop();
    return toReveal.length;
  }

  startAnimationLoop() {
    if (this.animationId) return;

    const loop = (now) => {
      let hasActiveAnimation = false;

      this.animatingPixels.forEach((anim, key) => {
        const elapsed = now - anim.startTime;
        if (elapsed >= anim.duration) {
          this.animatingPixels.delete(key);
        } else {
          hasActiveAnimation = true;
        }
      });

      this.render(now);

      if (hasActiveAnimation) {
        this.animationId = requestAnimationFrame(loop);
      } else {
        this.animationId = null;
        this.render(); // Vẽ lại lần cuối sắc nét
      }
    };

    this.animationId = requestAnimationFrame(loop);
  }

  // Vẽ lưới pixel lên canvas
  render(now = performance.now()) {
    if (!this.ctx || !this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    const cellW = width / this.gridWidth;
    const cellH = height / this.gridHeight;

    // Nền tối phong cách Arcade
    this.ctx.fillStyle = '#0f172a';
    this.ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < this.pixels.length; i++) {
      const p = this.pixels[i];
      const posX = p.x * cellW;
      const posY = p.y * cellH;

      if (p.revealed) {
        // Đã mở: tô màu thật
        if (p.color !== 'transparent') {
          const anim = this.animatingPixels.get(`${p.x}_${p.y}`);
          if (anim) {
            // Hiệu ứng nảy (pop scale + viền sáng glow)
            const progress = (now - anim.startTime) / anim.duration;
            const scale = 1 + Math.sin(progress * Math.PI) * 0.35;
            const centerX = posX + cellW / 2;
            const centerY = posY + cellH / 2;

            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.scale(scale, scale);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-cellW / 2, -cellH / 2, cellW, cellH);

            // Viền ánh sáng lóe lên khi mới mở
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = Math.max(2, cellW * 0.15);
            this.ctx.strokeRect(-cellW / 2, -cellH / 2, cellW, cellH);
            this.ctx.restore();
          } else {
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(posX, posY, cellW, cellH);
          }
        }
      } else {
        // Chưa mở: hiển thị ô vuông tối bí ẩn với viền tinh tế
        this.ctx.fillStyle = (p.x + p.y) % 2 === 0 ? '#1e293b' : '#172033';
        this.ctx.fillRect(posX, posY, cellW, cellH);

        // Viền lưới phân cách ô
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(posX, posY, cellW, cellH);
      }
    }
  }

  // Tự động pixel hóa một hình ảnh bất kỳ tải lên từ máy tính
  static async pixelateFromImage(imgElement, targetResolution = 16) {
    return new Promise((resolve) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = targetResolution;
      offCanvas.height = targetResolution;
      const offCtx = offCanvas.getContext('2d');
      offCtx.imageSmoothingEnabled = true;

      // Vẽ co nhỏ ảnh vào lưới targetResolution x targetResolution
      offCtx.drawImage(imgElement, 0, 0, targetResolution, targetResolution);

      const imgData = offCtx.getImageData(0, 0, targetResolution, targetResolution).data;
      const pixels = [];

      for (let y = 0; y < targetResolution; y++) {
        for (let x = 0; x < targetResolution; x++) {
          const idx = (y * targetResolution + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3] / 255;

          const color = a < 0.1 ? 'transparent' : `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
          pixels.push({ x, y, color, revealed: false });
        }
      }

      resolve({
        width: targetResolution,
        height: targetResolution,
        pixels
      });
    });
  }

  // Xuất ảnh pixel thành DataURL để người dùng tải về máy
  exportDataURL() {
    if (!this.canvas) return null;
    // Tạo canvas xuất nét cao
    const exportCanvas = document.createElement('canvas');
    const scale = 32; // Mỗi pixel phóng to thành 32px để xem rõ
    exportCanvas.width = this.gridWidth * scale;
    exportCanvas.height = this.gridHeight * scale;
    const ctx = exportCanvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    this.pixels.forEach(p => {
      if (p.color !== 'transparent') {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x * scale, p.y * scale, scale, scale);
      }
    });

    return exportCanvas.toDataURL('image/png');
  }
}

window.pixelEngine = new PixelEngine();
