import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from "@tarojs/components";
import { getParams } from '../../utils/kits/router-fns';
import { http } from '../../utils';
import { RegionPicker } from '../../components';
import { AtNoticebar, AtInput, AtTextarea, AtImagePicker, AtInputNumber, AtButton } from '../../taro-ui';
import "../../taro-ui/style/components/noticebar.scss";
import "../../taro-ui/style/components/input.scss";
import "../../taro-ui/style/components/icon.scss";
import "../../taro-ui/style/components/textarea.scss";
import "../../taro-ui/style/components/image-picker.scss";
import "../../taro-ui/style/components/input-number.scss";
import "../../taro-ui/style/components/button.scss";

import './index.less';

interface IProps {
  label: string,
  isRequire: boolean,
}

class Item extends React.Component<IProps> {

  constructor(props) {
    super(props);
  }
  
  render() {

    const { label, isRequire } = this.props;

    return (
      <View>
        <View className="label">
          <View className="label__box"></View>
          <Text className="label__text">{label}</Text>
          {
            isRequire && <Text className='label__require'>*</Text>
          }
        </View>
        <View className="cont">
          { this.props.children || null }
        </View>
      </View>
    )
  }
}


const Detail = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState([]);
  const [num, setNum] = useState(1);
  const [isLook, setIsLook] = useState(false);
  const [cond, setCond] = useState([]);
  const [isCharge, setIsCharge] = useState(2); // 免费
  const [region, setRegion] = useState(['北京', '北京市', '东城区']);

  useEffect(() => {
    if (!getParams(this).id) return;
    // http.get('http://localhost:3030/basketball/api/basketball/field/' + getParams(this).id, {}, {})
    //   .subscribe(({ result }) => {
    //     console.log(result);
    //     setIsLook(true);
    //     setTitle(result.title);
    //     setContent(result.address);
    //     setNum(result.boundNum);
    //   })
  }, [])

  useEffect(() => {
    const condition = Taro.getStorageSync('condition');
    console.log(condition);
    if (condition) {
      const newCond: any = [];
      Object.keys(condition).forEach((i) => {
        newCond.push({
          id: i,
          name: condition[i],
          checked: false,
        })
      })
      setCond(newCond || []);
    }
  }, [])

  const onGetRegion = (data) => {
    if (data && data.length >= 3) {
      /// 将省市区的数据保存起来并刷新数据
      let newRegion = [data[0].label, data[1].label, data[2].label]
      setRegion(newRegion);
      console.log(newRegion);
    }
  }

  const save = () => {

    if (!title) {
      Taro.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (!content) {
      Taro.showToast({
        title: '详细位置不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    // if (!fileList || !fileList.length) {
    //   Taro.showToast({
    //     title: '图片不能为空',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return;
    // }

    http.post('field', {
      title,
      desc: content,
      boundNum: num,
      isCharge,
      condition: cond.filter((v: any) => v.checked).map((v: any) => v.id),
      province: region.map((v: any) => v).join('-'),
    }, {})
      .subscribe(({ result: res }) => {
        if (!res) return;
        console.log(res);
        // setList(res);
      })

  }

  return (
    <View>
      <AtNoticebar>
        为使其他小伙伴能够准确地找到场地，请详细填写场地位置信息，上传正确清晰的篮球场地照片，审核通过后将会展示在首页。如果有场地已经不再开放或篮框已经卸下，请填写反馈内容给我。
      </AtNoticebar>
      <View>
        <Item label="标题" isRequire>
          {
            isLook ? <Text>{title}</Text> : 
            <AtInput 
              placeholder='标题' 
              value={ title } 
              onChange={(e: string) => setTitle(e)} />
          }
        </Item>
        <Item label="位置" isRequire>
          <RegionPicker onGetRegion={(e) => onGetRegion(e)} originData={region}>
            <View className='picker'>
              {
                region.map((item, index) => {
                  return (
                    <View className='item-button' key={index}>
                      <View className='item-name'>{item}</View>
                      <View className='item-arrow'></View>
                    </View>
                  )
                })
              }
            </View>
          </RegionPicker>
        </Item>
        <Item label="详细位置" isRequire>
          {
            isLook ? <Text>{content}</Text> : 
            <AtTextarea 
              maxLength={ 200 } 
              value={ content }
              onChange={(e: string) => setContent(e)}
              placeholder='详细位置在...' />
          }
        </Item>
        <Item label="图片">
          <AtImagePicker
            length={ 3 }
            files={ fileList }
            onChange={(file: any) => setFileList(file)}
          />
        </Item>
        <Item label="场地是否收费" isRequire>
          <View className='condition'>
            {
              [{ 'id': 1, 'name': '收费' }, { 'id': 2, 'name': '免费' }].map((item: any, index) => {
                return <View key={index} onClick={() => {
                  setIsCharge(item.id);
                }} className={'condition__box' + ( isCharge === item.id ? ' active' : '')}>
                  <Text>{item.name}</Text>
                </View>
              })
            }
          </View>
        </Item>
        <Item label="场地条件">
          <View className='condition'>
            {
              cond && cond.length && cond.map((item: any, index) => {
                return <View key={index} onClick={() => {
                  cond[index].checked = !cond[index].checked;
                  setCond([...cond]);
                }} className={'condition__box' + (cond[index].checked ? ' active' : '')}>
                  <Text>{item.name}</Text>
                </View>
              })
            }
          </View>
        </Item>
        <Item label="篮板数量">
          {
            isLook ? <Text>{num}</Text> : 
            <AtInputNumber 
              style={{ height: '120px' }}
              min={ 1 }
              max={ 12 } 
              step={ 1 }
              value={ num }
              width={ 200 }
              onChange={(e: number) => setNum(e)}
            />
          }
        </Item>
        <Item label="场地开放时间"></Item>
      </View>
      {
        !isLook &&  <View className="btn">
          <AtButton type='primary' onClick={() => save()}>保存</AtButton>
        </View>
      }
    </View>
  )
}

export default Detail;