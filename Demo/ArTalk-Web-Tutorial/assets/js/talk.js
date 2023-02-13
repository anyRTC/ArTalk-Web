// tools---------------------
// 消息置底
function msgScrollBottom(channelId) {
  $(`#messageBox${channelId}`).animate({ scrollTop: $(`#chatView${channelId}`).prop("scrollHeight") }, 200);
}

// 添加消息
function printChannelLog(label, channelId, message) {
  var msg = $(`<li class="list-group-item msg-box-item"><span class="label label-success">${label}</span>: ${message}</li>`);
  $(`#chatView${channelId}`).append(msg);
  msgScrollBottom(channelId);
}

// 日志置底
function printSystemLog(type, content) {
  var date = new Date().toLocaleTimeString();
  var log = $(`<li class="list-group-item msg-box-item"><span class="label label-${type}">${date}</span> ${content} </li>`);
  $("#logView").append(log);

  $("#logBox").animate({ scrollTop: $("#logView").prop("scrollHeight") }, 200);
}

/**
 * 弹出alert
 * type: primary | success | danger
*/
function alertMsg(type, content) {
  var el = $(`
    <div class="alert alert-${type} d-flex align-items-center" role="alert">
      ${type === 'danger' ? '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>' : ''}
      ${type === 'primary' ? '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>' : ''}
      ${type === 'success' ? '<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>' : ''}
      <div>
        ${content}
      </div>
    </div>
  `);
  $("#alertView").append(el);
  setTimeout(function() {
    el.remove();
  }, 2e3);
}


class Talk {
  _uId = '';

  _talkLevel = 0;

  _instance = null;

  _isLogin = false;

  // 是否加入了，是否监听了，是否锁定了，是否有人正在说话（是否可以打断），说话的人是否是自己
  _channels = new Map();

  _lockedChannelId = '';

  constructor(APPID, USER_ID) {
    this._instance = ArTalk.createInstance(APPID, {
      // logFilter: ArTalk.LOG_FILTER_OFF,
      ConfPriCloudAddr: {
        // ServerAdd: "192.168.1.111",
        // Port: 7080,
        // Wss: false,
        ServerAdd: "pro.talkgw.agrtc.cn",
        Port: 443,
        Wss: true,
      },
      UserData: {
        uid: USER_ID,
        nickname: 'chudong' + USER_ID
      }
    });
    this._uId = USER_ID;
    // 监听回调事件 //
    //通知 SDK 与 RTM 系统的连接状态发生了改变。
    this._instance.on("ConnectionStateChanged", function (newState, reason) {

    });

    this._instance.on("ConnectionStateChanged", function (state, reason) {
      printSystemLog("success", `ConnectionStateChanged ${state}. reason: ${reason}`);
    });

    //（SDK 断线重连时触发）当前使用的 RTM Token 已超过 24 小时的签发有效期。
    this._instance.on("TokenWillExpired", function () {
      console.log('TokenWillExpired');
    });

    this._instance.on("TokenDidExpired", function () {
      console.log('TokenDidExpired');
    });

  }

  async login(USER_TOKEN) {
    if (this._instance && !this._isLogin) {
      await this._instance.login({
        uid: this._uId,
        token: USER_TOKEN ? USER_TOKEN : null
      });
      this._isLogin = true;
    }
  }

  async logout() {
    if (this._instance && this._isLogin) {
      await this._instance.logout();
      this._isLogin = true;
    }
  }

  async joinChannel(id, level) {
    var channel = this._channels.get(id);
    if (!channel) {
      // talk channel
      var talkChannel = this._instance.createChannel(id);
      // 设置用户级别
      talkChannel.setLevel(level);

      //频道成员人数更新回调。
      talkChannel.on("MemberJoined", function (memberId) {
        printSystemLog("info", `MemberJoined : ${memberId}`);
      });

      //收到用户离开频道的通知。
      talkChannel.on("MemberLeft", function (memberId) {
        printSystemLog("info", `MemberLeft : ${memberId}`);
      });

      // 用户上麦
      talkChannel.on("UserIsTalkOn", function(channelId, userId, userData) {
        console.log("用户上麦", channelId, userId, userData);
        printChannelLog('success', channelId, `user ${userId} on talk.`);
      });
      // 用户下麦
      talkChannel.on("UserIsTalkOff", function(channelId, userId, userData) {
        console.log("用户下麦", channelId, userId, userData);
        printChannelLog('success', channelId, `user ${userId} off talk.`);
      });
      // 上麦被打断
      talkChannel.on("BreakTalk", () => {
        console.log("上麦被打断");
        //
        this._channels.forEach((channel, channelId) => {
          if (channelId === talkChannel.channelId) {
            channel.talker = null;
          }
        })
        $(`#talkBtn${talkChannel.channelId}`).html("上麦");
        printChannelLog('success', talkChannel.channelId, `talk is break by remote.`);
        // Object.keys(channels).forEach(function(channelId) {
        //   channels[channelId].onTalk = false;
        //   $(`#talkBtn${channelId}`).html("上麦");
        //   printChannelLog('success', channelId, `user ${userId} talk is break by remote.`);
        // });
      });
      // 收到群组广播
      talkChannel.on("UserIsStreamOn", function(channelId, userId, userData) {
        console.log("收到群组广播", channelId, userId, userData);
        printChannelLog('success', channelId, `user ${userId} on talk.`);
      });
      // 群组广播取消
      talkChannel.on("UserIsStreamOff", function(channelId, userId, userData) {
        console.log("群组广播取消", channelId, userId, userData);
        printChannelLog('success', channelId, `user ${userId} off talk.`);
      });
      await talkChannel.join();
      // 存储
      this._channels.set(id, {
        instance: talkChannel,
        // 是否加入了频道
        joined: true,
        // 是否监听了
        onMonitor: false,
        // 是否有人在对讲，对讲人信息
        talker: null,
        // 是否锁定了，是否有人正在说话（是否可以打断），说话的人是否是自己
      });
    }
  }

  async leaveChannel(id) {
    var channel = this._channels.get(id);
    if (channel && channel.joined) {
      await channel.instance.leave();
      this._channels.delete(id);
    }
  }

  async pushTalk(id) {
    var channel = this._channels.get(id);
    if (channel && 
      (
        !channel.talker ||
        ( channel.talker && channel.talker.uId !== this._uId && channel.talker.level > this._talkLevel )
      )
    ) {
      await channel.instance.pushToTalk();
      channel.talker = {
        uId: this._uId,
        level: this._talkLevel
      }
    }
  }

  async releaseTalk(id) {
    var channel = this._channels.get(id);
    if (channel && channel.talker && channel.talker.uId === this._uId) {
      await channel.instance.stopPushToTalk();
      channel.talker = null;
    }
  }

  async breakTalk(id) {
    var channel = this._channels.get(id);
    if (channel) {
      await channel.instance.breakTalk();
    }
  }

}