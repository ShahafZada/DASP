package datastoreEntities;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class Player {
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

    @Persistent
    private String firstName;
    
    @Persistent
    private String lastName;

    @Persistent
    private String email;

    @Persistent
    private String password;
    
    @Persistent
    private String age;
    
    @Persistent
    private String sex;
    
    @Persistent
    private String country;
    
    @Persistent
    private String city;
    
    @Persistent
    private String education;
    
    @Persistent
    private long totalPlayTime; //in minutes
    
    @Persistent
    private String picture; //the picture path
	
	
	public Player(String firstName, String lastName, String email, String password, String age, String sex, String country, String city, String education, String picture) {
		
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
	    this.age = age;
	    this.sex = sex;
	    this.country = country;
	    this.city = city;
	    this.education = education;
	    this.totalPlayTime = 0;
	    this.picture = picture;
	}

	
    public Key getKey() {
        return key;
    }

    
    public String getFirstName() {
        return firstName;
    }
    
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    
    public String getLastName() {
        return lastName;
    }

    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    
    public String getEmail() {
        return email;
    }

    
    public void setEmail(String email) {
        this.email = email;
    }

    
    public String getPassword() {
        return password;
    }
    
    
    public void setPassword(String password) {
        this.password = password;
    }
    
	
    public String getAge() {
		return age;
	}


	public void setAge(String age) {
		this.age = age;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}

	
	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getEducation() {
		return education;
	}


	public void setEducation(String education) {
		this.education = education;
	}


	public long getTotalPlayTime() {
		return totalPlayTime;
	}


	public void setTotalPlayTime(long totalPlayTime) {
		this.totalPlayTime = totalPlayTime;
	}


	public String getPicture() {
		return picture;
	}


	public void setPicture(String picture) {
		this.picture = picture;
	}

}
