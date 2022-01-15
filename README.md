# TypeScript raster 软件渲染器

**仓库地址**： https://github.com/Jecced/raster

# 如何运行？

- 安装nodejs环境
- 安装typescript
- 安装yarn

在项目根目录执行：

```shell
yarn
yarn start
```

成功运行完毕后网页访问：http://localhost:9000

默认会访问 **Scene12 **场景

# 如何修改预览场景

修改**index.ts**

```typescript
    const scene = await Scene12.creat(width, height);
```

**注意**：随着新增的内容推进，可能会是Scene13、Scene14...，所以直接搜索可能会搜索不到

# 软件渲染器的初衷

> 帮助自己学习理解3d画面如何出现在画面当中的
>
> 知道矩阵和向量之间的运算和关系，各个矩阵之间的意义

## 由来

在刚刚从2d转3d的时候会对很多【参数，操作】陌生，不知道是做什么的，也不知道其中的原理

于是开始看各种书籍和视频来恶补知识

好记性不如烂笔头，烂笔头不如自己来亲自实现一个

于是这个仓库诞生了

## 参考资料

LearnOpenGL：

https://learnopengl-cn.github.io/

闫令琪的Games101：

https://www.bilibili.com/video/BV1X7411F744?seid=3178513072131573492

线性代数的本质：

https://www.bilibili.com/video/BV1ys411472E

乐府软件渲染器：

https://forum.cocos.org/t/topic/99545

《计算机图形学》第二版》

《Fundamentals of Computer Graphics(4th Ed)》

《细说图形学渲染管线》

《GPU编程与CG语言之阳春白雪下里巴人》



# 目前实现效果

## 解释

**渲染出来的三个画面**

1. 正常渲染的画面
2. 深度信息
3. 三角形信息

## Scene01

> 绘制一个基础三角形
>
> 使用顶点色
>
> 片元着色器使用顶点色，使用重心坐标差值获得差值后的颜色

![image-20220115150643142](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151506220.png)

## Scene02

>绘制一个立方体
>
>使用顶点色
>
>使用摄像机透视投影
>
>颜色规律，根据模型坐标，颜色空间RGB分量从0~1

![image-20220115150707728](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151507812.png)

## Scene03

> 绘制一个立方体
>
> 顶点着色器会随着时间推移，围绕y轴旋转

![QQ20220115-151054-HD](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151511846.gif)

## Scene04

> 新增绘制一个floor地板层
>
> 用于测试修复透视变形拉伸问题

![image-20220115151251706](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151512737.png)

## Scene05

> 新增obj模型解析
>
> 将场景中新增一个人物模型

![image-20220115151400778](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151514841.png)

## Scene06

> 实现经典光照模型

![image-20220115151507665](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151515695.png)


![image-20220115151507665](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151521432.gif)

## Scene07

> 读取多个obj模型
>
> 使用不同的光照参数

![image-20220115151802916](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151518947.png)



![202201151523266](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151523266.gif)

## Scene08

> 新增sphere几何体
>
> 原理：正二十面体细分法
>
> 上方：没有细分，正20面体
>
> 中间：细分1次
>
> 下方：细分2次

![image-20220115152721652](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151527730.png)

## Scene09

> 新增背面剔除功能
>
> 左图：片元着色器使用UV滚动
>
> 右图：顶点着色器使用绕Y轴旋转
>
> **注意：**目前球体UV计算没有修复边缘拉伸问题，所以右图有Z字穿帮

![image-20220115152748628](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151527698.png)

![QQ20220115-154019](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151540090.gif)

##  Scene10

> 新增法线贴图

![image-20220115152817443](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151528512.png)

![QQ20220115-152854](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151529033.gif)

## Scene11

> 使用镜面高光贴图

![image-20220115153058378](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151530438.png)

![QQ20220115-153131](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151531353.gif)

## Scene12

> TextureCube
>
> 反射、折射

![image-20220115144424952](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151444015.png)



# 广告

![IMG_9232](https://raw.githubusercontent.com/Jecced/image/master/typora/202201151604733.JPG)

欢迎加入QQ群：897331800 一起交流

目前刚刚开始接触3d、图形方向的学习，欢迎一起学习和交流