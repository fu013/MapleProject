# 아마 기본이미지를 ubuntu로 깔고, 자바 , 노드를 apt로 설치해야할것같음

FROM openjdk:17-jdk

# 컨테이너 안에서 gradle 빌드를 위한 툴 설치
RUN microdnf install findutils

# JAR_FILE 변수 정의
ARG JAR_FILE=./backend/build/libs/backend-0.0.1-SNAPSHOT.jar

# JAR 파일 메인 디렉토리에 복사
COPY ${JAR_FILE} app.jar

# 시스템 진입점 정의
ENTRYPOINT ["java","-jar","/app.jar"]