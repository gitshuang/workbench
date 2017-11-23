import React, { Component } from 'react';
import FormControl from 'bee-form-control';
import Button from 'bee-button';
import Icon from 'bee-icon';
import InputGroup from 'bee-input-group';
import {bg,wrap,clearfix,serviceSearch,hotService,classify,class1,class2,services,serviceInfo,serviceTit,describe,servicePic,singleService} from './style.css';

class serviceClassify extends Component {

  constructor(props) {
    super(props);
  } 
  render() { 
    return (
      <div className={bg}>
        <div className={wrap}>
          <InputGroup className={serviceSearch}>
            <InputGroup.Button shape="border"></InputGroup.Button>
            <FormControl type="text" />
            <InputGroup.Button>
              <Button><span className="uf uf-search">搜索</span></Button>
            </InputGroup.Button>
          </InputGroup>
          <div className={hotService}>
            <span>热门服务：</span>
            <ul>
              <li>友报账</li>
              <li>友人才</li>
              <li>友空间</li>
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
          </div>
        </div>
      </div>
    )
  }
}

export default serviceClassify;