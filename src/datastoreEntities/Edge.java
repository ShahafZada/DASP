package datastoreEntities;


import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class Edge {

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

	@Persistent
    private int pointedNodeID;
	
    @Persistent
    private boolean isMarked;

    @Persistent
    private boolean passedThrough;
    
    @Persistent
    private String color;
    
    @Persistent
    private int weight;

    public Edge(int pointedNodeID , boolean isMarked , boolean passedThrough, String color, int weight){

		this.pointedNodeID = pointedNodeID;
		this.isMarked = isMarked;
		this.passedThrough = passedThrough;
		this.color = color;
		this.weight = weight;
	}

	public int getPointedNodeID() {
		return pointedNodeID;
	}

	public void setPointedNodeID(int pointedNodeID) {
		this.pointedNodeID = pointedNodeID;
	}

	public boolean isMarked() {
		return isMarked;
	}

	public void setMarked(boolean isMarked) {
		this.isMarked = isMarked;
	}

	public boolean isPassedThrough() {
		return passedThrough;
	}

	public void setPassedThrough(boolean passedThrough) {
		this.passedThrough = passedThrough;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

}
