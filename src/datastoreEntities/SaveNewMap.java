package datastoreEntities;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;
import java.io.IOException;
import java.lang.reflect.Type;

import dataBaseManager.DataBaseManager;
import datastoreEntities.Node;


public class SaveNewMap extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SaveNewMap() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String nodes = request.getParameter("nodes");
		String mapN = request.getParameter("map");

		if (nodes != null && mapN != null) {

			Type type = new TypeToken<List<Node>>(){}.getType();
			List<Node> nodesList = new Gson().fromJson(nodes, type);

			String mapNum = new Gson().fromJson(mapN, String.class);

			Map m = DataBaseManager.getInstance().getMapByNum(mapN);

			if( m != null)
				DataBaseManager.getInstance().deleteTheMap(m);

			Map map = new Map(mapNum, mapNum, mapNum, nodesList, null);
			DataBaseManager.getInstance().insertNewMap(map);
		}

	}
}
