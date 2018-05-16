rm -rf workspace
mkdir workspace
cp -r ../dist ./
cp -r ../template/download ./download
docker build -t workbench-fe .
