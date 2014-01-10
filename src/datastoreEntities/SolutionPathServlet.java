package datastoreEntities;

import SolutionPathServlet.DataBaseManager;

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

public class SolutionPathServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;	
	private String map_num;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SolutionPathServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		map_num = request.getParameter("map_num");
		Map map = DataBaseManager.getInstance().getMapByNum(map_num);
		
		List<Integer> solutionPath = map.getSolutionPath();
		/*/
		for (int i = 0; i<nodesList.size(); i++) {
			Node node = nodesList.get(i);
			node.getEdges();
		}
		/*/
		Gson gson = new Gson();
	    String json = gson.toJson(solutionPath);
	    response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	    response.getWriter().write(json);	    
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		map_num = request.getParameter("map_num");
		Map map = DataBaseManager.getInstance().getMapByNum(map_num);
		
		String path = request.getParameter("path");		
		Type type = new TypeToken<List<Integer>>(){}.getType();
		List<Integer> solutionPath = new Gson().fromJson(path, type);

		map.setSolutionPath(solutionPath);
				
	}
}








