package datastoreEntities;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;
import java.io.IOException;

import dataBaseManager.DataBaseManager;
import datastoreEntities.Node;

public class CreateMapServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String map_num = null;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CreateMapServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Map map = DataBaseManager.getInstance().getMapByNum(map_num);
		Gson gson = null;
		List<Node> nodesList = null;
		
		if(map != null)
		{
			nodesList = map.getNodes();
			for (int i = 0; i<nodesList.size(); i++) {
				Node node = nodesList.get(i);
				node.getEdges();
			}
			gson = new Gson();
		    String json = gson.toJson(nodesList);
		    response.setContentType("application/json");
		    response.setCharacterEncoding("UTF-8");
		    response.getWriter().write(json);
			}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		map_num = request.getParameter("map_num");
	}
}
