## 问题描述

Windows 11 在本地（离线）账户上登录微软账户之后，重启发现死活登录不进系统，没有密码输入框，只有登录两个字，点击之后没反应。其他没有链接到微软账户的离线账户可以正常登录。

## 搜索到的方法

解决问题的前半个多小时都浪费在重蹈前人之路上了，为此还用了屎CSDN的小程序，最后一点用都没有。

网上的前人解决方法主要有：

1. 安全模式 netsh winsocks reset

2. 换个WiFi

3. PIN码啥的乱七八糟的方法

4. 远程桌面连接到目标用户上

5. 重装系统

以上除了第4、5个不方便试以外 对我全部无效。

## 思路打开

已知该问题与目标账户链接到的微软账户有关，因此必须unlink掉微软账户。

且在设置中可以看到目标账户的邮箱地址，考虑注册表中可能存在有用的信息。

在`regedit`尝试搜索了很多关键词（邮箱、用户名）之后，尝试删除部分注册表项，重启。

一开始是用普通的`Administrator`权限打开的`regedit`，发现对很多项都无法进行操作，所以去GitHub下载了 [NSudo](https://github.com/M2TeamArchived/NSudo) 提权。

提升到 `TrustedInstaller` 权限之后，意外的发现了被隐藏的注册表项

发现在 `HKEY_LOCAL_MACHINE\SAM\SAM\Domains\Account\Users\` 目录下存放有用户信息，其中有一个`Names`目录储存了账户与十六进制ID的对应关系。

找到 `HKEY_LOCAL_MACHINE\SAM\SAM\Domains\Account\Users\Names\{UserName}` 中的数据（例如我这里是`0x3e8`）

转到 `HKEY_LOCAL_MACHINE\SAM\SAM\Domains\Account\Users\000003E8` 发现其中有许多离线账户没有的注册项，于是把离线账户没有的注册项全突突了，只留下下列项

- `F`
- `ForcePasswordReset`
- `SupplementalCredentials`
- `V`
- `GivenName` (可能没有)
- `Surname` (可能没有)

删除掉不需要的项目（尤其是 `Internet` 开头的那一堆）之后，重启，密码框出来了！

然后发现密码出了问题，我原来设置的密码无法登入，换了个用户进去修改了一下目标用户的密码就能进系统了

Well done!

## 副作用

在成功登入系统后，尝试启动Netch软件挂代理，启动代理时提示 tun2socks start failed

查询Netch官方仓库的issues发现开发者提供的解决方法——重置网络，成功解决

- 尚无法确定此副作用与删除注册表操作的联系

## 问题原因

无法确定
