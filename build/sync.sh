#!/bin/bash

INDEX_HTML_FILE=/Users/zhengxingcheng/work/yonyou/cloud-os_fe/dist/index.html
JAVA_PROJECT_PATH=/Users/zhengxingcheng/work/yonyou/cloud-os/workbench-parent/workbench-web/src/main/resources/static



cd $JAVA_PROJECT_PATH

git reset --hard
git checkout develop
git pull origin develop

cp -rf $INDEX_HTML_FILE $JAVA_PROJECT_PATH

git add ./
git commit -m '重新构建前端功能'
git push origin develop
