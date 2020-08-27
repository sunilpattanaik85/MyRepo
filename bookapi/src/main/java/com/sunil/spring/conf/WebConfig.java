package com.sunil.spring.conf;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.sunil.spring.controller"})
public class WebConfig extends WebMvcConfigurerAdapter {
	public void configureViewResolvers(ViewResolverRegistry registry) {
	    registry.jsp().prefix("/WEB-INF/views/").suffix(".jsp");
	  }
}
