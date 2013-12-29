package statistics;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.Query;

import datastoreEntities.*;
import Manager.*;


public final class StatisticsManager
 { 
    private StatisticsManager() {}
    private static StatisticsManager instance = null;
    
    
    
    public static StatisticsManager getInstance()
    {
         if (instance == null)
            instance = new StatisticsManager();
        return instance;
    }
    
	@SuppressWarnings( "unchecked" )
	public List<GameScore> getScoreForMap(int MapNum)
    {
		Query q = Manager.getPM().newQuery(GameScore.class);
		q.setFilter("mapNum==MapNum");
		q.declareParameters("String MapNum");
		return (List<GameScore>)q.execute(MapNum);
    }
	
	@SuppressWarnings("null")
	public Vector<Double> ScoreListToVector(int MapNum)
    {
		Vector<Double> vec = new Vector<Double>();
    	List<GameScore> list = getScoreForMap(MapNum);
    	if (list == null)
    		return null;
    	for (GameScore item : list)
    		vec.add( (double)item.score);
		return vec;
    }
	
    @SuppressWarnings("unchecked")
	public List<GameScore> getAllScores()
    {
    	javax.jdo.Query q = Manager.getPM().newQuery(GameScore.class);
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

}
