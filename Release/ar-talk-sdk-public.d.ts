/**
 * `ArTalk` 是 Talk SDK 的导出模块。
 *
 * 使用 `<script>` 标签引入 SDK 时，产生名为 `ArTalk` 的全局变量，该变量含有该模块的所有成员。
 *
 * ### \<script\> 标签导入
 *
 * ```html
 * <script src="https://unpkg.com/ar-talk-sdk"></script>
 * ```
 *
 * ### ES6 导入
 *
 * ```js
 * import ArTalk from 'ar-talk-sdk'
 * ```
 *
 * ### CommonJs 导入
 *
 * ```js
 * const ArTalk = require('ar-talk-sdk');
 * ```
 */
declare namespace ArTalk {
    /**
     * ❗️ 输出 ERROR 级别的日志信息。
     */
    const LOG_FILTER_ERROR: LogFilterType;
    /**
     * 📝 输出 ERROR、WARNING 和 INFO 级别的日志信息。 我们推荐你将日志级别设为该等级。
     */
    const LOG_FILTER_INFO: LogFilterType;
    /**
     * 🚫 不输出日志信息。
     */
    const LOG_FILTER_OFF: LogFilterType;
    /**
     * ⚠️ 输出 ERROR 和 WARNING 级别的日志信息。
     */
    const LOG_FILTER_WARNING: LogFilterType;
    /**
     * SDK 的版本号。
     */
    const VERSION: string;
    /**
     * 创建对讲客户端(实例)
     *
     * - 支持创建多个实例。
     * - 所有接口函数都是异步调用。
     * @example
     *
     * ```js
     * import ArTalk from 'ar-talk-sdk';
     * // Pass your App ID and private Parameters.
     * const client = ArTalk.createInstance('<YOUR_APPID>', {
     *   logFilter: ArTalk.LOG_FILTER_OFF
     *   ...
     * });
     * ```
     *
     * @param {string} appId  传入项目的 App ID。ASCII 字符，字符串长度为 32 可见字符。
     * @param {ITalkParameters} [params]  对象的配置参数。
     * @returns {ArTalkClient}
     */
    function createInstance(appId: string, params?: ITalkParameters): ArTalkClient;
}
export { ArTalk }
export default ArTalk;

/**
 * 对讲频道（组）实例
 *
 * 通过 `ArTalkClient.createChannel` 创建的对象实例。
 *
 * @example
 * ```js
 * const talkChannel = talkClient.createChannel('<YOUR_CHANNEL_ID>');
 * ```
 *
 * 对讲频道可以进行以下操作：
 *   - 加入频道 {@link ArTalkChannel.join}
 *   - 退出频道 {@link ArTalkChannel.leave}
 *   - 设置对讲级别 {@link ArTalkChannel.setLevel}
 *   - 获取对讲级别 {@link ArTalkChannel.getLevel}
 *   - 申请对讲（简称上麦） {@link ArTalkChannel.pushToTalk}
 *   - 取消对讲（简称下麦） {@link ArTalkChannel.stopPushToTalk}
 *   - 打断对讲 {@link ArTalkChannel.breakTalk}
 *   - 关闭所有远程用户的音频 {@link ArTalkChannel.muteAllRemoteAudio}
 *   - 设置频道的音频拉流质量 {@link ArTalkChannel.setPullAudioQuality}
 *   - 设置频道的音频推流质量 {@link ArTalkChannel.setPushAudioQuality}
 *
 * @class ArTalkChannel
 * @extends {EventEmitter<ArTalkEvents.TalkChannelEvents>}
 */
