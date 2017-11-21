rm -rf workspace
mkdir workspace
cp -r ../dist ./
docker build -t workbench-fe .
