cd ./experiment_app
yarn build
[ $? -eq 0 ] || exit $?;
rm -rf ../lb3_backend/client/*
cp -R ./dist/* ../lb3_backend/client
cd -