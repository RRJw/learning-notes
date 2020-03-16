- 通过微信开放能力获取用户的基本信息(不包括openid)

  ```js
  <button bindgetuserinfo="onGetUserInfo"
  open-type="getUserInfo">登录</button>
  ```

- 通过云函数login获取用户的openid

  ```js
  onGetUserInfo(e) {
      let userInfo = e.detail.userInfo
      wx.cloud.callFunction({
        name:'login',
        complete:res=>{
          userInfo.openid = res.result.openid
          //获取到openid后动态的更新数据
          this.setData({
            userInfo
          })
          //获取到的数据存在刷新数据丢失问题，
          //将他存储到locaStorage中去
          wx.setStorageSync('userInfo', userInfo)
        }
      })
    }
  ```

  