package datastoreEntities;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.security.NoSuchAlgorithmException;
import java.util.Enumeration;
import java.util.List;
import java.lang.reflect.Type;



import com.google.gson.Gson;

import datastoreEntities.Node;
import dbManager.DataBaseManager;


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
		//System.out.println(nodes);
		Type type = new TypeToken<List<Node>>(){}.getType();
		List<Node> nodesList = new Gson().fromJson(nodes, type);
		//		for (int i = 0; i<nodesList.size(); i++) {
		//			Node node = nodesList.get(i);
		//			System.out.println(node.getX());
		//		}

		Map map = new Map("1", "name", "2", nodesList);
		DataBaseManager.getInstance().insertNewMap(map);


	}
}
