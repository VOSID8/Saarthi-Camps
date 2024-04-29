package com.Saarthi;


import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import  static org.testng.Assert.*;

import java.util.Random;

import org.testng.annotations.*;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import io.github.bonigarcia.wdm.WebDriverManager;

public class Saarthi {
	WebDriver driver;
	SoftAssert softAssert;
	String id="";
	String deoEmail="jdsbfjdbjkdfdf3443bjb@gmail.com";
	String docEmail="bfsjkgbk343jdfdffbj@gmail.com";
	@BeforeTest(alwaysRun=true)
	public void Initialise() throws Exception {
		WebDriverManager.chromedriver().setup();
		driver= new ChromeDriver();
		softAssert=new SoftAssert();
		driver.manage().window().maximize();
		driver.get("http://localhost:5173/");
		System.out.println("Driver started working");
		Thread.sleep(2000);
		
		
	}
	@AfterTest(alwaysRun = true)
	public void dispose() throws Exception {
		softAssert.assertAll();
		System.out.println("1 Test Done");
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
		Thread.sleep(6000);

	}
	@Test
	public void AdminTestLogin1() throws Exception {
	    WebElement user= driver.findElement(By.id("username")); 
	    user.clear();
	    user.sendKeys("akataria_be21@thapar.edu");
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.clear();
	    pass.sendKeys("123455");
		driver.findElement(By.id("login")).click();
		Thread.sleep(7000);
		
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
		Thread.sleep(7000);
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
		addEmail.sendKeys(deoEmail);
		Thread.sleep(1000);
        System.out.println("Checking Edge Cases for Create Deo Account");

        WebElement pass=driver.findElement(By.id("password"));
        WebElement btn=driver.findElement(By.id("add-deo"));
       
        String[] passwords = { "ayus12", "ayush12345",
               "AYUSH12345" ,"AyushSingh","Ayush1234","Ayush@12345"};
        for (int i = 0; i < passwords.length; i++) {
            pass.clear();
            pass.sendKeys(passwords[i]);
            btn.click();
            Thread.sleep(9000);
            
        }
        System.out.println("All Edge Cases Checked");
        Thread.sleep(9000);
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
	    user.sendKeys(deoEmail);
	    WebElement pass=driver.findElement(By.id("password")); 
	    pass.clear();
	    pass.sendKeys("Ayush@12345");
		driver.findElement(By.id("login")).click();
		Thread.sleep(9000);

	}
	@Test
	
	public void MoveToDoc() throws Exception{
		Thread.sleep(3000);
		driver.findElement(By.id("add-doctor")).click();
		Thread.sleep(2000);
	}
	@Test
	public void AddDoc() throws Exception{
		WebElement addName = driver.findElement(By.id("username"));
		addName.sendKeys("Ayush Singh");
		Thread.sleep(1000);
		WebElement addEmail  = driver.findElement(By.id("email"));
		addEmail.isEnabled();
		addEmail.sendKeys(docEmail);
		Thread.sleep(1000);
        WebElement addSpec  = driver.findElement(By.id("specialization"));
		addEmail.isEnabled();
		Select dropdown = new Select(addSpec);
		dropdown.selectByVisibleText("Internal Medicine Physician");
        WebElement btn=driver.findElement(By.id("add-doc"));
        btn.click();
        Thread.sleep(8000);
        Thread.sleep(5000);
        
	}
	
	
	@Test
	public void AddRefugee() throws Exception{
		WebElement addImage = driver.findElement(By.id("file"));
		addImage.sendKeys("C:/Users/Lenovo/Downloads/undraw_Pic_profile_re_7g2h.png");
		Thread.sleep(1000);
		
		WebElement addName  = driver.findElement(By.id("name"));
		addName.sendKeys("Ayush Kumar Singh");
		driver.findElement(By.id("female")).click();

		WebElement addDob  = driver.findElement(By.id("dob"));
		addDob.sendKeys("07/08/2003");
		
		driver.findElement(By.id("submit-form")).click();
		
        Thread.sleep(15000);
        WebElement refugeeId=driver.findElement(By.id("refugeeId"));
        String refugee= refugeeId.getText();
        id=refugee;
        System.out.print(refugee);
        Thread.sleep(2000);
	}
	@Test
	public void moveToViewDetails() throws Exception{
		Thread.sleep(4000);
		driver.findElement(By.id("view-details")).click();
		Thread.sleep(3000);
	}
	@Test
	public void viewRefugeeDetails()throws Exception{
		WebElement enterId = driver.findElement(By.id("enter_id"));
		enterId.sendKeys(id);
		Thread.sleep(1000);
		driver.findElement(By.id("submit_id")).click();
        Thread.sleep(14000);
	}
	@Test 
	public void moveToRefugeeForm() throws Exception{
		Thread.sleep(4000);
		driver.findElement(By.id("add-refugee")).click();
		Thread.sleep(3000);
	}
	@Test
	public void moveToAddMedicinePage() throws Exception{
		Thread.sleep(4000);
		driver.findElement(By.id("add-medicine")).click();
		Thread.sleep(3000);
	}
	
	@Test
	public void addMedicine()throws Exception{
		id="hdsfghd65";
		WebElement enterId = driver.findElement(By.id("refugee_id"));
		enterId.sendKeys(id);
		Thread.sleep(1000);
		WebElement enterMed = driver.findElement(By.id("medicine_name"));
		enterMed.sendKeys("Paracetamol");
		Thread.sleep(1000);
		WebElement enterQuant = driver.findElement(By.id("quantity"));
		enterQuant.sendKeys("10");
		Thread.sleep(1000);
		driver.findElement(By.id("moderate")).click();
		Thread.sleep(1000);
		driver.findElement(By.id("submit_medicine_btn")).click();
        Thread.sleep(25000);
       
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
