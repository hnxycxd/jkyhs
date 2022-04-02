import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Iconfont from '../../assets/iconfont'
import { hsData } from '../../utils/index';
import cut from './cloud2.png';
import './index.less'

export default class Index extends Component {
  state = {
    dataSource: []
  }

  componentWillMount() { }

  componentDidMount() {
    try {
      const userInfo = Taro.getStorageSync('userInfo')
      if (userInfo) {
        const { initData } = JSON.parse(userInfo);
        this.setState({ dataSource: initData });
      }
    } catch (error) {
      console.error("🚀 ~ file: index.jsx ~ line 24 ~ Index ~ componentDidMount ~ error", error)
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  onEyeChange = (idx) => {
    const dataSource = this.state.dataSource.map((item, i) => {
      let newItem = { ...item };
      if (i === idx) {
        newItem.isEyeOpen = !newItem.isEyeOpen;
      }
      return newItem;
    })
    this.setState({ dataSource });
  }

  renderValue = (dataItem, { key }) => {
    const value = dataItem[key];
    if (key === 'userName' || key === 'userId') {
      if (dataItem.isEyeOpen) {
        return value;
      }
      if (key === 'userName') {
        return `*${value.slice(1)}`;
      }
      if (key === 'userId') {
        return `${value.slice(0, 4)}${'*'.repeat(10)}${value.slice(-4)}`; 
      }
    }
    return value;
  }

  render() {
    return (
      <View className='list'>
        <View className='tips'>
          <View className='tips_main'>
            本查询服务由上海市卫生健康委员会提供
          </View>
        </View>
        <View className='wrapper_list'>
          {
            this.state.dataSource.map((dataItem, dataIndex) => {
              return (
                  <View className='list_item'>
                    <View className='item_head'>
                      <Image
                        src={cut}
                        style='width: 35px; height:35px'
                      />
                    </View>

                    <View className='item_info'>
                      {
                        hsData.map((item) => {
                          return (
                            <View className={`
                                info_item
                                ${item.highLight ? 'highLight' : null}
                                ${item.isLast ? 'isLast' : null}
                              `}
                            >
                              <View className='title'>{item.title}</View>
                              <View className='value'>
                                {
                                  item.key === 'userName' && (
                                    <View onclick={() => this.onEyeChange(dataIndex)} style='margin-right: 10px' >
                                      <Iconfont color='#666' size='32' name={dataItem.isEyeOpen ? 'eye1' : 'eye'} />
                                    </View>
                                  )
                                }
                                { this.renderValue(dataItem, item) }
                              </View>
                            </View>
                          )
                        })
                      }
                    </View>
                    <View className='item_splitLine' />
                    <View className='item_foot' />
                  </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
