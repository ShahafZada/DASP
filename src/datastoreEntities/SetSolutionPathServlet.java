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

import datastoreEntities.Node;
import dbManager.DataBaseManager;

public class SetSolutionPathServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SetSolutionPathServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String map_num = request.getParameter("map");
		Map map = DataBaseManager.getInstance().getMapByNum(map_num);
		
		String path = request.getParameter("path");		
		Type type = new TypeToken<List<Integer>>(){}.getType();
		List<Integer> solutionPath = new Gson().fromJson(path, type);

		//String mapNum = new Gson().fromJson(map_num, String.class);			
		map.setSolutionPath(solutionPath);
				
	}
}








