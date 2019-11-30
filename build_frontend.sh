cd ./frontend
yarn build
[ $? -eq 0 ] || exit $?;
rm -rf ../backend/public/*
cp -R ./dist/* ../backend/public
cd -