FROM gradle:jdk17-alpine AS build
WORKDIR /app
COPY . .
RUN gradle build

FROM eclipse-temurin:17-jre-alpine
COPY --from=build /app/build/libs/*.jar tictactoe_back.jar
CMD ["java", "-jar", "tictactoe_back.jar", "--debug"]