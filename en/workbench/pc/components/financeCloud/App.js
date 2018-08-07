import React from 'react';
import FinanceCloud from 'ficloud-workbench';
import { findPath } from '@u';
import 'ficloud-workbench/dist/ficloud-workbench.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateCurrent=this.updateCurrent.bind(this);
    this.state = {
      'menuItems': [
        {
          'createTime': 1531363982000,
          'modifiedTime': 1531363982000,
          'ts': 1531363982000,
          'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'tenantId': 'vspcvrrj',
          'menuItemId': '81ce9334-2c2d-4741-9b77-22549d360dc6',
          'menuItemName': '首页_en',
          'menuItemCode': 'yzbmenu001',
          'menuItemIcon': '',
          'parentId': null,
          'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
          'menuItemDefault': true,
          'serviceId': 'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
          'menuItemOrder': 0,
          'url': 'http://yzb.yyssc.org/home_index.html#/default',
          'service': {
            'createTime': 1531363982000,
            'modifiedTime': 1530845625000,
            'ts': 1531363982000,
            'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
            'tenantId': 'vspcvrrj',
            'serviceId': 'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
            'title': ' 首页_en',
            'serviceCode': 'mywork',
            'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
            'enable': true,
            'url': 'http://yzb.yyssc.org/home_index.html#/default',
            'serviceIcon': '',
            'capable': false,
            'ykjId': 0,
            'level': 0,
            'teamMenbersUnuse': false,
            'crossTenant': false,
            'selected': false,
            'simpleApplicationStatus': false,
            'clientStatus': false,
            'webStatus': true,
            'phoneStatus': false,
            'everyone': false,
            'sysEveryone': false,
            'phoneOrder': 0,
            'businessType': 'mng',
            'hasWidget': false,
            'relationServices': [],
            'relationUsers': []
          },
          'serviceCode': 'mywork',
          'children': []
        },
        {
          'createTime': 1531363982000,
          'modifiedTime': 1531363982000,
          'ts': 1531363982000,
          'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'tenantId': 'vspcvrrj',
          'menuItemId': 'ce2b91c1-ac82-478c-a28d-b520086140de',
          'menuItemName': '凭证_en',
          'menuItemCode': 'yzbmenu002',
          'menuItemIcon': '',
          'parentId': null,
          'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
          'menuItemDefault': true,
          'serviceId': '68140c71-2bde-4c67-a97b-72506578ea69',
          'menuItemOrder': 0,
          'url': null,
          'service': {
            'createTime': 1531363982000,
            'modifiedTime': 1530847644000,
            'ts': 1531363982000,
            'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
            'tenantId': 'vspcvrrj',
            'serviceId': '68140c71-2bde-4c67-a97b-72506578ea69',
            'title': '凭证_en',
            'serviceCode': 'CWYFWYBZ00002',
            'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
            'enable': true,
            'url': '',
            'serviceIcon': '',
            'capable': false,
            'ykjId': 1,
            'level': 0,
            'teamMenbersUnuse': false,
            'crossTenant': false,
            'selected': false,
            'simpleApplicationStatus': false,
            'clientStatus': false,
            'webStatus': true,
            'phoneStatus': false,
            'everyone': false,
            'sysEveryone': false,
            'phoneOrder': 0,
            'businessType': 'mng',
            'hasWidget': false,
            'relationServices': [],
            'relationUsers': []
          },
          'serviceCode': 'CWYFWYBZ00002',
          'children': [
            {
              'createTime': 1531363982000,
              'modifiedTime': 1531363982000,
              'ts': 1531363982000,
              'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'tenantId': 'vspcvrrj',
              'menuItemId': '191de39b-0824-44ca-8986-1aac8e3b91e9',
              'menuItemName': '新增凭证_en',
              'menuItemCode': 'PZCX0006',
              'menuItemIcon': '',
              'parentId': 'ce2b91c1-ac82-478c-a28d-b520086140de',
              'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
              'menuItemDefault': false,
              'serviceId': '18ad578f-3d07-42f3-87d0-1d0e93fdd0af',
              'menuItemOrder': 1,
              'url': null,
              'service': {
                'createTime': 1531363982000,
                'modifiedTime': 1530845625000,
                'ts': 1531363982000,
                'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
                'tenantId': 'vspcvrrj',
                'serviceId': '18ad578f-3d07-42f3-87d0-1d0e93fdd0af',
                'title': ' 新增凭证_en',
                'serviceCode': 'addvoucher',
                'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
                'enable': true,
                'url': 'http://yzb.yyssc.org/home_index.html#/voucher/edit',
                'serviceIcon': '',
                'capable': false,
                'ykjId': 0,
                'level': 0,
                'teamMenbersUnuse': false,
                'crossTenant': false,
                'selected': false,
                'simpleApplicationStatus': false,
                'clientStatus': false,
                'webStatus': true,
                'phoneStatus': false,
                'everyone': false,
                'sysEveryone': false,
                'phoneOrder': 0,
                'businessType': 'mng',
                'hasWidget': false,
                'relationServices': [],
                'relationUsers': []
              },
              'serviceCode': 'addvoucher',
              'children': []
            }, {
              'createTime': 1531363982000,
              'modifiedTime': 1531363982000,
              'ts': 1531363982000,
              'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'tenantId': 'vspcvrrj',
              'menuItemId': '891de39b-0824-44ca-8986-1aac8e3b91e9',
              'menuItemName': '凭证查询_en',
              'menuItemCode': 'PZCX0001',
              'menuItemIcon': '',
              'parentId': 'ce2b91c1-ac82-478c-a28d-b520086140de',
              'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
              'menuItemDefault': false,
              'serviceId': 'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
              'menuItemOrder': 1,
              'url': null,
              'service': {
                'createTime': 1531363982000,
                'modifiedTime': 1530845625000,
                'ts': 1531363982000,
                'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
                'tenantId': 'vspcvrrj',
                'serviceId': 'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
                'title': ' 凭证查询_en',
                'serviceCode': 'queryvoucher',
                'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
                'enable': true,
                'url': 'http://yzb.yyssc.org/home_index.html#/voucher/list',
                'serviceIcon': '',
                'capable': false,
                'ykjId': 0,
                'level': 0,
                'teamMenbersUnuse': false,
                'crossTenant': false,
                'selected': false,
                'simpleApplicationStatus': false,
                'clientStatus': false,
                'webStatus': true,
                'phoneStatus': false,
                'everyone': false,
                'sysEveryone': false,
                'phoneOrder': 0,
                'businessType': 'mng',
                'hasWidget': false,
                'relationServices': [],
                'relationUsers': []
              },
              'serviceCode': 'queryvoucher',
              'children': []
            }
          ]
        }, {
          'createTime': 1531363982000,
          'modifiedTime': 1531363982000,
          'ts': 1531363982000,
          'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
          'tenantId': 'vspcvrrj',
          'menuItemId': '0e2b91c1-ac82-478c-a28d-b520086140de',
          'menuItemName': '财务处理_en',
          'menuItemCode': 'yzbmenu003',
          'menuItemIcon': '',
          'parentId': null,
          'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
          'menuItemDefault': true,
          'serviceId': '08140c71-2bde-4c67-a97b-72506578ea69',
          'menuItemOrder': 0,
          'url': null,
          'service': {
            'createTime': 1531363982000,
            'modifiedTime': 1530847644000,
            'ts': 1531363982000,
            'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
            'tenantId': 'vspcvrrj',
            'serviceId': '08140c71-2bde-4c67-a97b-72506578ea69',
            'title': '财务处理_en',
            'serviceCode': 'CWYFWYBZ00003',
            'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
            'enable': true,
            'url': '',
            'serviceIcon': '',
            'capable': false,
            'ykjId': 1,
            'level': 0,
            'teamMenbersUnuse': false,
            'crossTenant': false,
            'selected': false,
            'simpleApplicationStatus': false,
            'clientStatus': false,
            'webStatus': true,
            'phoneStatus': false,
            'everyone': false,
            'sysEveryone': false,
            'phoneOrder': 0,
            'businessType': 'mng',
            'hasWidget': false,
            'relationServices': [],
            'relationUsers': []
          },
          'serviceCode': 'CWYFWYBZ00003',
          'children': [
            {
              'createTime': 1531363982000,
              'modifiedTime': 1531363982000,
              'ts': 1531363982000,
              'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'modifier': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
              'tenantId': 'vspcvrrj',
              'menuItemId': '091de39b-0824-44ca-8986-1aac8e3b91e9',
              'menuItemName': '总账_en',
              'menuItemCode': 'PZCX0003',
              'menuItemIcon': '',
              'parentId': '0e2b91c1-ac82-478c-a28d-b520086140de',
              'menuBarId': '5353ee3c-b5ba-47c5-9402-8ba486119d4a',
              'menuItemDefault': false,
              'serviceId': '08ad578f-3d07-42f3-87d0-1d0e93fdd0af',
              'menuItemOrder': 1,
              'url': null,
              'service': {
                'createTime': 1531363982000,
                'modifiedTime': 1530845625000,
                'ts': 1531363982000,
                'creator': '530b1b30-c7da-45e8-913f-a47cb5c0ea64',
                'tenantId': 'vspcvrrj',
                'serviceId': '08ad578f-3d07-42f3-87d0-1d0e93fdd0af',
                'title': ' 总账_en',
                'serviceCode': 'general',
                'applicationId': 'b32b0b8a-47f7-4c24-9413-aa72b80fadb0',
                'enable': true,
                'url': 'http://yzb.yyssc.org/home_index.html#/account/general',
                'serviceIcon': '',
                'capable': false,
                'ykjId': 0,
                'level': 0,
                'teamMenbersUnuse': false,
                'crossTenant': false,
                'selected': false,
                'simpleApplicationStatus': false,
                'clientStatus': false,
                'webStatus': true,
                'phoneStatus': false,
                'everyone': false,
                'sysEveryone': false,
                'phoneOrder': 0,
                'businessType': 'mng',
                'hasWidget': false,
                'relationServices': [],
                'relationUsers': []
              },
              'serviceCode': 'general',
              'children': []
            }
          ]
        }
      ],
      current: {
        menuItemId: '81ce9334-2c2d-4741-9b77-22549d360dc6',
        title: '首页_en',
        //服务编码，唯一确定一个service
        serviceCode: 'mywork',
        serviceId: 'f8ad578f-3d07-42f3-87d0-1d0e93fdd0af',
        //组件内部嵌套iframe的url，此url会带有参数，形如：http://xxx.xxx.xxx/xxx?serviceCode=serv_1，iframe内部即可使用此serviceCode参数来控制属性菜单的展示
        url: 'http://yzb.yyssc.org/home_index.html#/default',
      }
    };
  };
  updateCurrent (serviceCode) {
    const menuPath = findPath(this.state.menuItems, 'children', 'serviceCode', serviceCode);
    let current = menuPath.slice(-1)[0];
    if(current){
      current=Object.assign(current,current.service);
      current.title = current.title;
      this.setState({ current });
    }
  };
  render() {
    const { menuItems,current } = this.state;

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">{current.title}</h1>
        </header>
        {
          <FinanceCloud menuItems={menuItems}  current={current} updateCurrent={this.updateCurrent}/>
        }

      </div>
    );
  }
}

export default App;
