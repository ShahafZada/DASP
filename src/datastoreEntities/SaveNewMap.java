package datastoreEntities;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.Enumeration;
import java.util.List;



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
	
		System.out.println("shafaf");
		Gson gson = new Gson();
		
		Enumeration en = request.getParameterNames();
        Node start = null;
        while (en.hasMoreElements()) {
            start = gson.fromJson((String) en.nextElement(), Node.class);
        }
//        log.info(start.gameID);
//        log.info(String.valueOf(start.nrOfPlayers));
//        log.info(start.playerUIDs[0] +" "+ start.playerUIDs[1]);
//}
        System.out.println(start.getY()+" "+start.getY());

        System.out.println("katsu");
		
		//System.out.println();
		// // GSON - java json library from Google. I prefer it
		//List<Node> data = new Gson().fromJson(new FileReader("SaveNewMap"), new TypeToken<List<Node>>(){}.getType());
	//    System.out.println(new Gson().toJson(data));	
		 /*
		Iterator<CustomPage> iterator = jsonNodes.iterator();			
		while(iterator.hasNext()){
			CustomPage node = (CustomPage) iterator.next();
		 
			System.out.println("Title: " + node.title);
			System.out.println("Content: " + node.content);
		 
		try {
			 
			BufferedReader br = new BufferedReader( new FileReader("ajax/map-generation-ruls.json"));
	 /*
			//convert the json string back to object
			Node nodes = gson.fromJson(br, Node.class);
	 
			System.out.println(nodes.getX());
	 
		} catch (IOException e) {
			e.printStackTrace();
		}
		*/
	
		//gson.fromJson(json, Node.class);
		
		//String content = gson.toJson(player);
		//response.setContentType("application/json");
		//response.setCharacterEncoding("UTF-8");
	   // response.getWriter().write(content);
	}
}
