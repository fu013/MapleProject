#!/bin/bash

REPOSITORY=/home/ubuntu/seungchan
PROJECT_NAME=backend

cd $REPOSITORY

echo "> 깃허브 pull"

git pull origin master

cd $REPOSITORY/$PROJECT_NAME/

echo "> 프로젝트 빌드 시작"

./gradlew build

echo "> 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/


echo "> 현재 구동중인 애플리케이션 pid 확인"

CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션 pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sudo fuser -k 8080/tcp
        sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/ | grep jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

cd $REPOSITORY/$PROJECT_NAME/build/libs

java -jar backend-0.0.1-SNAPSHOT.jar &

