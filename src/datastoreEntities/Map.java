package datastoreEntities;

import java.util.List;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class Map {
	@PrimaryKey
    @Persistent
    private String mapNum;

    @Persistent
    private String mapName;
    
    @Persistent
    private String level;

	@Persistent
    private List<Node> nodes;
	
	@Persistent
    private List<Integer> solutionPath;
	

	public Map(String mapNum, String mapName, String level, List<Node> nodes, List<Integer> solutionPath) {
		this.mapNum = mapNum;
		this.mapName = mapName;
		this.level = level;
		this.nodes = nodes;
		this.solutionPath = solutionPath;
	}

	public String getmapNum() {
		return mapNum;
	}

	public List<Integer> getSolutionPath() {
		return solutionPath;
	}

	public void setSolutionPath(List<Integer> solutionPath) {
		this.solutionPath = solutionPath;
	}

	public void setmapNum(String mapNum) {
		this.mapNum = mapNum;
	}

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public List<Node> getNodes() {
		return nodes;
	}

	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}

}
