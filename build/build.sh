rm -rf workspace
mkdir workspace
rm -rf ./dist
cp -r ../dist ./
cp -r ../template/download ./dist/download
rm -rf ./zh_CN
cp -r ../zh_CN ./
cp -r ../template/download ./zh_CN/download
rm -rf ./en_US
cp -r ../en_US ./
cp -r ../template/download ./en_US/download
rm -rf ./zh_TW
cp -r ../zh_TW ./
cp -r ../template/download ./zh_TW/download
docker build -t workbench-fe .
