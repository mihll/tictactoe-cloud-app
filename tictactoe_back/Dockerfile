FROM amazoncorretto:17

RUN apt-get update -y
RUN apt-get install -y binutils

WORKDIR /app

COPY . .

RUN ./gradlew bootJar
COPY build/libs/*.jar tictactoe_back.jar

CMD ["java", "-jar", "tictactoe_back.jar"]