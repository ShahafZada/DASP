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
		String email = (String)session.getAttribute("theEmailName");
		
		
		Player player = DataBaseManager.getInstance().getPlayerByEmail(email);
		Object score = request.getParameter("theScoreField");
		//Map map = new Map();
		
		if (player != null || score != null) {
			//GameScore game_score = new GameScore(player, map, score.toString());
			//DataBaseManager.getInstance().insertNewScore(game_score);
		}
		response.sendRedirect("high_scores");
	}

}
