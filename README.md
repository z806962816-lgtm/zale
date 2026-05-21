# ZALE - 高端轮毂电商平台

## 项目介绍

ZALE 是一个现代化的轮毂销售电商网站，采用深色调高级设计风格，融合速度激情的视觉元素。网站支持全车系轮毂适配、智能筛选、在线购物和广告投放。

## 核心特性

### 🎨 设计特点
- **深色��高级美学**：采用深蓝/黑色主题配合橙色烈焰配色
- **激情动感**：渐变动画、光影效果营造速度感
- **响应式设计**：完美适配各类设备

### 🛒 电商功能
- **智能筛选系统**
  - 车型系列：轿车、SUV、越野、跑车
  - 轮毂尺寸：17-21英寸
  - 价格范围：¥1000-¥5000+
  - 风格分类：运动、豪华、经典、现代

- **购物车管理**
  - 实时添加/删除
  - 数量管理
  - 自动计价
  - LocalStorage 持久化

- **产品展示**
  - 12款示例产品
  - 实时价格对比
  - 优惠信息展示

### 📢 广告系统
- 3个独立广告位置
- 自定义广告内容
- 醒目的广告标签

## 技术栈

- **HTML5**：语义化标签
- **CSS3**：Flexbox、Grid、渐变、动画
- **Vanilla JavaScript**：无框架依赖
- **LocalStorage**：购物车数据持久化

## 项目结构

```
zale/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
└── README.md          # 项目文档
```

## 快速开始

1. **克隆仓库**
```bash
git clone https://github.com/z806962816-lgtm/zale.git
cd zale
```

2. **打开网站**
   - 直接在浏览器打开 `index.html`
   - 或使用本地服务器：
   ```bash
   python -m http.server 8000
   # 访问 http://localhost:8000
   ```

## 功能使用说明

### 筛选产品
1. 选择所需的车型系列
2. 选择轮毂尺寸
3. 选择价格范围
4. 选择风格偏好
5. 页面自动更新匹配结果

### 购物流程
1. 点击产品卡片下的 "加入购物车" 按钮
2. 点击右上角购物车图标查看购物车
3. 查看订单总额（包含运费计算）
4. 点击 "结算" 完成购买

### 自定义内容

**修改广告内容**：编辑 `index.html` 中的广告区块
```html
<section class="ad-banner ad-banner-1">
    <div class="ad-content">
        <span class="ad-label">你的标签</span>
        <p>你的广告文字</p>
    </div>
</section>
```

**添加新产品**：编辑 `script.js` 中的 `products` 数组
```javascript
const products = [
    {
        id: 13,
        name: '新款轮毂',
        series: 'sedan',
        size: '18',
        price: 1999,
        originalPrice: 2699,
        style: 'modern',
        specs: '18英寸 · 轿车系列 · 现代风格'
    }
    // ...
];
```

## 配色方案

| 用途 | 颜色 | HEX值 |
|------|------|-------|
| 主背景 | 深蓝黑 | #0a0e27 |
| 副背景 | 暗蓝 | #1a1f3a |
| 强调色 | 烈焰橙 | #ff6b35 |
| 强调浅色 | 亮橙 | #ff8c42 |
| 文字浅色 | 白灰 | #e0e6ed |
| 文字暗色 | 灰色 | #9ca3af |

## 部署建议

### GitHub Pages
1. Push 代码到 GitHub
2. 进入仓库 Settings
3. 找到 Pages 部分
4. 选择 Branch: main
5. 自动部署完成

### 其他静态托管
- Netlify
- Vercel
- GitLab Pages
- Firebase Hosting

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 扩展功能建议

- [ ] 用户注册/登录系统
- [ ] 数据库集成（Node.js + MongoDB）
- [ ] 支付集成（支付宝、微信）
- [ ] 订单管理系统
- [ ] 用户评价/评论
- [ ] 推荐算法
- [ ] 库存管理
- [ ] 后台管理面板

## 许可证

MIT License - 可自由使用、修改和商业化

## 联系方式

- GitHub: [@z806962816-lgtm](https://github.com/z806962816-lgtm)
- Email: support@zale.com

---

**ZALE - 用轮毂诠释速度与激情！** 🏎️💨