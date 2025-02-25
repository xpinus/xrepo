# ip嗅探rtt时长最优解

给定众多ip,要找出最短的rtt时长, 假设最大并发为10

1. 依次轮询
2. 分组race
3. race(ips, maxTime): 超出之前的maxTime就直接结束，取消所有请求