export declare class ArTalkChannel extends EventEmitter<ArTalkEvents.TalkChannelEvents> {
    /* Excluded from this release type: client */
    /* Excluded from this release type: memberCount */
    /**
     * 获取该频道实例的 ID。
     *
     * @type {string}
     */
    channelId: string;
    /* Excluded from this release type: bindChannelEvents */
    /* Excluded from this release type: _subPc */
    /* Excluded from this release type: _audioPlayer */
    /* Excluded from this release type: _muted */
    /**
     *
     *
     * @readonly
     */
    get AudioMuted(): boolean;
    /* Excluded from this release type: _streamId */
    /* Excluded from this release type: _inTalk */
    /* Excluded from this release type: _talkId */
    /* Excluded from this release type: _talkLevel */
    /* Excluded from this release type: _pushAudioQuality */
    /* Excluded from this release type: _pullAudioQuality */
    /**
     * 创建对讲组
     * @param {*} client
     * @param {string} channelId
     * @ignore
     */
    constructor(client: ArTalkClient, channelId: string);
    /**
     * 设置用户级别
     *
     * @param {number} nLevel 0～9，数字越小，权重越高
     */
    setLevel(nLevel: number): void;
    /**
     * 获取对讲级别
     *
     */
    getLevel(): number;
    /**
     * 设置音频推流质量
     *
     * > 非实时生效，下次上麦才有效
     * @param {EAudioQuality} nQuality
     * @experimental
     */
    setPushAudioQuality(nQuality: EAudioQuality): void;
    /**
     * 设置音频拉流质量
     *
     * > 非实时生效，只能在加入频道之前设置
     * @param {EAudioQuality} nQuality
     * @experimental
     */
    setPullAudioQuality(nQuality: EAudioQuality): void;
    /**
     * 申请对讲
     *
     * @param {number} [nTalkOnTime]
     * @return {*}  {Promise<void>}
     */
    pushToTalk(nTalkOnTime?: number): Promise<void>;
    /**
     * 取消对讲
     *
     * @return {*}  {Promise<void>}
     */
    stopPushToTalk(): Promise<void>;
    /**
     * 关闭所有远程用户的音频
     *
     * @param {boolean} bMute
     */
    muteAllRemoteAudio(bMute: boolean): void;
    /**
     * 打断对讲
     *
     * Note: 无法打断比自己级别高或者同级别的对讲。
     * 举例：级别 1 的可以打开 1 以上的，例如 2,3...级别，无法打断同级别的 1 和高级别的 0。
     */
    breakTalk(): Promise<void>;
    /**
     * 调用该方法加入该频道，加入频道成功后可收到该频道消息和频道用户进退通知。
     * 你最多可以加入 20 个频道。
     *
     * @returns {Promise<void>}
     * 该 Promise 会在加入频道成功后 resolve。
     */
    join(): Promise<void>;
    /**
     * 调用该方法离开该频道，不再接收频道消息和频道用户进退通知。
     *
     * @returns {Promise<void>}
     * 该 Promise 会在离开频道成功后 resolve。
     */
    leave(): Promise<void>;
    /* Excluded from this release type: _handleChannelEvents */
    private _subscribeAudio;
    private _reSubscribeAudio;
}

/**
 * 对讲客户端（实例）
 *
 * 通过 `ArTalk.createInstance` 创建的对象实例。
 *
 * @example
 * ```js
 * const talkClient = ArTalk.createInstance('<YOUR_APPID>', {
 *   logFilter: ArTalk.LOG_FILTER_OFF
 * });
 * ```
 *
 * - 登录对讲系统 {@link ArTalkClient.login}
 * - 退出对讲系统 {@link ArTalkClient.logout}
 * - 创建对讲频道 {@link ArTalkClient.createChannel}
 *
 *   对讲频道可以进行以下操作：
 *   - 加入频道
 *   - 退出频道
 *   - 设置对讲级别
 *   - 申请/取消对讲（简称上下麦）
 *   - 打断对讲
 *   - 关闭所有远程用户的音频
 *   - 设置音频质量 - 自己发布的或者接收他人的
 *
 * - 开关本地音频  {@link ArTalkClient.enableLocalAudio}
 * - 设置默认的发布音频质量 {@link ArTalkClient.setDefaultPushAudioQuality}
 * - 设置默认的订阅对讲音频质量 {@link ArTalkClient.setDefaultPullAudioQuality}
 * - 自定义设置，例如：私有化设置，日志级别等 {@link ArTalkClient.setParameters}
 *
 * @class ArTalkClient
 * @extends {EventEmitter}
 */
