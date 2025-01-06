# Use the WildFly base image
FROM quay.io/wildfly/wildfly:28.0.1.Final

WORKDIR /opt/jboss/wildfly/standalone/deployments/

# Copy the WAR file into WildFly's deployment directory
COPY target/tpjad2.war tpjad2.war

EXPOSE 8080

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0"]

RUN /opt/jboss/wildfly/bin/add-user.sh sefu IloveTPJAD1 --silent
