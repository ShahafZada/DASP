package datastoreEntities;

import com.google.gson.Gson;

import dataBaseManager.DataBaseManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;
import java.io.IOException;

public class DataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String[] data_types = new String[3];
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DataServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		List<Player> Plist = null;
		List<Map> Mlist = null;
		List<GameScore> GSlist = null;
	
		Gson gson = new Gson();
		String json = null;
		
		data d = new data(null,null,null,null);
		
		if(data_types[0] != null) 
			Plist = DataBaseManager.getInstance().getAllPlayers();
		else if(data_types[1] != null) 
			Mlist = DataBaseManager.getInstance().getAllMaps();
		else if(data_types[2] != null) 
			GSlist = DataBaseManager.getInstance().getAllScores();
		
		if(Plist != null) {
			d.setPlist(Plist);
			d.setData_type("players");
		}
		if(Mlist != null) {
			d.setMlist(Mlist);
			d.setData_type("maps");
		}
		if(GSlist != null) {
			d.setGSlist(GSlist);
			d.setData_type("scores");
		}
		
		json = gson.toJson(d);
		
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(json);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		data_types[0] = request.getParameter("StatisticsOfPlayers");
		data_types[1] = request.getParameter("StatisticsOfMaps");
		data_types[2] = request.getParameter("StatisticsOfScores");
		
		response.sendRedirect("statistics");
	}
}

class data {
	
	private List<Player> Plist = null;
	private List<Map> Mlist = null;
	private List<GameScore> GSlist = null;
	private String data_type = null;
	
	public data(List<Player> plist, List<Map> mlist, List<GameScore> gSlist, String data_type) {
		this.Plist = plist;
		this.Mlist = mlist;
		this.GSlist = gSlist;
		this.data_type = data_type;
	}
	
	public String toString() {
		return "data [Plist=" + getPlist() + ", Mlist=" + getMlist() + ", GSlist="
				+ getGSlist() + ", data_type=" + getData_type() + "]";
	}

	public List<Player> getPlist() {
		return Plist;
	}

	public void setPlist(List<Player> plist) {
		Plist = plist;
	}

	public List<Map> getMlist() {
		return Mlist;
	}

	public void setMlist(List<Map> mlist) {
		Mlist = mlist;
	}

	public List<GameScore> getGSlist() {
		return GSlist;
	}

	public void setGSlist(List<GameScore> gSlist) {
		GSlist = gSlist;
	}

	public String getData_type() {
		return data_type;
	}

	public void setData_type(String data_type) {
		this.data_type = data_type;
	}
	
}
