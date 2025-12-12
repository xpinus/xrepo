package top.xrepo.servant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ServantApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServantApplication.class, args);
    }

}
