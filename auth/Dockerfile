FROM maven:3.8.4-openjdk-17-slim AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim AS final

WORKDIR /app

COPY --from=builder /app/target/eventport-auth.jar ./target/eventport-auth.jar

EXPOSE 8101

ENTRYPOINT ["java", "-jar", "target/eventport-auth.jar", "--spring.config.location=file:/etc/secrets/application.yml"]
