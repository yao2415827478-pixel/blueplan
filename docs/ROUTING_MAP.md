# 布鲁计划 - 路由到页面文件映射表

> 生成时间: 2026-03-12
> 基线分支: clean-main

## 路由配置 (pages.json)

| 路由路径 | 对应文件 | 说明 |
|----------|----------|------|
| `/pages/welcome/welcome` | `src/pages/welcome/welcome.vue` | 欢迎页 |
| `/pages/survey/survey` | `src/pages/survey/survey.vue` | 评估问卷 |
| `/pages/login/login` | `src/pages/login/login.vue` | 登录页 |
| `/pages/home/home` | `src/pages/home/home.vue` | 首页 |
| `/pages/plan/plan` | `src/pages/plan/plan.vue` | 90天计划 |
| `/pages/panic/panic` | `src/pages/panic/panic.vue` | 紧急求助 |

## 已删除文件

以下重复文件已删除，保留唯一运行体系：

- ❌ `src/pages/Welcome.vue` (重复)
- ❌ `src/pages/Login.vue` (重复)
- ❌ `src/pages/Home.vue` (重复)
- ❌ `src/pages/Plan.vue` (重复)
- ❌ `src/pages/Panic.vue` (重复)
- ❌ `src/pages/Survey.vue` (重复)
- ❌ `src/pages/Payment.vue` (未使用)
- ❌ `src/pages/ProductIntro.vue` (未使用)

## 目录结构

```
src/pages/
├── welcome/
│   └── welcome.vue     ✅ 唯一入口
├── survey/
│   └── survey.vue      ✅ 唯一入口
├── login/
│   └── login.vue       ✅ 唯一入口
├── home/
│   └── home.vue        ✅ 唯一入口
├── plan/
│   └── plan.vue        ✅ 唯一入口
└── panic/
    └── panic.vue       ✅ 唯一入口
```

## 修改检查清单

- [x] 删除根目录下的大写 .vue 文件
- [x] 保留子目录下的小写 .vue 文件
- [x] pages.json 路径指向正确
- [x] 无重复页面文件

## 注意事项

1. 修改页面时，只修改 `pages/xxx/xxx.vue` 文件
2. 不要创建新的重复文件
3. 遵循 pages.json 中定义的路径规范
