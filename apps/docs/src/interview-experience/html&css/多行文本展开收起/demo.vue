<template>
    <div class="expand-block">
        <input
            type="checkbox"
            id="exp"
            style="display: none"
        />
        <div class="expand-text">
            <label
                class="expand-btn"
                for="exp"
                >展开</label
            >
            <span
                >VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown
                编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。</span
            >
        </div>
    </div>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.expand-block {
    display: flex;
}

.expand-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.expand-text::before {
    content: '';
    float: right;
    height: 100%;
    margin-bottom: -24px; /* line-height */
}

.expand-btn {
    color: transparent;
    float: right;
    position: relative;
    clear: both;
}

.expand-btn::before {
    content: '展开';
    color: #409eff;
    cursor: pointer;
    position: absolute;
}

.expand-block input:checked + .expand-text {
    -webkit-line-clamp: 999; /* 一个随意较大的值 */
}

.expand-block input:checked + .expand-text .expand-btn::before {
    content: '收起';
}
</style>
