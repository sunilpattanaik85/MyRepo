package com.sunil.spring.conf;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import static org.hibernate.cfg.Environment.*;
@Configuration
@PropertySource("classpath:db.properties")
@EnableTransactionManagement
@ComponentScans(value = {
		@ComponentScan("com.sunil.spring.dao"),
		@ComponentScan("com.sunil.spring.service")
})
public class AppConfig {
	@Autowired
	private Environment env;
	
	@Bean
	public LocalSessionFactoryBean getSessionFactory()
	{
		LocalSessionFactoryBean factoryBean = new LocalSessionFactoryBean();
		Properties pros = new Properties();
		pros.put(DRIVER, env.getProperty("mysql.driver"));
		//pros.put(DIALECT, env.getProperty("mysql.dilect"));
		pros.put(URL, env.getProperty("mysql.url"));
		pros.put(USER, env.getProperty("mysql.user"));
		pros.put(PASS, env.getProperty("mysql.password"));
		
		pros.put(SHOW_SQL, env.getProperty("hibernate.show.sql"));
		pros.put(HBM2DDL_AUTO, env.getProperty("hibername.hbm2ddl.auto"));
		
		pros.put(C3P0_MIN_SIZE, env.getProperty("hibernate.c3p0.min_size"));
		pros.put(C3P0_MAX_SIZE, env.getProperty("hibernate.c3p0.max_size"));
		pros.put(C3P0_ACQUIRE_INCREMENT, env.getProperty("hibernate.c3p0.acquire_increment"));
		pros.put(C3P0_TIMEOUT, env.getProperty("hibernate.c3p0.timeout"));
		pros.put(C3P0_MAX_STATEMENTS, env.getProperty("hibernate.c3p0.max_statement"));
		
		factoryBean.setHibernateProperties(pros);
		factoryBean.setPackagesToScan("com.sunil.spring.model");
		return factoryBean;
	}
	@Bean
	public HibernateTransactionManager getTransactionManager()
	{
		HibernateTransactionManager transactionManager = new HibernateTransactionManager();
		transactionManager.setSessionFactory(getSessionFactory().getObject());
		return transactionManager;
	}
 
}
