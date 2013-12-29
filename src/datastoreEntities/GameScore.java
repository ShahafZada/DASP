package datastoreEntities;


import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class GameScore {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private String email;
	
	@Persistent
	private int mapNum;
	
	@Persistent
	public int score;
	
	
	public GameScore(String email, int mapNum, int score) {
		super();
		this.email = email;
		this.mapNum = mapNum;
		this.score = score;
	}
	
	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String	email) {
		this.email = email;
	}

	public int getmapNum() {
		return mapNum;
	}

	public void setMap(int mapNum) {
		this.mapNum = mapNum;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}


}
