anyrtc Talk Web SDK 可实现公网实时语音对讲、实时广播功能。详情请[参考官网](https://anyrtc.io/solution/education)。

ArTalk WebSDK 提供的以下 API 接口和回调:

## 登录登出流程

| API                                 | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [createInstance](https://docs.anyrtc.io/cn/Audio/api-ref/modules/anyTalk#createinstance)  | 创建并返回一个 [TalkClient](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkClient) 实例。|
| [login](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkClient#login)  | 用户登录 anyrtc Talk 系统。|
| [logout](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkClient#logout)  | 退出登录，退出后自动断开连接和销毁回调监听。|

| 事件回调                               | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [ConnectionStateChanged](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkClientEvents#connectionstatechanged)  | SDK 与 anyrtc Talk 系统的连接状态发生了改变时触发该回调。|

## 对讲频道相关
| API                                 | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [createChannel](https://docs.anyrtc.io/cn/Audio/api-ref/classes/talkClient#createchannel)  | 创建并返回一个 [TalkChannel](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel) 实例。|
| [join](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#join)  | 加入频道。加入频道成功后可发起对讲等操作、收到该频道对讲语音等通知。|
| [leave](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#leave)  | 离开频道。不再接收频道对讲语音等。|
| [setLevel](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#setlevel)  | 设置用户对讲级别。注：只当前频道有效。|
| [getLevel](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#getlevel)  | 获取用户对讲级别。注：只当前频道有效。|
| [pushToTalk](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#pushtotalk)  | 申请对讲（简称上麦)。|
| [stopPushToTalk](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#stoppushtotalk)  | 取消对讲（简称下麦）。|
| [breakTalk](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#breaktalk)  | 打断对讲。|
| [muteAllRemoteAudio](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#muteallremoteaudio)  | 关闭/打开所有远程用户的音频。|
| [setPullAudioQuality](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#setpullaudioquality)  | 设置音频拉流质量。|
| [setPushAudioQuality](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkChannel#setpushaudioquality)  | 设置音频推流质量。|

| 事件回调                               | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [UserIsTalkOn](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkChannelEvents#useristalkon)  | 远端用户用户上麦回调。|
| [UserIsTalkOff](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkChannelEvents#usersstalkoff)  | 远端用户用户下麦回调。|
| [UserIsStreamOn](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkChannelEvents#userisstreamon)  | 频道广播开始回调。|
| [UserIsStreamOff](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkChannelEvents#userisstreamoff)  | 频道广播结束回调。|
| [BreakTalk](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkChannelEvents#breaktalk)  | 上麦被打断。|

## 更新 Token
| API                                 | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [renewToken](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkClient#renewtoken)  | 更新当前 Token。|  

| 事件回调                                 | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [TokenWillExpired](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkClientEvents#tokenwillexpired)  | Token 即将过期触发该回调。|   
| [TokenDidExpired](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkEvents.talkClientEvents#tokendidexpired)  | Token 过期时触发该回调。|    
     


## 日志设置与版本查询
| 属性                               | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [logFilter](https://docs.anyrtc.io/cn/Talk/api-ref/interfaces/talkParameters#logfilter)  | 设置 SDK 的日志输出等级。 |  
| [VERSION](https://docs.anyrtc.io/cn/Talk/api-ref/modules/anyTalk#version)  | anyrtc Talk SDK 的当前版本信息。| 


## 定制方法
| API                                 | 描述                                |
| :---------------------------------- | :---------------------------------- |
| [setParameters](https://docs.anyrtc.io/cn/Talk/api-ref/classes/talkClient#setparameters)  | 配置 SDK 提供技术预览或特别定制功能。| 