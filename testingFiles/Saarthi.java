package com.Saarthi;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import  static org.testng.Assert.*;

import java.util.Random;

import org.testng.annotations.*;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Saarthi {
	WebDriver driver;
	SoftAssert softAssert;
	@BeforeSuite()
	public void Initialise() throws Exception {
		WebDriverManager.chromedriver().setup();
		driver= new ChromeDriver();
		softAssert=new SoftAssert();
		driver.manage().window().maximize();
		driver.get("http://localhost:5173/");
		System.out.println("Driver started working");
		
	}
	@AfterSuite(alwaysRun = true)
	public void dispose() {
//		softAssert.assertAll();
		System.out.println("Test Done");
		driver.close();
	}
	@Test
	public void AdminLogin() throws Exception {
		WebElement user= driver.findElement(By.id("username")); 
	    user.clear();
	    user.sendKeys("akataria_be21@thapar.edu");
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.clear();
	    pass.sendKeys("123456");
		driver.findElement(By.id("login")).click();
		softAssert.assertEquals(driver.findElement(By.id("errmsg")).getAttribute("value"),"","Failed to Login");
		Thread.sleep(6000);

	}
	@Test
	public void AdminTestLogin1() throws Exception {
	    WebElement user= driver.findElement(By.id("username")); 
	    user.sendKeys("");
	    user.sendKeys("akataria_be21@thapar.edu");
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.sendKeys("");
	    pass.sendKeys("123455");
		driver.findElement(By.id("login")).click();
		Thread.sleep(6000);
		String actualUrl=driver.findElement(By.id("errmsg")).getAttribute("value");
		String expectedUrl="The password you provided is incorrect";
		softAssert.assertEquals(actualUrl,expectedUrl,"Incorect Password");
		
	}
	@Test
	public void AdminTestLogin2() throws Exception {
		WebElement user= driver.findElement(By.id("username")); 
	    user.clear();
	    user.sendKeys("akataria_be21@thapr.edu");
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.clear();
	    pass.sendKeys("123455"); 
		driver.findElement(By.id("login")).click();
		Thread.sleep(6000);
		String actualUrl=driver.findElement(By.id("errmsg")).getAttribute("value");
		String expectedUrl="User with specified email address doesn't exist";
		softAssert.assertEquals(actualUrl,expectedUrl,"Email address does not exist");
	}
	
	@Test
	public void MoveToHome() throws Exception{
		Thread.sleep(2000);
		driver.findElement(By.id("go-to-home")).click();
		Thread.sleep(2000);
	}
	@Test
	public void MoveToDeo() throws Exception{
		Thread.sleep(3000);
		final WebElement btn=
		driver.findElement(By.id("manage-deo"));
		if(btn.isDisplayed()) {
		    btn.click();
		}else {
		assertTrue(false,"No Button Found");
		}
		Thread.sleep(2000);
	}
	@Test
	
	public void AddDeo() throws Exception {
		WebElement addName = driver.findElement(By.id("username"));
		addName.sendKeys("Ayush Singh");
		Thread.sleep(1000);
		WebElement addEmail  = driver.findElement(By.id("email"));
		addEmail.isEnabled();
		addEmail.sendKeys("akatarasaia_be21@thapar.edu");
		Thread.sleep(1000);
        System.out.println("Checking Edge Cases for Create Deo Account");

        WebElement pass=driver.findElement(By.id("password"));
        WebElement btn=driver.findElement(By.id("add-deo"));
        WebElement errMsg=driver.findElement(By.id("errRef"));
        String[] passwords = { "ayus12", "ayush12345",
               "AYUSH12345" ,"Ayush12345","AyushSingh","Ayush@12345"};
        String[] constraints = {
        	    "Password is too short (minimum length is 8 characters).",
        	    "Password must contain at least one uppercase letter.",
        	    "Password must contain at least one lowercase letter.",
        	    "Password must contain at least one digit.",
        	    "Password must contain at least one special character."
        	};
        for (int i = 0; i < passwords.length; i++) {
            pass.clear();
            pass.sendKeys(passwords[i]);
            btn.click();
            Thread.sleep(8000);
            if (i !=5) {
                softAssert.assertEquals(errMsg.getAttribute("value"),
                        constraints[i],
                        "Password validation message is not displayed for password: " + passwords[i]);
            } 
        }
        System.out.println("All Edge Cases Checked");
        Thread.sleep(7000);
//        softAssert.assertAll();
    }
	@Test
	public void LogOut() throws Exception{
		Thread.sleep(3000);
		driver.findElement(By.id("logout-btn")).click();
		Thread.sleep(2000);
		
	}
	@Test
	public void DeoTestLogin() throws Exception {
		WebElement user= driver.findElement(By.id("username")); 
	    user.clear();
	    user.sendKeys("akatarasaia_be21@thapar.edu");
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.clear();
	    pass.sendKeys("Ayush@12345");
		driver.findElement(By.id("login")).click();
		softAssert.assertEquals(driver.findElement(By.id("errmsg")).getAttribute("value"),"","Failed to Login");
		Thread.sleep(6000);

	}
	
//	 public String generateDummyPassword(Integer length) {
//	        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//	        StringBuilder password = new StringBuilder();
//	        Random random = new Random();
//	        
//	        for (int i = 0; i < length; i++) {
//	            int index = random.nextInt(characters.length());
//	            password.append(characters.charAt(index));
//	        }
//	        String pass=password.toString();
//	        return pass;
//	}



	


}
