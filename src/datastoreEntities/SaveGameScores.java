package datastoreEntities;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import datastoreEntities.GameScore;
import dbManager.DataBaseManager;

/**
 * Servlet implementation class SaveGameScores
 */
public class SaveGameScores extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveGameScores() {
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
	
		HttpSession session = request.getSession(true);
		//String email = (String)session.getAttribute("theEmailName");
		String email = "aaa@aaa";
		System.out.println(email);
		Player player = DataBaseManager.getInstance().getPlayerByEmail(email);
		Player player2 = new Player(player);
		Object score = request.getParameter("theScoreField");
		Object map_num = request.getParameter("mapNum");
		//Map map = DataBaseManager.getInstance().getMapByNum(map_num.toString());
		Map map = DataBaseManager.getInstance().getMapByNum("1");
		Map map2 = new Map(map);
		
		if (player2 != null || score != null) {
			int steps = Integer.parseInt((String)score);
			GameScore game_score = new GameScore(null, null, steps);
			DataBaseManager.getInstance().insertNewScore(game_score);
		}
		response.sendRedirect("high_scores");
	}

}