export declare class ArTalkClient extends EventEmitter<ArTalkEvents.TalkClientEvents> {
    /* Excluded from this release type: _appId */
    /* Excluded from this release type: _gateway */
    /* Excluded from this release type: _signal */
    /* Excluded from this release type: _useWss */
    /* Excluded from this release type: _sid */
    /* Excluded from this release type: _sessionId */
    /* Excluded from this release type: _pubPc */
    /* Excluded from this release type: _joinStartTime */
    /* Excluded from this release type: _audioStream */
    /**
     * 用户的 UID
     *
     * @type {string}
     */
    uid: string;
    /* Excluded from this release type: _loginSuccessCallback */
    /* Excluded from this release type: _userData */
    /* Excluded from this release type: _token */
    /**
     * 客户端创建的对讲频道
     *
     * @type {{ [channelId: string]: {
                 *    /**
                 *     * 是否成功加入频道
                 *     *\/
                 *   joined: boolean,
                 *   channel: ArTalkChannel
                 * } }}
                 */
             channels: {
                 [channelId: string]: {
                     joined: boolean;
                     channel: ArTalkChannel;
                 };
             };
             /**
              * 对讲客户端
              * @param {string} appid
              * @ignore
              */
             constructor(appid: string, options?: ITalkParameters);
             /**
              * 获取 SDK 版本信息
              *
              * @returns {*}
              */
             getVersion(): string;
             /**
              * 创建一个频道(对讲组)实例。
              *
              * 我们可以同时创建多个对讲组实例，用户订阅该对讲组的声音。
              * @param {string} channelId
              * 频道名称。该字符串不可超过 64 字节。以下为支持的字符集范围:
              * - 26 个小写英文字母 a-z
              * - 26 个大写英文字母 A-Z
              * - 10 个数字 0-9
              * - 空格
              * - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
              * **Note**
              * 请不要将 channelId 设为空、null，或字符串 "null"。
              *
              * @example
              * ```js
              *   const talkChannel = talkClient.createChannel('<YOUR_CHANNEL_ID>');
              * ```
              *
              * @returns {ArTalkChannel}
              */
             createChannel(channelId: string): ArTalkChannel;
             /**
              * 登录对讲系统
              *
              * @param {({ token?: undefined | string, uid: string })} options
              * @typeParam token  可选的动态密钥，一般由客户的服务端获取。
              * @typeParam uid  用户 ID。该字符串不可超过 64 字节。以下为支持的字符集范围:
              * - 26 个小写英文字母 a-z
              * - 26 个大写英文字母 A-Z
              * - 10 个数字 0-9
              * - 空格
              * - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
              * **Note**
              * - 请不要将 uid 设为空、null，或字符串 "null"。
              * - uid 不支持 number 类型。建议调用 toString() 方法转化非 string 型 uid。
              * @returns {Promise<void>} 该 Promise 会在登录成功后 resolve。
              */
             login(options: {
                 token?: undefined | string;
                 uid: string;
             }): Promise<void>;
             private _publishAudio;
             private _rePublishAudio;
             /**
              * 退出对讲系统
              *
              * 退出后自动断开连接。
              *
              * @returns {Promise<void>} 该 Promise 会在登出成功并断开 WebSocket 连接后 resolve。
              */
             logout(): Promise<void>;
             /**
              * 设置默认音频推流质量
              *
              * @param {EAudioQuality} nQuality
              */
             setDefaultPushAudioQuality(nQuality: EAudioQuality): void;
             /**
              * 设置默认音频拉流质量
              *
              * @param {EAudioQuality} nQuality
              */
             setDefaultPullAudioQuality(nQuality: EAudioQuality): void;
             /**
              * 开/关本地音频
              *
              * @param {boolean} enabled
              * - `true` 为打开
              * - `false` 为关闭
              * @returns {*}  {Promise<void>}
              * @memberof ArTalkClient
              */
             enableLocalAudio(enabled: boolean): Promise<void>;
             /**
              * 更新 Token。
              *
              * 当 Token 即将过期时，可以更新 Token 保留会话。
              *
              * @param {string} token  新的 Token。
              * @returns {Promise<void>}
              */
             renewToken(token: string): Promise<void>;
             /**
              * 配置 SDK 提供技术预览或特别定制功能。
              *
              * @param {ITalkParameters} params  详见 [[IParameters。]]
              */
             setParameters(params: ITalkParameters): void;
             /* Excluded from this release type: _emitConnectionState */
             /* Excluded from this release type: _createSignalInstance */
             private _reConnection;
             /* Excluded from this release type: _authGateWay */
             /* Excluded from this release type: _connectSignalNode */
         }

         export declare namespace ArTalkEvents {
             /**
              * 对讲频道收到的事件回调
              *
              * @interface TalkChannelEvents
              */
             export interface TalkChannelEvents {
                 /**
                  * 用户上麦
                  *
                  * @param {string} channelId 用户所在频道
                  * @param {string} userId 用户 ID
                  */
                 UserIsTalkOn(channelId: string, userId: string, userData: {
                     [key: string]: any;
                 }, userLevel: number): void;
                 /**
                  * 用户下麦
                  *
                  * @param {string} channelId 用户所在频道
                  * @param {string} userId 用户 ID
                  */
                 UserIsTalkOff(channelId: string, userId: string, userData?: {
                     [key: string]: any;
                 }): void;
                 /**
                  * 上麦被打断
                  */
                 BreakTalk(): void;
                 /**
                  * 广播开始
                  *
                  * @param {string} channelId 用户所在频道
                  * @param {string} userId 用户 ID
                  */
                 UserIsStreamOn(channelId: string, userId: string, UserData?: {
                     [key: string]: any;
                 }): void;
                 /**
                  * 广播结束
                  *
                  * @param {string} channelId 用户所在频道
                  * @param {string} userId 用户 ID
                  */
                 UserIsStreamOff(channelId: string, userId: string, UserData?: {
                     [key: string]: any;
                 }): void;
             }
             /**
              * 对讲客户端收到的事件回调
              *
              * @interface TalkClientEvents
              */
             export interface TalkClientEvents {
                 /**
                  * 通知 SDK 与 对讲系统的连接状态发生了改变。
                  *
                  * @param {TalkStatusCode.ConnectionState} newState 当前网络状态
                  * @param {TalkStatusCode.ConnectionChangeReason} reason 发生当前网络状态的原因
                  */
                 ConnectionStateChanged(newState: TalkStatusCode.ConnectionState, reason: TalkStatusCode.ConnectionChangeReason): void;
                 /**
                  * Token 即将过期
                  *
                  * 收到该回调，应该立即调用 [[ArTalkClient.renewToken]] 方法来更新 Token
                  */
                 TokenWillExpired(): void;
                 /**
                  * Token 已经过期
                  *
                  * 收到该回调，应该退出重新登录
                  */
                 TokenDidExpired(): void;
             }
         }

         /**
          * 音频质量
          *
          * @enum {number}
          */
         export declare enum EAudioQuality {
             /** 未知 */
             UNKNOWN = 0,
             /** 低质量 */
             LOW = 1,
             /** 中 */
             MIDDLE = 2,
             /** 高 */
             High = 3,
             /** 超高 */
             UHD = 4,
             /** 高清 */
             HD = 5
         }

         /**
          *
          *
          * @class EventEmitter
          */
         declare class EventEmitter<T extends EventMap> {
             private _events;
             constructor();
             /**
              * Gets all the listeners of a specified event.
              *
              * @param {string} eventName
              * @returns
              */
             /**
              * Listens for a specified event.
              *
              * When the event happens, the callback that you pass is triggered.
              *
              * @event
              * @param {string} eventName
              * @param {Function} callback The callback to be triggered.
              */
             on<K extends keyof T>(eventName: K, callback: T[K]): void;
             /**
              *
              *
              * @param {string} eventName
              * @param {Function} callback
              */
             once<K extends keyof T>(eventName: K, callback: T[K]): void;
             /**
              *
              *
              * @param {string} eventName
              * @param {Function} callback
              */
             off<K extends keyof T>(eventName: K, callback: T[K]): void;
             /**
              *
              *
              * @param {string} [eventName]
              */
             removeAllListeners<K extends keyof T>(eventName?: K): void;
             /**
              *
              *
              * @param {string} eventName
              */
             emit<K extends keyof T>(eventName: K, ...args: any[]): void;
             /**
              *
              *
              * @param {any[]} evtList
              * @param {Function} callback
              * @returns
              */
             private _indexOfListener;
         }

         /**
          *
          * 参考
          * https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
          * https://rjzaworski.com/2019/10/event-emitters-in-typescript
          * https://stackoverflow.com/questions/39142858/declaring-events-in-a-typescript-class-which-extends-eventemitter
          * https://gist.github.com/rsms/3744301784eb3af8ed80bc746bef5eeb#file-eventlistener-d-ts
          */
         declare type EventMap = Record<string, any>;

         /**
          * 登录信令 content
          * @ignore
          */
         declare interface IOnlineOptions {
             UserId: string;
             UserData: string;
             UserSId: string;
             AcsToken: string;
             SdkVer: string;
             SessionId: string;
             SvrKeepAlive?: boolean;
         }

         /**
          *
          *
          * @interface IParameters
          */
         export declare interface ITalkParameters {
             /**
              * 自定义用户数据
              *
              * @type {{ [key: string]: any }}
              */
             UserData?: {
                 [key: string]: any;
             };
             /**
              * 设置日志输出等级。
              * 设置 SDK 的输出日志输出等级。不同的输出等级可以单独或组合使用。日志级别顺序依次为 OFF、ERROR、WARNING 和 INFO。
              * 选择一个级别，你就可以看到在该级别之前所有级别的日志信息。例如，你选择 WARNING 级别，就可以看到在 ERROR 和 WARNING 级别上的所有日志信息。
              * - ArTalk.LOG_FILTER_OFF
              * - ArTalk.LOG_FILTER_ERROR
              * - ArTalk.LOG_FILTER_INFO （默认）
              * - ArTalk.LOG_FILTER_WARNING
              * @type {LogFilterType}
              */
             logFilter?: LogFilterType;
             /**
              * 设置日志输出等级。
              * 设置 SDK 的输出日志输出等级。不同的输出等级可以单独或组合使用。日志级别顺序依次为 OFF、ERROR、WARNING 和 INFO。
              * 选择一个级别，你就可以看到在该级别之前所有级别的日志信息。例如，你选择 WARNING 级别，就可以看到在 ERROR 和 WARNING 级别上的所有日志信息。
              * - ArTalk.LOG_FILTER_OFF
              * - ArTalk.LOG_FILTER_ERROR
              * - ArTalk.LOG_FILTER_INFO （默认）
              * - ArTalk.LOG_FILTER_WARNING
              * @type {LogFilterType}
              */
             LogFilter?: LogFilterType;
             /**
              * 配置私有云地址
              */
             confPriCloudAddr?: {
                 /**
                  * 私有云服务 URL
                  *
                  * @type {string}
                  */
                 ServerAdd: string;
                 /**
                  * 私有云服务端口
                  *
                  * @type {number}
                  */
                 Port?: number;
                 /**
                  * 私有云服务是否启用 HTTPS/WSS
                  *
                  * @type {boolean}
                  */
                 Wss?: boolean;
             };
             /**
              * 配置私有云地址
              *
              */
             ConfPriCloudAddr?: {
                 /**
                  * 私有云服务 URL
                  *
                  * @type {string}
                  */
                 ServerAdd: string;
                 /**
                  * 私有云服务端口
                  *
                  * @type {number}
                  */
                 Port?: number;
                 /**
                  * 私有云服务是否启用 HTTPS/WSS
                  *
                  * @type {boolean}
                  */
                 Wss?: boolean;
             };
         }

         /**
          * 更新用户信息信令 content
          * @ignore
          */
         declare interface IUpdateUserDataOptions {
             UserData: string;
             UserId: string;
             UserSId: string;
         }

         export declare type LogFilterType = LogLevel;

         /**
          *
          * @ignore
          * @enum {number}
          */
         declare enum LogLevel {
             DEBUG = 0,
             INFO = 1,
             WARNING = 2,
             ERROR = 3,
             NONE = 4
         }

         /**
          * 信令客户端
          * 信令使用 WebSocket 进行传输
          *
          * @class SignalChannel
          */
         declare class SignalChannel {
             protected _websocket: WebSocket | any;
             private _url;
             private _wss;
             private _port;
             private _listenCallback;
             onclose: (ev: CloseEvent) => void;
             onerror: (ev: Event) => void;
             onmessage: (ev: MessageEvent) => void;
             /**
              * websocket 连接状态
              * 值为以下其中之一
              * 0 (WebSocket.CONNECTING) 正在链接中
              * 1 (WebSocket.OPEN) 已经链接并且可以通讯
              * 2 (WebSocket.CLOSING) 连接正在关闭
              * 3 (WebSocket.CLOSED) 连接已关闭或者没有链接成功
              *
              * @readonly
              */
             get connectState(): any;
             constructor(options?: SignalChannelOptions);
             /**
              * 开始连接信令服务器
              *
              * @param {SignalChannelOptions} [options]
              * @return Promise<void>
              */
             open(options?: SignalChannelOptions): Promise<void>;
             /**
              * 断开信令服务器
              *
              */
             close(): void;
             /**
              * 发送信令
              *
              * @param {object} msg
              */
             send(msg: object): any;
             addMessageEventListener(listener: (ev: MessageEvent) => void, options?: boolean | AddEventListenerOptions): void;
             removeMessageEventListener(listener: (ev: MessageEvent) => any, options?: boolean | AddEventListenerOptions): void;
             /**
              * 关闭连接并清除监听事件
              *
              */
             clear(): void;
         }

         declare interface SignalChannelOptions {
             url: string;
             wss?: boolean;
             port?: number;
         }

         export declare namespace TalkErrorCode {
             export enum BasicErrorCode {
                 INVALID_OPERATION = 1
             }
             export enum SetLevelError {
                 /**
                  * 通用错误码。属性操作失败。
                  */
                 SET_LEVEL_ERR_FAILURE = 2,
                 /**
                  * 无效的输入参数。比如，你不可以把用户属性或频道属性设为 ""。
                  */
                 SET_LEVEL_ERR_INVALID_ARGUMENT = 3,
                 /**
                  * 5: 方法调用频率超过限制。
                  * - setLocalUserAttributes、addOrUpdateLocalUserAttributes、deleteLocalUserAttributesByKeys，和 clearLocalUserAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
                  * - getUserAttributes 和 getUserAttributesByKeys 一并计算在内：调用频率限制为每 5 秒 40 次。
                  * - setChannelAttributes、addOrUpdateChannelAttributes、deleteChannelAttributesByKeys，和 clearChannelAttributes 一并计算在内：调用频率限制为每 5 秒 10 次。
                  * - getChannelAttributes 和 getChannelAttributesByKeys 一并计算在内：调用频率限制为每 5 秒 10 次。
                  */
                 SET_LEVEL_ERR_TOO_OFTEN = 4,
                 /**
                  * 未找到指定用户。该用户或者处于离线状态或者并不存在。
                  */
                 SET_LEVEL_ERR_USER_NOT_FOUND = 5,
                 /**
                  * 属性操作超时。当前的超时设定为 5 秒。可能原因：用户正处于 ABORTED 状态或 RECONNECTING 状态。
                  */
                 SET_LEVEL_ERR_TIMEOUT = 6,
                 /**
                  * 执行属性相关操作前未调用 login 方法或者 login 方法调用未成功。
                  */
                 SET_LEVEL_ERR_USER_NOT_LOGGED_IN = 102
             }
             export enum CreateChannelError {
                 /**
                  * 输入参数无效。
                  */
                 CREATE_CHANNEL_ERR_INVALID_ARGUMENT = 1
             }
             export enum CreateInstanceError {
                 /**
                  * 输入参数无效。
                  */
                 CREATE_INSTANCE_ERR_INVALID_ARGUMENT = 1
             }
             /**
              * 申请对讲错误
              *
              * @export
              * @enum {number}
              */
             export enum PushTalkError {
                 /**
                  *
                  */
                 PUSH_TALK_ERR_FAILURE = 1,
                 /**
                  * 权限不足
                  */
                 PUSH_TALK_ERR_PERMISSION_DENIED = 2
             }
             export enum BreakTalkError {
                 /**
                  * 对讲频道不存在
                  */
                 BREAK_TALK_ERR_FAILURE = 1,
                 /**
                  * 权限不足
                  */
                 BREAK_TALK_ERR_PERMISSION_DENIED = 2
             }
             export enum JoinChannelError {
                 /**
                  * 通用错误。用户加入频道失败。
                  */
                 JOIN_CHANNEL_ERR_FAILURE = 1,
                 /**
                  * 预留错误码
                  */
                 JOIN_CHANNEL_ERR_REJECTED = 2,
                 /**
                  * 用户加入频道失败。输入参数无效。
                  */
                 JOIN_CHANNEL_ERR_INVALID_ARGUMENT = 3,
                 /**
                  * 用户加入频道超时。目前的超时设置为 5 秒。可能原因：用户正处于 ABORTED 状态或 RECONNECTING 状态。
                  */
                 JOIN_CHANNEL_TIMEOUT = 4,
                 /**
                  * 同时加入的频道数超过 20 上限。
                  */
                 JOIN_CHANNEL_ERR_EXCEED_LIMIT = 5,
                 /**
                  * 用户正在加入频道或已成功加入频道。
                  */
                 JOIN_CHANNEL_ERR_ALREADY_JOINED = 6,
                 /**
                  * 方法调用超过 50 次每 3 秒的上限。
                  */
                 JOIN_CHANNEL_ERR_TOO_OFTEN = 7,
                 /**
                  * 8: 加入相同频道的频率超过每 5 秒 2 次的上限。
                  */
                 JOIN_CHANNEL_ERR_JOIN_SAME_CHANNEL_TOO_OFTEN = 8,
                 /**
                  * 用户加入频道前未调用 login 方法或者 login 方法调用未成功。
                  */
                 JOIN_CHANNEL_ERR_USER_NOT_LOGGED_IN = 102,
                 JOIN_CHANNEL_ERR_ABORTED_BY_LEAVE = 210,
                 JOIN_CHANNEL_ERR_ALREADY_JOINED_CHANNEL_OF_SAME_ID = 211
             }
             export enum LeaveChannelError {
                 /**
                  * 通用错误。用户离开频道失败。
                  */
                 LEAVE_CHANNEL_ERR_FAILURE = 1,
                 /**
                  * 预留错误码
                  */
                 LEAVE_CHANNEL_ERR_REJECTED = 2,
                 /**
                  * 用户已不在频道内。
                  */
                 LEAVE_CHANNEL_ERR_NOT_IN_CHANNEL = 3,
                 /**
                  * 用户用户在调用 leave 方法前未调用 \ref anyrtc::rtm::IRtmService::login "login" 方法或者 \ref anyrtc::rtm::IRtmService::login "login" 方法调用未成功。
                  */
                 LEAVE_CHANNEL_ERR_USER_NOT_LOGGED_IN = 102
             }
             export enum LoginError {
                 /**
                  * 通用登录错误。
                  */
                 LOGIN_ERR_UNKNOWN = 1,
                 /**
                  * 无效的登录参数。
                  */
                 LOGIN_ERR_INVALID_ARGUMENT = 2,
                 /**
                  * 无效的 App ID。
                  */
                 LOGIN_ERR_INVALID_APP_ID = 3,
                 /**
                  * 无效的 Token。
                  */
                 LOGIN_ERR_INVALID_TOKEN = 4,
                 /**
                  * Token 已过期，登录被拒绝。
                  */
                 LOGIN_ERR_TOKEN_EXPIRED = 5,
                 /**
                  * 预留错误码
                  */
                 LOGIN_ERR_NOT_AUTHORIZED = 6,
                 /**
                  * 用户已登录，或已正在登录 对讲系统，或未调用 logout 方法退出 ABORTED 状态。
                  */
                 LOGIN_ERR_ALREADY_LOGIN = 7,
                 /**
                  * 登录超时。目前的超时设置为 6 秒。
                  */
                 LOGIN_ERR_TIMEOUT = 8,
                 /**
                  * 登录过于频繁。超过 2 次／秒的上限。
                  */
                 LOGIN_ERR_TOO_OFTEN = 9,
                 /**
                  * 网关错误
                  */
                 LOGIN_ERR_ABORTED_BY_LOGOUT = 10,
                 /**
                  * 网关错误
                  */
                 LOGIN_ERR_GATEWAY_CONNECT_FAILED = 11
             }
             export enum LogoutError {
                 /**
                  * 登出 对讲系统前未调用 login 方法或者 login 方法调用未成功。
                  */
                 LOGOUT_ERR_USER_NOT_LOGGED_IN = 102
             }
             export enum RenewTokenError {
                 /**
                  * 通用错误。更新 Token 失败。
                  */
                 RENEW_TOKEN_ERR_FAILURE = 1,
                 /**
                  * 无效的输入参数。
                  */
                 RENEW_TOKEN_ERR_INVALID_ARGUMENT = 2,
                 /**
                  * 预留错误码
                  */
                 RENEW_TOKEN_ERR_REJECTED = 3,
                 /**
                  * 方法调用过于频繁。超过 2 次／秒的上限。
                  */
                 RENEW_TOKEN_ERR_TOO_OFTEN = 4,
                 /**
                  * 输入 Token 已过期。
                  */
                 RENEW_TOKEN_ERR_TOKEN_EXPIRED = 5,
                 /**
                  * 输入 Token 无效。
                  */
                 RENEW_TOKEN_ERR_INVALID_TOKEN = 6,
                 /**
                  * 更新 Token 前未调用 login 方法或者 login 方法调用未成功。
                  */
                 RENEW_TOKEN_ERR_USER_NOT_LOGGED_IN = 102,
                 RENEW_TOKEN_ERR_ABORTED_BY_LOGOUT = 201
             }
         }

         /**
          *
          *
          * @class TalkServer
          * @extends {EventEmitter<{[key: string]: any}>}
          * @ignore
          */
         declare class TalkServer extends SignalChannel {
             private _cmdEncrypt;
             private _appId;
             private _serverIsWss;
             private _serverUrl;
             private _serverPort;
             private _userId;
             private _connectTimeout;
             private _keepAliveTimeout;
             private _keepALiveInterval;
             private _keepALiveIntervalTime;
             private _sendMsgTimeOutInterval;
             _revState: string;
             private _curState;
             handleMediaServerEvents: (cmd: string, data: any) => void;
             constructor(config?: {
                 [key: string]: any;
             });
             /**
              *
              *
              * @param {{ [key: string]: any }} options
              */
             init(options: {
                 [key: string]: any;
             }): void;
             /**
              *
              *
              * @param {{[key: string]: any}} appInfo
              */
             setAppInfo(appInfo: {
                 [key: string]: any;
             }): void;
             /**
              * 配置服务请求地址
              *
              * @returns
              */
             configServer(isWss: boolean, url: string, port: number): void;
             /**
              * 连接CTS
              *
              */
             connectServer(): Promise<void>;
             /**
              *
              *
              */
             doKeepAlive(): void;
             /**
              * 上线
              *
              * @param {*} extendContent
              */
             doOnline(extendContent: IOnlineOptions): Promise<string>;
             /**
              * 上线
              *
              * @param {*} extendContent
              */
             doOffline(): Promise<void>;
             /**
              * 建立 RTC 通道
              *
              * @param {string} channelId
              */
             doPublish(sdpData: RTCSessionDescriptionInit): Promise<{
                 StreamId: string;
                 Sdp: string;
             }>;
             /**
              * 建立 RTC 通道
              *
              * @param {string} channelId
              */
             doUnpublish(): Promise<void>;
             /**
              * 建立 RTC 通道
              *
              * 一个频道一个 RTC 通道，但是全局只有一个 发布的 PC 通道
              *
              * @param {string} streamId
              * @param {RTCSessionDescriptionInit} sdpData
              * @return {*}  {Promise<any>}
              */
             doChanSubscribe(streamId: string, sdpData: RTCSessionDescriptionInit): Promise<any>;
             /**
              * 关闭 RTC 通道
              *
              * 离开频道，或者 PC 断开后，需要重连时
              *
              * @param {string} streamId
              * @return {*}  {Promise<any>}
              */
             doChanUnSubscribe(channelId: string): Promise<any>;
             /**
              * 建立 RTC 通道
              * 拉取服务端混合的音频流，1下
              * @param {string} channelId
              */
             /**
              * 加入频道
              *
              * @param {string} channelId
              * @param {number} level
              * @return {*}  {Promise<void>}
              */
             doJoinChannel(channelId: string, level: number, pullQuality: EAudioQuality): Promise<number>;
             /**
              *
              *
              * @param {string} channelId
              */
             doLeaveChannel(channelId: string): Promise<void>;
             /**
              * 更新自定用户信息
              *
              * @param {{ [key: string]: any }} userData
              */
             doUpdateUserData(content: IUpdateUserDataOptions): void;
             /**
              * 申请上麦
              *
              * @param {string} id
              * @param {string} channel
              * @param {EAudioQuality} quality
              * @return {*}  {Promise<void>}
              */
             doReqTalk(id: string, channel: string, level: number, quality: EAudioQuality): Promise<void>;
             /**
              * 取消上麦
              *
              * @param {string} id
              * @return {*}
              */
             doFreeTalk(id: string, channel: string): Promise<void>;
             /**
              * 取消上麦
              *
              * @param {string} id
              * @return {*}
              */
             doBreakTalk(channel: string): Promise<void>;
             /**
              *
              *
              */
             doReNewToken(token: string): void;
             /**
              * 断开WS连接
              *
              */
             disconnectServer(reason?: string): void;
             /**
              *
              *
              * @private
              */
             private _setConnectTimeout;
             /**
              * 10s 保活一次
              *
              * @private
              */
             private _startKeepAlive;
             /**
              *
              *
              * @private
              */
             private _stopKeepAlive;
             /**
              *
              *
              * @private
              */
             private _clearConnectTimeout;
             /**
              *
              *
              */
             private _clearKeepALiveTimeout;
             /**
              *
              * @param curState
              * @param revState
              * @param reason
              */
             private _emitConnectionState;
         }

         export declare namespace TalkStatusCode {
             /**
              * 连接状态改变原因
              */
             export enum ConnectionChangeReason {
                 /**
                  * SDK 被服务器禁止登录 对讲系统。
                  */
                 BANNED_BY_SERVER = "BANNED_BY_SERVER",
                 /**
                  * SDK 与 对讲系统的连接被中断超过 4 秒。
                  */
                 INTERRUPTED = "INTERRUPTED",
                 LOGIN = "LOGIN",
                 /**
                  * SDK 登录 对讲系统失败。
                  */
                 LOGIN_FAILURE = "LOGIN_FAILURE",
                 /**
                  * SDK 登录 对讲系统成功
                  */
                 LOGIN_SUCCESS = "LOGIN_SUCCESS",
                 /**
                  * SDK 无法登录 对讲系统超过 6 秒，停止登录。
                  */
                 LOGIN_TIMEOUT = "LOGIN_TIMEOUT",
                 /**
                  * SDK 已登出 对讲系统。
                  */
                 LOGOUT = "LOGOUT",
                 /**
                  * 另一个用户正以相同的 uid 登陆 对讲系统。
                  */
                 REMOTE_LOGIN = "REMOTE_LOGIN"
             }
             /**
              * SDK 与 对讲系统的连接状态类型
              *
              * @enum {number}
              */
             export enum ConnectionState {
                 /**
                  * SDK 停止登录 对讲系统。
                  * 原因可能为：
                  * - 另一实例已经以同一用户 ID 登录 对讲系统。
                  * - token 已过期。
                  * 请在调用方法 logout 后，调用方法 login 登录 对讲系统。
                  */
                 ABORTED = "ABORTED",
                 /**
                  * SDK 已登录 对讲系统。
                  */
                 CONNECTED = "CONNECTED",
                 CONNECTING = "CONNECTING",
                 DISCONNECTED = "DISCONNECTED",
                 RECONNECTING = "RECONNECTING"
             }
         }

         export { }
