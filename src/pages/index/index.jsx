import { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Input, Text, Button } from '@tarojs/components';
import { day, hsData } from '../../utils/index';
import './index.less';

const SAMPLE_NO = 93246803422;
const WTF = 2.0962288902923056;
export default class Index extends Component {
  state = {
    userName: undefined,
    userId: undefined,
    inviteCode: undefined
  }

  componentWillMount() { }

  componentDidMount() {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        const { userName, userId } = JSON.parse(userInfo);
        this.setState({ userName, userId });
      }
    } catch (e) {
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onInviteCodeInput = (e) => {
    this.setState({ inviteCode: e.detail.value.trim() })
  }

  onUserNameInput = e => {
    this.setState({ userName: e.detail.value.trim() })
  }

  onUserIdInput = e => {
    this.setState({ userId: e.detail.value.trim() })
  }

  onComfirm = () => {
    if (this.state.userId.length < 15) {
      Taro.showModal({
        content: '身份证号码不正确',
        showCancel: false
      })
      return
    }

    const inviteCode = Taro.getStorageSync('inviteCode');
    if(!inviteCode) {
      if (this.state.inviteCode % Math.PI !== WTF) {
        Taro.showModal({
          content: '邀请码有误, 请联系管理员',
          showCancel: false,
        })
        this.setState({ inviteCode: undefined })
        return
      }
    }
    try {
      const initData = this.generateData();
      const cacheData = JSON.stringify({
        initData,
        userId: this.state.userId,
        userName: this.state.userName,
      });
      Taro.setStorage({
        key: 'inviteCode',
        data: this.state.inviteCode
      });
      Taro.setStorage({
        key: 'userInfo',
        data: cacheData,
        success: () => {
          if (!inviteCode) {
            this.forceUpdate();
          }
          Taro.navigateTo({
            url: '/pages/list/index'
          })
        }
      })
    } catch (error) {
      console.error("🚀 ~ file: index.jsx ~ line 63 ~ Index ~ error", error)
    }

  }

  onReset = () => {
    this.setState({ userName: undefined, userId: undefined })
    Taro.removeStorage('userInfo');
    // Taro.clearStorage();
  }

  generateData = () => {
    const data = [];
    Array.from({ length: 5 }, (_, i) => {
      const obj = { isEyeOpen: false };
      hsData.forEach(({ key, defaultValue }) => {
        let value = defaultValue;
        if (!value) {
          switch (key) {
            case 'userName':
              value = this.state.userName;
              break;
            case 'userId':
              value = this.state.userId;
              break;
            case 'sampleNo':
              value = SAMPLE_NO - parseInt(Math.random() * 10000 * (i * 100));
              break;
            case 'samplingTime':
              value = day()
                .add(-1 * (i + 1), 'd')
                .setHours(9, 21)
                .setMinutes()
                .setSeconds()
                .format('YYYY-MM-DD hh:mm:ss');
              break;
            case 'testingTime':
              value = day().add(-1 * i, 'd').format();
              break;
          }
        }
        obj[key] = value;
      })
      data.push(obj);
    });
    return data;
  }

  render() {
    const { userId, userName, inviteCode } = this.state;
    const hasInviteCode = Taro.getStorageSync('inviteCode');
    return (
      <View className='index'>
        <View className='index_userInfo'>
        {
          !hasInviteCode && (
            <View className='userInfo_item'>
              <Text className='title'>邀请码</Text>
              <Input
                maxlength={20}
                className='input'
                type='password'
                placeholder='请输入'
                value={inviteCode}
                onInput={this.onInviteCodeInput}
                placeholderClass='placeholder'
              />
            </View>
          )
        }
          <View className='userInfo_item'>
            <Text className='title'>姓名</Text>
            <Input
              maxlength={10}
              className='input'
              placeholder='请输入'
              value={userName}
              onInput={this.onUserNameInput}
              placeholderClass='placeholder'
            />
          </View>
          <View className='userInfo_item'>
            <Text className='title'>身份证号</Text>
            <Input
              type='number'
              maxlength={18}
              className='input'
              placeholder='请输入'
              value={userId}
              onInput={this.onUserIdInput}
              placeholderClass='placeholder'
            />
          </View>

          <Button
            type='primary'
            disabled={!userId || !userName || !hasInviteCode}
            onClick={this.onComfirm}
            value={userId}
            style='margin-bottom: 20px'
          >
            确定
          </Button>
          <Button onClick={this.onReset}>重置</Button>
        </View>
      </View>
    )
  }
}
