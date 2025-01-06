FROM maven:3.9.9-amazoncorretto-21-alpine as builder
WORKDIR /app
COPY . .
RUN mvn clean package

FROM quay.io/wildfly/wildfly

COPY --from=builder /app/target/tpjad2-0.0.1-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]

RUN /opt/jboss/wildfly/bin/add-user.sh sefu IloveTPJAD1 --silent

EXPOSE 8080 9990