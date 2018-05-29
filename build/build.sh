rm -rf workspace
mkdir workspace
rm -rf ./dist
cp -r ../dist ./
cp -r ../template/download ./dist/download
docker build -t workbench-fe .
