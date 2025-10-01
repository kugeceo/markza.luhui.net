// 动态添加标志自由绘制按钮到布局右侧
(function() {
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 尝试查找布局相关的容器
    let layoutContainer = null;
    
    // 查找可能与布局相关的元素选择器
    const layoutSelectors = [
      // 尝试找到预览区域和工具栏
      '.flex-1.flex.items-center.justify-center.overflow-hidden.bg-transparent.rounded-lg.relative',
      // 查找可能的布局容器
      '[class*="layout"][class*="right"]',
      '[class*="右侧"]',
      // 检查工具容器
      '.flex.items-center.justify-between.mb-4',
      // 备用选择器
      '.container',
      '#root',
      'main',
      'body > div:first-of-type'
    ];
    
    // 遍历选择器查找合适的容器
    for (let selector of layoutSelectors) {
      layoutContainer = document.querySelector(selector);
      if (layoutContainer) break;
    }
    
    // 如果找到了合适的容器
    if (layoutContainer) {
      // 创建自由绘制按钮
      const drawButton = document.createElement('button');
      drawButton.id = 'freedraw-button';
      drawButton.textContent = '自由绘制标志';
      
      // 设置按钮样式 - 适合在布局右侧显示
      drawButton.style.backgroundColor = '#3b82f6';
      drawButton.style.color = 'white';
      drawButton.style.border = 'none';
      drawButton.style.padding = '8px 16px';
      drawButton.style.borderRadius = '6px';
      drawButton.style.cursor = 'pointer';
      drawButton.style.fontSize = '14px';
      drawButton.style.fontWeight = '500';
      drawButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      drawButton.style.transition = 'all 0.2s ease';
      drawButton.style.display = 'inline-flex';
      drawButton.style.alignItems = 'center';
      drawButton.style.gap = '6px';
      drawButton.style.marginLeft = 'auto';
      
      // 添加图标
      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('width', '16');
      icon.setAttribute('height', '16');
      icon.setAttribute('viewBox', '0 0 24 24');
      icon.setAttribute('fill', 'none');
      icon.setAttribute('stroke', 'currentColor');
      icon.setAttribute('stroke-width', '2');
      
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M12 19l7-7 3 3-7 7-3-3z');
      
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z');
      
      icon.appendChild(path1);
      icon.appendChild(path2);
      drawButton.appendChild(icon);
      
      // 添加悬停效果
      drawButton.addEventListener('mouseover', function() {
        drawButton.style.backgroundColor = '#2563eb';
        drawButton.style.transform = 'translateY(-1px)';
        drawButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      });
      
      drawButton.addEventListener('mouseout', function() {
        drawButton.style.backgroundColor = '#3b82f6';
        drawButton.style.transform = 'translateY(0)';
        drawButton.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      });
      
      // 添加点击事件以打开自由绘制窗口
      drawButton.addEventListener('click', function() {
        // 打开freedraw-demo.html窗口
        window.open('/freedraw-demo.html', '_blank', 'width=800,height=600,top=100,left=100');
      });
      
      // 根据容器类型决定如何添加按钮
      const isFlexContainer = getComputedStyle(layoutContainer).display.includes('flex');
      
      if (isFlexContainer) {
        // 如果是flex容器，直接添加按钮
        layoutContainer.appendChild(drawButton);
      } else {
        // 如果不是flex容器，创建一个容器并设置绝对定位
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'freedraw-button-container';
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.right = '20px';
        buttonContainer.style.top = '50%';
        buttonContainer.style.transform = 'translateY(-50%)';
        buttonContainer.style.zIndex = '100';
        
        buttonContainer.appendChild(drawButton);
        layoutContainer.appendChild(buttonContainer);
        
        // 确保容器有相对定位
        if (getComputedStyle(layoutContainer).position === 'static') {
          layoutContainer.style.position = 'relative';
        }
      }
      
      console.log('自由绘制按钮已成功添加到布局右侧');
    } else {
      console.log('未找到合适的布局容器来添加自由绘制按钮');
    }
  });
})();