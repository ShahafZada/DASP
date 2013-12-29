
package dbManager;

import java.util.List;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.Query;

import datastoreEntities.GameScore;
import datastoreEntities.Map;
import datastoreEntities.Player;
import Manager.*;

public final class DataBaseManager
{  
	private DataBaseManager() {}
	private static DataBaseManager instance = null;
	public static DataBaseManager getInstance()
	{
		if (instance == null)
			instance = new DataBaseManager();
		return instance;
	}


	public void insertNewScore(GameScore s)
	{
		Manager.getPM().makePersistent(s);
	}

	@SuppressWarnings("unchecked")
	public List<GameScore> getScoreForPlayer(String name)
	{
		Query q = Manager.getPM().newQuery(GameScore.class);
		q.setFilter("name==theName");
		q.declareParameters("String theName");
		return (List<GameScore>)q.execute(name);
	}
	@SuppressWarnings("unchecked")
	public List<GameScore> getAllScores()
	{
		Query q = Manager.getPM().newQuery(GameScore.class);
		return (List<GameScore>)q.execute();
	}


	public void insertNewPlayer(Player player) {
		Manager.getPM().makePersistent(player);

	}


	public boolean findElementById(Object oid) {

		try {
			Manager.getPM().getObjectById(Player.class, oid);

		} catch (JDOObjectNotFoundException  e) {
			//New User
			return false;
		}
		return true;
	}

	public Player findPlayer(Object email, Object password) {

		Player player = null;

		try {
			player = Manager.getPM().getObjectById(Player.class, email);
		}
		catch (JDOObjectNotFoundException  e) {
			return null;  
		}
		if (player.authenticate((String)password)) {
			return player;
		}
		return null; //password not correct case

	}


	public Player getPlayerByEmail(String email) {
		Player player = null;

		try {
			player = Manager.getPM().getObjectById(Player.class, email);
		}
		catch (JDOObjectNotFoundException  e) {
			return null;  
		}
		return player; //password not correct case
	}


	public Map getMapByNum(String map_num) {

		Map map = null;
		try {
			Query query = Manager.getPM().newQuery(Map.class);
			query.setFilter("mapNum == map_num");
			query.declareParameters("String map_num");

			@SuppressWarnings("unchecked")
			List<Map> maps = (List<Map>) query.execute(map_num);
			for (Map resultmap : maps) {
				map = resultmap;
				break;
			}
			if (map != null){
				return map;
			} else {
				return null;  
			}
		} catch (JDOObjectNotFoundException  e) {
			return null;  
		}

	}

	public void insertNewMap(Map map) {
		Manager.getPM().makePersistent(map);
	}


}

