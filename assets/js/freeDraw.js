// 标志自由绘制功能实现
class FreeDraw {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('Container not found');
      return;
    }
    
    this.options = {
      lineWidth: 2,
      color: '#000000',
      backgroundColor: 'transparent',
      ...options
    };
    
    this.isDrawing = false;
    this.lastX = 0;
    this.lastY = 0;
    this.paths = [];
    this.currentPath = [];
    
    this.initCanvas();
    this.initEvents();
  }
  
  initCanvas() {
    // 创建canvas元素
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'freeDrawCanvas';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.cursor = 'crosshair';
    this.canvas.style.backgroundColor = this.options.backgroundColor;
    this.canvas.style.zIndex = '10';
    
    // 设置canvas尺寸
    const containerRect = this.container.getBoundingClientRect();
    this.canvas.width = containerRect.width;
    this.canvas.height = containerRect.height;
    
    // 添加到容器
    this.container.appendChild(this.canvas);
    
    // 获取绘图上下文
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = this.options.lineWidth;
    this.ctx.strokeStyle = this.options.color;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }
  
  initEvents() {
    // 鼠标事件
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    
    // 触摸事件（移动设备支持）
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.draw({ clientX: touch.clientX, clientY: touch.clientY });
    });
    
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
    
    // 窗口大小改变时调整canvas尺寸
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }
  
  startDrawing(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
    this.isDrawing = true;
    
    // 开始新路径
    this.currentPath = [{ x: this.lastX, y: this.lastY }];
  }
  
  draw(e) {
    if (!this.isDrawing) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    // 绘制线条
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
    
    // 更新最后位置
    this.lastX = currentX;
    this.lastY = currentY;
    
    // 记录当前路径点
    this.currentPath.push({ x: currentX, y: currentY });
  }
  
  stopDrawing() {
    if (!this.isDrawing) return;
    
    this.isDrawing = false;
    
    // 保存完成的路径
    if (this.currentPath.length > 1) {
      this.paths.push(this.currentPath);
    }
  }
  
  resizeCanvas() {
    const containerRect = this.container.getBoundingClientRect();
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // 保存当前绘制内容
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCtx.drawImage(this.canvas, 0, 0);
    
    // 调整canvas尺寸
    this.canvas.width = containerRect.width;
    this.canvas.height = containerRect.height;
    
    // 恢复绘制内容
    this.ctx.drawImage(tempCanvas, 0, 0, this.canvas.width, this.canvas.height);
  }
  
  // 设置画笔颜色
  setColor(color) {
    this.options.color = color;
    this.ctx.strokeStyle = color;
  }
  
  // 设置画笔粗细
  setLineWidth(width) {
    this.options.lineWidth = width;
    this.ctx.lineWidth = width;
  }
  
  // 清除画布
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.paths = [];
  }
  
  // 撤销上一步
  undo() {
    if (this.paths.length === 0) return;
    
    this.paths.pop();
    this.redrawAllPaths();
  }
  
  // 重绘画布上的所有路径
  redrawAllPaths() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.paths.forEach(path => {
      if (path.length < 2) return;
      
      this.ctx.beginPath();
      this.ctx.moveTo(path[0].x, path[0].y);
      
      for (let i = 1; i < path.length; i++) {
        this.ctx.lineTo(path[i].x, path[i].y);
      }
      
      this.ctx.stroke();
    });
  }
  
  // 导出绘制的图像为DataURL
exportAsDataURL(type = 'image/png', quality = 1.0) {
  return this.canvas.toDataURL(type, quality);
}

