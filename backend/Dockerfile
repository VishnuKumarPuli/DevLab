# ================================
# DEVLAB BACKEND - BUILD STAGE
# ================================

FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests


# ================================
# DEVLAB BACKEND - TOMCAT STAGE
# ================================

FROM tomcat:jdk25-temurin

RUN rm -rf /usr/local/tomcat/webapps/ROOT

COPY --from=build /app/target/Backend.war /usr/local/tomcat/webapps/Backend.war

EXPOSE 8080

CMD ["catalina.sh", "run"]