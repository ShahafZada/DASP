package datastoreEntities;


import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class GameScore {
	@PrimaryKey
	@Persistent
	private Key key;
	
	@Persistent
	public Player player;
	
	@Persistent
	public Map map;
	
	@Persistent
	public String score;
	
	
	public GameScore(Player player, Map map, String score) {
		super();
		this.player = player;
		this.map = map;
		this.score = score;
	}
	
	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public Map getMap() {
		return map;
	}

	public void setMap(Map map) {
		this.map = map;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}


}
