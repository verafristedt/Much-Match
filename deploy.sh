#!/usr/bin/env bash
APP_NAME=much-match
ORG_NAME="Projets Valentin"
SPACE_NAME=dev
GEO=eu-de

# prompt user wether to build frontend or not
if [ $# -eq 1 ] && [ $1 = "build-frontend" ]
then
  rep=1
fi
if [ $# -eq 1 ] && [ $1 = "do-not-build" ]
then
  rep=0
else
  read -p 'Do you want to rebuild frontend? [y/N] ' -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    rep=1
  else
    rep=0
  fi
fi

# rebuild frontend if needed
if [ $rep -eq 1 ]
then
    echo "Re-building frontend"
    ./build_frontend.sh
fi

cd backend

npm run build

set -x
ibmcloud target -r ${GEO} -o "$ORG_NAME" -s ${SPACE_NAME}
[ $? -eq 0 ] || exit $?;
ibmcloud cf delete ${APP_NAME}_old -f
[ $? -eq 0 ] || exit $?;
if ibmcloud cf apps |grep -q ${APP_NAME}; then
    ibmcloud cf rename ${APP_NAME} ${APP_NAME}_old
    [ $? -eq 0 ] || exit $?;
fi
ibmcloud cf push ${APP_NAME} -f manifest.yml
[ $? -eq 0 ] || exit $?;
ibmcloud cf stop ${APP_NAME}_old
[ $? -eq 0 ] || exit $?;
set +x

cd -
