# 

[可视化算法](https://visualgo.net/zh)

[代码随想录](https://www.programmercarl.com/)


## 心得

> 回溯与递归

例如：针对分级筛选，1级的受其所有项的影响，但其中带由2级的项，其选中状态又受其子类的影响，层层往下；

这时，如果想要**从下向上，更新全选状态，就应该用回溯**

而如果是设置全选，则应该是递归从上往下设置状态

https://gitee.com/dev-edu/web-algorithm