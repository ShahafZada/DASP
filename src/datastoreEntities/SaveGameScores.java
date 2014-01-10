package datastoreEntities;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import SolutionPathServlet.DataBaseManager;
import datastoreEntities.GameScore;

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
		Object score = request.getParameter("theScoreField");
		Object map_num = request.getParameter("themapNumField");	

		if (email != null && score != null && map_num != null) {
			int steps = Integer.parseInt((String)score);
				
			GameScore game_score = new GameScore(email, (String) map_num, steps);
			DataBaseManager.getInstance().insertNewScore(game_score);
			
		}
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.sendRedirect("high_scores");
	}

}
