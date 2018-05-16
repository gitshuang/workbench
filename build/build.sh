rm -rf workspace
mkdir workspace
cp -r ../template/download ./download
cp -r ../dist ./
docker build -t workbench-fe .
