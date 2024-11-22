const path = require('path');

// 读取apps和packages目录下所有的文件夹

const apps = require('fs')
    .readdirSync(path.resolve(__dirname, 'apps'))
    .filter((f) => f !== 'ui');

const packages = require('fs')
    .readdirSync(path.resolve(__dirname, 'packages'))
    .filter((f) => f !== 'ui')
    .map((f) => `@xrepo/${f}`);

const scopes = ['xrepo', ...apps, ...packages];

module.exports = {
    types: [
        {
            value: ':sparkles: feat',
            name: '✨ feat:     新功能',
        },
        {
            value: ':bug: fix',
            name: '🐛 fix:      修复 bug',
        },
        {
            value: ':memo: docs',
            name: '📝  docs:     文档变更',
        },
        {
            value: ':lipstick: style',
            name: '💄 style:    代码样式美化',
        },
        {
            value: ':hammer: refactor',
            name: '🔨  refactor: 重构',
        },
        {
            value: ':zap: perf',
            name: '⚡️ perf:     性能优化',
        },
        {
            value: ':white_check_mark: test',
            name: '✅ test:     测试',
        },
        {
            value: ':rewind: revert',
            name: '⏪ revert:   回退',
        },
        {
            value: ':twisted_rightwards_arrows: revert',
            name: '🔀 merge:   分支合并',
        },
        {
            value: ':package: build',
            name: '📦️ build:    打包',
        },
        {
            value: ':wrench: chore',
            name: '🔧 chore:    构建/工程依赖/工具',
        },
        {
            value: ':tada: init',
            name: '🎉 init:     初始化',
        },
    ],
    messages: {
        type: '选择一种你的提交类型:',
        customScope: '表示该变更的范围:',
        subject: '短说明:\n',
        body: '长说明，使用"|"换行(可选)：\n',
        breaking: '非兼容性说明 (可选):\n',
        footer: '关联关闭的issue，例如：#31, #34(可选):\n',
        confirmCommit: '确定提交说明? yes/no',
    },
    scopes,
    allowCustomScopes: true,
    allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
    skipQuestions: ['footer'],
    subjectLimit: 72,
};
