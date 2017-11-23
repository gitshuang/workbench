import React, { Component } from 'react';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import Icon from 'bee-icon';
import InputGroup from 'bee-input-group';
import AutoComplete from 'bee-autocomplete';
import {bg,wrap,clearfix,serviceSearch,ufSearch,hotService,classify,class1,class2,services,serviceInfo,serviceTit,describe,servicePic,singleService } from './style.css';

class serviceClassify extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: ['友空间', '友人才', '友报账', '友报账','友报账'],
      placeholder: "搜索相关服务",
      disabled: false,
    }
    this.onFormChange = this.onFormChange.bind(this);
  } 
  onFormChange(value) {
    this.setState({
        value: value
    })
  }
  render() { 
    let {value ,options,placeholder,disabled } = this.state;
    return (
      <div className={bg}>
        <div className={wrap}>
          <InputGroup className={serviceSearch}>
            <AutoComplete
              value={value}
              disabled={disabled}
              options={options}
              placeholder={placeholder}
              onValueChange={value => this.onFormChange(value)}
            />
            <InputGroup.Button>
              <Button><Icon type="uf-search" className={ufSearch}><span>搜索</span></Icon></Button>
            </InputGroup.Button>
          </InputGroup>
          <div className={hotService}>
            <span>热门服务：</span>
            <ul>
              <li><a href="##">友报账</a></li>
              <li><a href="##">友人才</a></li>
              <li><a href="##">友空间</a></li>
            </ul>
          </div>
          <div className={classify}>
            <dl className={`${class1} ${clearfix}`}>
              <dt>分类一</dt>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友空间</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
            <dl className={`${class2} ${clearfix}`}>
              <dt>分类二</dt>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
              <dd>
                <div className={`${singleService} ${clearfix}`}>
                  <img className={servicePic}></img>
                  <div className={`${services} ${clearfix}`}>
                    <div className={`${serviceInfo}`}>
                      <div className={serviceTit}>友报账</div>
                      <div className={describe}>沟通协作一步到位</div>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;