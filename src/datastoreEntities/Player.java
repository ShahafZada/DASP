package datastoreEntities;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.IdentityType;

import org.apache.commons.codec.binary.Base64;


@PersistenceCapable(identityType = IdentityType.APPLICATION)
public class Player {
	@PrimaryKey
	@Persistent
	private String email;

	@Persistent
	private String firstName;

	@Persistent
	private String lastName;

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

	@Persistent
	private String userType;

	@Persistent
	private String passwordHash; //the base64 encoded SHA1 hashed password + added salt

	@Persistent
	private String passwordSalt;  // the random salt added to the password

	public Player(String firstName, String lastName, String email, String password, String age, String sex, String country, String city, String education, String picture)  throws NoSuchAlgorithmException, UnsupportedEncodingException{

		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.age = age;
		this.sex = sex;
		this.country = country;
		this.city = city;
		this.education = education;
		this.totalPlayTime = 0;
		this.picture = picture;
		if(password.equals("123")) {
			this.userType = "Admin";
		}
		else {
			this.userType = "Player";
		}
		PasswordAndSalt passwordAndSalt = new PasswordAndSalt(password);
		this.passwordHash = passwordAndSalt.getPasswordHash();
		this.passwordSalt = passwordAndSalt.getPasswordSalt();
	}


	public String getUserType() {
		return userType;
	}


	public void setUserType(String userType) {
		this.userType = userType;
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

	/**
	 * 
	 * inner class for generating hashed passwords and salt
	 *
	 */
	private class PasswordAndSalt{
		private String passwordHash;
		private String passwordSalt;		

		/**
		 * @return passwordHash returns the SHA1 hashed, salted and Base64 encoded password
		 */
		public String getPasswordHash() {
			return passwordHash;
		}

		/**
		 * @return passwordSalt return the random generated Base 64 encoded salt
		 */
		public String getPasswordSalt() {
			return passwordSalt;
		}
		
		
		/**
		 * Creates an Object containing a SHA1 hashed, salted and Base64 encoded password string
		 * and Base 64 encoded salt string based on a unencrypted password 
		 * 
		 * @param password should be unencrypted 
		 * @throws NoSuchAlgorithmException if SHA1 hashing is not supported
		 * @throws UnsupportedEncodingException if UTF-8 encoding is not supported
		 */
		public PasswordAndSalt(String password) throws NoSuchAlgorithmException, UnsupportedEncodingException {
			byte[] bSalt = new byte[8];
			SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
			random.nextBytes(bSalt);
			byte[] bDigest = getHash(password,bSalt);
	
			byte[] passwordHashBytes = Base64.encodeBase64(bDigest);
			byte[] passwordSaltBytes = Base64.encodeBase64(bSalt);
			this.passwordHash = new String(passwordHashBytes, "UTF-8"); 
			this.passwordSalt = new String(passwordSaltBytes, "UTF-8"); 
		}
	};
	
	/**
	 * Creates an SHA-1 hash based on unencrypted password and salt
	 * 
	 * @param password
	 * @param salt
	 * @return SHA-1 hash based on unencrypted password and salt 
	 * @throws NoSuchAlgorithmException if SHA1 hashing is not supported
	 * @throws UnsupportedEncodingException if UTF-8 encoding is not supported
	 */
	private byte[] getHash(String password, byte[] salt) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest digest = MessageDigest.getInstance("SHA-1");
	    digest.reset();
	    digest.update(salt);
	    byte[] input = digest.digest(password.getBytes("UTF-8"));
	    digest.reset();
	    input = digest.digest(input);
	    return input;
	   }
	
	/**
	 * Checks for the user
	 * 
	 * @param password unencrypted password 
	 * @return Returns true if the unencrypted password matches the stored hashed password.
	 * Returns false if the password does not match or the URF-8 encoding or SHA1 hashing is not supported	
	 */
	public boolean authenticate(String password) {
		byte[] passwordHashBytes = this.passwordHash.getBytes();
		byte[] passwordSaltBytes = this.passwordSalt.getBytes();
		byte[] bDigest = Base64.decodeBase64(passwordHashBytes);
		byte[] bSalt = Base64.decodeBase64(passwordSaltBytes);
		byte[] proposedDigest = null;
		try {
			proposedDigest = getHash(password, bSalt);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace(); //TODO add some log information
			return false;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace(); //TODO add some log information
			return false;
		}

		return Arrays.equals(proposedDigest, bDigest);
	}
	

}
