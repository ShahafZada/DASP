package datastoreEntities;

import com.google.gson.Gson;

import dataBaseManager.DataBaseManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;
import java.io.IOException;

public class GetDataServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String data_type;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GetDataServlet() {
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
		
		String json = null;
		
		if(data_type.equals("players")) 
			Plist = DataBaseManager.getInstance().getAllPlayers();
		else if(data_type.equals("maps")) 
			Mlist = DataBaseManager.getInstance().getAllMaps();
		else if(data_type.equals("scores")) 
			GSlist = DataBaseManager.getInstance().getAllScores();
		
		Gson gson = new Gson();
		if(Plist != null)
			json = gson.toJson(Plist);
		if(Mlist != null)
			json = gson.toJson(Mlist);
		if(GSlist != null)
			json = gson.toJson(GSlist);
		
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(json);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		data_type = request.getParameter("data_type");
	}
}
