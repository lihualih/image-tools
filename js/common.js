/**
 * Image Tools - Common JavaScript Utilities
 * Shared functionality across all tool pages
 */

// ============================================
// Theme Management
// ============================================
const ThemeManager = {
  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    this.bindToggle();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon(theme);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  updateToggleIcon(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;
    toggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  },

  bindToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }
};

// ============================================
// Mobile Navigation
// ============================================
const MobileNav = {
  init() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
      });
    });
  }
};

// ============================================
// Toast Notifications
// ============================================
const Toast = {
  container: null,

  init() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    this.container.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 4000) {
    if (!this.container) this.init();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    toast.innerHTML = `
      <span style="color: var(--${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'})">${icons[type] || icons.info}</span>
      <span>${message}</span>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.remove(toast));

    this.container.appendChild(toast);

    setTimeout(() => this.remove(toast), duration);
  },

  remove(toast) {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  warning(msg) { this.show(msg, 'warning'); },
  info(msg) { this.show(msg, 'info'); }
};

// ============================================
// File Utilities
// ============================================
const FileUtil = {
  /**
   * Format bytes to human readable string
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  },

  /**
   * Get file extension
   */
  getExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  },

  /**
   * Check if file is an accepted image type
   */
  isImage(file, acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']) {
    return acceptedTypes.includes(file.type);
  },

  /**
   * Read file as Data URL
   */
  readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Load image from source
   */
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  /**
   * Download canvas as image file
   */
  downloadCanvas(canvas, filename, format = 'image/png', quality = 0.92) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL(format, quality);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Get image dimensions
   */
  getDimensions(img) {
    return {
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height
    };
  }
};

// ============================================
// Drag & Drop Handler
// ============================================
class DragDropZone {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      onFileDrop: null,
      accept: 'image/*',
      ...options
    };
    this.init();
  }

  init() {
    const input = this.element.querySelector('input[type="file"]');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.element.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // Highlight on drag
    ['dragenter', 'dragover'].forEach(eventName => {
      this.element.addEventListener(eventName, () => {
        this.element.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.element.addEventListener(eventName, () => {
        this.element.classList.remove('dragover');
      });
    });

    // Handle drop
    this.element.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFile(files[0]);
      }
    });

    // Handle input change
    if (input) {
      input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          this.handleFile(e.target.files[0]);
        }
      });
    }
  }

  handleFile(file) {
    if (!file.type.startsWith('image/')) {
      Toast.error('Please select an image file.');
      return;
    }
    if (this.options.onFileDrop) {
      this.options.onFileDrop(file);
    }
  }
}

// ============================================
// Image Processor
// ============================================
const ImageProcessor = {
  /**
   * Compress image using canvas
   */
  compress(img, options = {}) {
    const { quality = 0.8, format = 'image/jpeg', maxWidth, maxHeight } = options;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let { width, height } = FileUtil.getDimensions(img);

    // Resize if needed
    if (maxWidth && width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (maxHeight && height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL(format, quality);
  },

  /**
   * Convert image format
   */
  convert(img, format = 'image/png', quality = 0.92) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { width, height } = FileUtil.getDimensions(img);

    canvas.width = width;
    canvas.height = height;

    // For JPEG, fill white background (no transparency)
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL(format, quality);
  },

  /**
   * Resize image
   */
  resize(img, newWidth, newHeight, options = {}) {
    const { maintainAspect = true, format = 'image/png', quality = 0.92 } = options;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const original = FileUtil.getDimensions(img);

    let targetWidth = newWidth;
    let targetHeight = newHeight;

    if (maintainAspect && newWidth && newHeight) {
      const aspectRatio = original.width / original.height;
      if (newWidth / newHeight > aspectRatio) {
        targetWidth = Math.round(newHeight * aspectRatio);
      } else {
        targetHeight = Math.round(newWidth / aspectRatio);
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    return canvas.toDataURL(format, quality);
  },

  /**
   * Crop image
   */
  crop(img, cropX, cropY, cropWidth, cropHeight, outputWidth, outputHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = outputWidth || cropWidth;
    canvas.height = outputHeight || cropHeight;
    ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);

    return canvas;
  },

  /**
   * Remove background color (simple color-based removal)
   */
  removeBackground(img, options = {}) {
    const {
      tolerance = 30,
      targetColor = { r: 255, g: 255, b: 255 },
      format = 'image/png'
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { width, height } = FileUtil.getDimensions(img);

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const distance = Math.sqrt(
        Math.pow(r - targetColor.r, 2) +
        Math.pow(g - targetColor.g, 2) +
        Math.pow(b - targetColor.b, 2)
      );

      if (distance < tolerance) {
        data[i + 3] = 0; // Make transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL(format);
  },

  /**
   * Get file size from data URL
   */
  getDataURLSize(dataURL) {
    const base64 = dataURL.split(',')[1];
    return Math.round((base64.length * 3) / 4);
  }
};

// ============================================
// Comparison Slider
// ============================================
class ComparisonSlider {
  constructor(container) {
    this.container = container;
    this.isDragging = false;
    this.position = 50;
    this.init();
  }

  init() {
    const handle = this.container.querySelector('.comparison-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support
    handle.addEventListener('touchstart', (e) => {
      this.isDragging = true;
    });

    document.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      this.updatePosition(e.touches[0].clientX);
    });

    document.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  updatePosition(clientX) {
    const rect = this.container.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    this.position = position;

    const before = this.container.querySelector('.comparison-before');
    const handle = this.container.querySelector('.comparison-handle');

    if (before) before.style.width = position + '%';
    if (handle) handle.style.left = position + '%';
  }
}

// ============================================
// URL Utilities
// ============================================
const URLUtil = {
  /**
   * Data URL to Blob
   */
  dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },

  /**
   * Create object URL from canvas
   */
  canvasToObjectURL(canvas, format = 'image/png', quality = 0.92) {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, format, quality);
    });
  }
};

// ============================================
// Init on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  MobileNav.init();
});
