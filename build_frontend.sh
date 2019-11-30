cd ./frontend
yarn build
[ $? -eq 0 ] || exit $?;
rm -rf ../backend-lb3/public/*
cp -R ./dist/* ../backend-lb3/public
cd -