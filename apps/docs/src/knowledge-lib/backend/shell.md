# shell

## window上运行
- 配置环境，利用git的bash执行,配置vscode插件code runner
```shell
"code-runner.executorMap": {
  "shellscript": "  & \"D:\\Program Files\\Git\\bin\\bash.exe\"",
}
```
注意，不要再sh头部指定编译器，否则会覆盖code runner配置

- 借助wsl，安装window的wsl和并在商店中安装Ubuntu 并打开
借助wsl命令可以直接执行
```shell
 wsl sh /mnt/host/d/project/new-te-se-ku/scripts/lessc.sh
```

## 基础

### 变量
直接定义，注意=前后不要为了美观添加多余空格，shell中空格一般用来分割参数或者命令符

使用时只需在变量名前加上$，或者${}, 花括号用来明确边界，可以在字符串拼接式使用，必须用“”包裹，‘’只会当作字符打印

`readyonly var`   将var标记为只读变量，重新赋值会报错
`unset var`   删除变量

特殊变量：`$PATH`表示环境变量
例如 `$0` 表示脚本的名称，`$1`, `$2`, 等表示脚本的参数。
`$#`表示传递给脚本的参数数量，`$?` 表示上一个命令的退出状态等

### 字符串

字符串长度${#string}
字符串分割${string:1:4}  获取string从0开始第1到第4的字符
```shell
查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

### 数组
用括号来表示数组，数组元素用"空格"符号分割开
```shell
array_name=(value0 value1 value2 value3)
array_name[0]=value0
valuen=${array_name[n]}
echo ${array_name[@]}   # 获取数组所有内容
```

### 运算符
- 原生bash不支持简单的数学运算，expr 是一款表达式计算工具，使用它能完成表达式的求值操作
```shell
val=$(expr 2 + 2)
val=$((2 + 3))
echo "两数之和为 : $val"
```
- 关系运算 ` $a -eq $b `
  - -eq  相等
  - -ne 不相等
  - -gt 大于
  - -lt 小于
  - -ge  >=
  - -le <=
- 布尔运算符
  - != 不等于
  - == 等于
  - -o 或 ||
  - -a 和 &&
- 字符串运算符
  - = 两个字符串相等
  - != 不相等
  - -z 是否为空
  - -n 是否不为空

### 流程控制
```shell
#
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi

#
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

#
while condition
do
    command
done

#
until condition
do
    command
done

```

### 其它
**将./css文件夹下所有less编译成同名css**
```shell
find ./css -name "*.less" | while read file; do
   lessc "$file" "${file%.less}.css"
done
```
- `|`运算符

管道符号，是unix一个很强大的功能,符号为一条竖线:"|"。用法:
command 1 | command 2
他的功能是把第一个命令command 1执行的结果作为command2的输入传给command 2

- read

读取输入的一行数据，在这里将其命名为file
参数扩展语法：
将file变量的值中的".less"部分替换为".css"，从而生成对应的CSS文件名。具体来说，"{file%.less}"表示删除file变量值结尾的".less"分，然后再加上".css"后缀，最终得到对应的CSS文件名

#### `$`符调用变量就是一种参数扩展

- 间接参数扩展:${!var}   
```shell
b=10
a=b
echo $a    #b
echo ${!a}  #10
```
- 大小写修改：

```shell
echo ${a^}     # 替换变量a中的第一个小写字母为大写
echo ${a^^}  # 替换变量a中的所有小写字母为大写
echo ${b,}     # 替换变量b中的第一个大写字母为小写
echo ${b,,}    # 替换变量b中的所有大写字母为小写
```

- 变量名扩展

${!a*} 列出所有以a开头的变量名

- 掐头去尾

```shell
echo${a#*：}  # 对a的值以:为分隔符进行最短掐头
echo${a##*：}  # 对a的值以:为分隔符进行最长掐头
echo ${a%:*}   # 对a的值以:为分隔符进行最短去尾
echo ${a%%:*}  # 对a的值以:为分隔符进行最长去尾
```

- 替换

```shell
echo ${a/is/mm}  #最短替换，用mm替换匹配的第一个is
echo ${a//is/mm}  #最长替换，用mm替换所有匹配的is
```






