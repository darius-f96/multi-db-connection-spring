package tpjad2.mssql.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "tpjad2.tpjad2.repos",
        entityManagerFactoryRef = "mssqlEntityManagerFactory",
        transactionManagerRef = "mssqlTransactionManager"
)
public class MSSQLConfig {

    @Bean(name = "mssqlDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.mssql")
    public DataSource mssqlDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "mssqlEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean mssqlEntityManagerFactory(
            @Qualifier("mssqlDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setPackagesToScan("com.example.mssql.entity");
        factoryBean.setPersistenceUnitName("mssql");

        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        factoryBean.setJpaVendorAdapter(vendorAdapter);

        Properties jpaProperties = new Properties();
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.SQLServerDialect");
        factoryBean.setJpaProperties(jpaProperties);

        return factoryBean;
    }

    @Bean(name = "mssqlTransactionManager")
    public PlatformTransactionManager mssqlTransactionManager(
            @Qualifier("mssqlEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
