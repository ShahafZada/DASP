package statistics;

import java.util.List;
import java.util.Vector;

import javax.jdo.JDOObjectNotFoundException;

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
    
	@SuppressWarnings("null")
	public List<GameScore> getScoreForMap(int MapNum)
    {
    	List<GameScore> after_filter = null;
    	List<GameScore> list = getAllScores();
    	for (GameScore item : list)
    		if( Integer.parseInt( item.map.getmapNum() ) == MapNum )
    			after_filter.add(item);
		return after_filter;
    }
	
	@SuppressWarnings("null")
	public Vector<Double> ScoreListToVector(int MapNum)
    {
		Vector<Double> vec = null;
    	List<GameScore> list = getScoreForMap(MapNum);
    	if (list == null)
    		return null;
    	for (GameScore item : list)
    		vec.add( (double) Integer.parseInt( item.map.getmapNum() ));
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