// 导出绘制的图像为SVG
exportAsSVG() {
  // 创建SVG文档
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${this.canvas.width}" height="${this.canvas.height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // 添加每条路径
  this.paths.forEach(path => {
    if (path.length < 2) return;
    
    let pathData = `M${path[0].x},${path[0].y}`;
    for (let i = 1; i < path.length; i++) {
      pathData += `L${path[i].x},${path[i].y}`;
    }
    
    svg += `
    <path d="${pathData}" fill="none" stroke="${this.options.color}" stroke-width="${this.options.lineWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  
  svg += `
</svg>`;
  
  // 创建Blob并返回URL
  const blob = new Blob([svg], {type: 'image/svg+xml'});
  return URL.createObjectURL(blob);
}
  
  // 显示/隐藏绘制层
  toggleVisibility(show) {
    this.canvas.style.display = show ? 'block' : 'none';
  }
}

// 添加成功消息样式
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .success-message {
      background-color: #d1fae5;
      color: #065f46;
      padding: 10px 20px;
      border-radius: 4px;
      position: fixed;
      top: 20px;
      right: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
})();

// 初始化自由绘制功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否有预览区域
  const previewContainer = document.querySelector('.flex-1.flex.items-center.justify-center.overflow-hidden.bg-transparent.rounded-lg.relative');
  
  if (previewContainer) {
    // 创建工具栏按钮
    const toolsContainer = document.querySelector('.flex.items-center.justify-between.mb-4');
    
    if (toolsContainer) {
      const drawToolButton = document.createElement('button');
      drawToolButton.className = 'p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500';
      drawToolButton.title = '自由绘制';
      drawToolButton.innerHTML = `
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil" class="svg-inline--fa fa-pencil fa-sm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M490.3 40.4C512.2 62.3 512.2 97.7 490.3 119.6L460.3 149.7L362.3 51.7L392.4 21.6C414.3 -0.3 449.7 -0.3 471.6 21.6L490.3 40.4ZM358.3 93.7L426.3 161.7L161.7 426.3L93.7 358.3L358.3 93.7ZM96 464C104.8 464 112 456.8 112 448C112 439.2 104.8 432 96 432C87.16 432 80 439.2 80 448C80 456.8 87.16 464 96 464Z"></path>
        </svg>
      `;
      
      // 创建颜色选择器
      const colorPicker = document.createElement('input');
      colorPicker.type = 'color';
      colorPicker.value = '#000000';
      colorPicker.className = 'w-8 h-8 p-0 border-0 rounded-md cursor-pointer';
      colorPicker.title = '选择颜色';
      
      // 创建线宽选择器
      const lineWidthInput = document.createElement('input');
      lineWidthInput.type = 'range';
      lineWidthInput.min = '1';
      lineWidthInput.max = '20';
      lineWidthInput.value = '2';
      lineWidthInput.className = 'w-24 accent-pink-500';
      lineWidthInput.title = '调整线宽';
      
      // 创建清除按钮
      const clearButton = document.createElement('button');
      clearButton.className = 'p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500';
      clearButton.title = '清除绘制';
      clearButton.innerHTML = `
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eraser" class="svg-inline--fa fa-eraser fa-sm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M497.9 445.7l-45.8-45.8c-9.5-9.5-22.8-11.9-34.1-6.6L349.3 416l-70.5-70.5 32.4-32.4c5.3-11.3 2.9-24.6-6.6-34.1L187.7 256 128 315.7 114.3 302.1l-96.6-96.6c-6-6-6-15.9 0-21.9l22.6-22.6c6-6 15.9-6 21.9 0l114.1 114.1L256 187.7l-45.8-45.8c-9.5-9.5-11.9-22.8-6.6-34.1l32.4-32.4L416 349.3c5.3 11.3 2.9 24.6-6.6 34.1l-45.8 45.8c-9.5 9.5-22.8 11.9-34.1 6.6L315.7 448l70.5-70.5 32.4 32.4c11.3 5.3 24.6 2.9 34.1-6.6l45.8-45.8c9.5-9.5 11.9-22.8 6.6-34.1l-32.4-32.4L448 315.7c5.3 11.3 2.9 24.6-6.6 34.1l-45.8 45.8c-9.5 9.5-22.8 11.9-34.1 6.6L256 471.9l-114.1-114.1L128 360.3c0 17.7 14.3 32 32 32s32-14.3 32-32l-17.7-17.7L256 349.3l70.5-70.5 17.7 17.7c7.8 7.8 20.5 7.8 28.3 0s7.8-20.5 0-28.3L349.3 256l70.5-70.5 17.7 17.7c7.8 7.8 20.5 7.8 28.3 0s7.8-20.5 0-28.3L416 140.7l-70.5-70.5 32.4-32.4c11.3-5.3 24.6-2.9 34.1 6.6l45.8 45.8c9.5 9.5 11.9 22.8 6.6 34.1l-32.4 32.4L416 162.3c-5.3 11.3-2.9 24.6 6.6 34.1l45.8 45.8c9.5 9.5 11.9 22.8 6.6 34.1l-32.4 32.4L416 288l114.1 114.1c6 6 6 15.9 0 21.9l-22.6 22.6c-6 6-15.9 6-21.9 0L497.9 445.7z"></path>
        </svg>
      `;
      
      // 添加到工具栏
      toolsContainer.appendChild(drawToolButton);
      toolsContainer.appendChild(colorPicker);
      toolsContainer.appendChild(lineWidthInput);
      toolsContainer.appendChild(clearButton);
      
      // 初始化自由绘制功能
      let freeDrawInstance = null;
      let isDrawingMode = false;
      
      // 检查预览容器是否有ID，如果没有则添加
      if (!previewContainer.id) {
        previewContainer.id = 'preview-container';
      }
      
      drawToolButton.addEventListener('click', function() {
        isDrawingMode = !isDrawingMode;
        
        if (isDrawingMode) {
          // 创建自由绘制实例
          if (!freeDrawInstance) {
            freeDrawInstance = new FreeDraw(previewContainer.id || 'preview-container', {
              color: colorPicker.value,
              lineWidth: parseInt(lineWidthInput.value)
            });
          } else {
            freeDrawInstance.toggleVisibility(true);
          }
          drawToolButton.classList.add('bg-pink-100');
          previewContainer.style.cursor = 'crosshair';
        } else {
          // 退出绘制模式
          if (freeDrawInstance) {
            freeDrawInstance.toggleVisibility(false);
          }
          drawToolButton.classList.remove('bg-pink-100');
          previewContainer.style.cursor = 'default';
        }
      });
      
      // 监听颜色变化
      colorPicker.addEventListener('input', function() {
        if (freeDrawInstance) {
          freeDrawInstance.setColor(this.value);
        }
      });
      
      // 监听线宽变化
      lineWidthInput.addEventListener('input', function() {
        if (freeDrawInstance) {
          freeDrawInstance.setLineWidth(parseInt(this.value));
        }
      });
      
      // 清除绘制
      clearButton.addEventListener('click', function() {
        if (freeDrawInstance) {
          freeDrawInstance.clear();
        }
      });
      
      // 创建SVG导出按钮
      const svgExportButton = document.createElement('button');
      svgExportButton.className = 'p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-500';
      svgExportButton.title = '导出SVG';
      svgExportButton.innerHTML = `
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-image" class="svg-inline--fa fa-file-image fa-sm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path fill="currentColor" d="M384 121.941V128H256V0h64.059c12.645 0 24.815 5.134 33.941 14.259l64.059 64.059C378.866 103.226 384 115.296 384 128V121.941zM224 136V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248c-13.2 0-24-10.8-24-24zm28.173 360.791-64.854-64.855a31.996 31.996 0 0 1-8.679-22.627V176c0-17.673 14.327-32 32-32h102.741c8.582 0 16.717 3.3 22.627 8.679l64.854 64.854c5.378 5.378 8.679 14.046 8.679 22.627V456c0 6.627-5.373 12-12 12H264c-6.627 0-12-5.373-12-12v-1.209zM304 224v76.143c0 5.898-7.055 8.618-11.071 4.592l-56.142-56.143a7.997 7.997 0 0 1-2.344-5.656V224h69.557z"></path>
        </svg>
      `;
      
      // 绑定SVG导出事件
      svgExportButton.addEventListener('click', function() {
        if (freeDrawInstance) {
          const svgUrl = freeDrawInstance.exportAsSVG();
          const link = document.createElement('a');
          link.href = svgUrl;
          link.download = 'markza-drawing.svg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(svgUrl);
        }
      });
      
      // 添加SVG导出按钮到工具栏
      toolsContainer.appendChild(svgExportButton);
    }
  }
  
  // 监听导入标志的消息
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'MARKZA_LOGO_IMPORTED') {
      // 尝试从localStorage获取导入的标志
      const importedLogo = localStorage.getItem('markza-drawn-logo');
      if (importedLogo) {
        // 查找预览区域
        const previewContainer = document.querySelector('.flex-1.flex.items-center.justify-center.overflow-hidden.bg-transparent.rounded-lg.relative');
        if (previewContainer) {
          // 移除任何现有的导入标志
          const existingImportedLogo = previewContainer.querySelector('.imported-drawn-logo');
          if (existingImportedLogo) {
            existingImportedLogo.remove();
          }
          
          // 创建新的图像元素来显示导入的标志
          const logoImg = document.createElement('img');
          logoImg.src = importedLogo;
          logoImg.className = 'imported-drawn-logo';
          logoImg.style.maxWidth = '80%';
          logoImg.style.maxHeight = '80%';
          logoImg.style.position = 'absolute';
          logoImg.style.zIndex = '5';
          logoImg.style.opacity = '0';
          logoImg.style.transition = 'opacity 0.5s ease';
          
          // 图片加载完成后显示
          logoImg.onload = function() {
            logoImg.style.opacity = '1';
          };
          
          previewContainer.appendChild(logoImg);
          
          // 显示成功消息
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = '标志已成功导入！';
          document.body.appendChild(successMessage);
          
          // 3秒后移除消息
          setTimeout(function() {
            successMessage.remove();
          }, 3000);
        }
      }
    }
  });
  
  // 页面加载时检查是否有导入的标志
  window.addEventListener('load', function() {
    const importedLogo = localStorage.getItem('markza-drawn-logo');
    if (importedLogo) {
      // 查找预览区域
      const previewContainer = document.querySelector('.flex-1.flex.items-center.justify-center.overflow-hidden.bg-transparent.rounded-lg.relative');
      if (previewContainer) {
        // 创建新的图像元素来显示导入的标志
        const logoImg = document.createElement('img');
        logoImg.src = importedLogo;
        logoImg.className = 'imported-drawn-logo';
        logoImg.style.maxWidth = '80%';
        logoImg.style.maxHeight = '80%';
        logoImg.style.position = 'absolute';
        logoImg.style.zIndex = '5';
        
        previewContainer.appendChild(logoImg);
      }
    }
  });
});