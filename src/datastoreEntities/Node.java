package datastoreEntities;

import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;


@PersistenceCapable
public class Node {
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;
	
	@Persistent
    private int id;
	
    @Persistent
    private double x;

    @Persistent
    private double y;
    
    @Persistent
    private double radius;
    
    @Persistent
    private boolean isStart;
    
    @Persistent
    private boolean isMarked;
	
	@Persistent
    private List<Node> edges;

    public Node(Key key, int id, double x, double y, double radius, boolean isStart, boolean isMarked, List<Node> edges) {

		this.key = key;
		this.id = id;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.isStart = isStart;
		this.isMarked = isMarked;
		this.edges = edges;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getRadius() {
		return radius;
	}

	public void setRadius(double radius) {
		this.radius = radius;
	}

	public boolean isStart() {
		return isStart;
	}

	public void setStart(boolean isStart) {
		this.isStart = isStart;
	}

	public boolean isMarked() {
		return isMarked;
	}

	public void setMarked(boolean isMarked) {
		this.isMarked = isMarked;
	}

	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public List<Node> getEdges() {
		return edges;
	}

	public void setEdges(List<Node> edges) {
		this.edges = edges;
	}
}
