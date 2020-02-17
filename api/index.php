<?php
	class API
	{
		private const HOST = "localhost:3306";
		private const DATABASE_NAME = "dawid_movieinventory";
		private const USERNAME = "dawid_movieinventory";
		private const PASSWORD = "abc123";
		
		public function __construct()
		{
			$this->database_connection();
		}

		private function database_connection()
		{
			$this->connect = new PDO('mysql:host=' . API::HOST . ';dbname=' . API::DATABASE_NAME, API::USERNAME, API::PASSWORD);
		}

		public function getMovies()
		{
			$query = "call getMovies();";			

			return $this->getResponse($query);
		}

		public function getMovie($movieID)
		{
			$query = "call getMovie($movieID)";

			return $this->getResponse($query);
		}

		public function updateMovie($movie)
		{
			$response = array
			(
				"success" => false
			);

			$movieID = $movie["movieID"];
			$title = $movie["title"];
			$releaseDate = date("y/m/d", strtotime($movie["releaseDate"]));
			$description = $movie["description"];
			$genreID = $movie["genre"];

			$query = "call updateMovie(:movieID, :title, :releaseDate, :description, :genreID)";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":movieID", $movieID);
			$statement->bindParam(":title", $title);
			$statement->bindParam(":releaseDate", $releaseDate);
			$statement->bindParam(":description", $description);
			$statement->bindParam(":genreID", $genreID);

			if($statement->execute())
			{
				$statement->closeCursor();

				$response = array
				(
					"success" => true
				);
			}

			return $response;
		}

		public function setMovie($movie)
		{
			$response = array
			(
				"success" => false
			);

			$title = $movie["title"];
			$releaseDate = date("y/m/d", strtotime($movie["releaseDate"]));
			$description = $movie["description"];
			$genreID = $movie["genre"];

			$query = "call setMovie(:title, :releaseDate, :description, :genreID);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":title", $title);
			$statement->bindParam(":releaseDate", $releaseDate);
			$statement->bindParam(":description", $description);
			$statement->bindParam(":genreID", $genreID);

			if($statement->execute())
			{
				$statement->closeCursor();

				$response = array
				(
					"success" => true
				);
			}

			return $response;
		}

		public function deleteMovie($movieID)
		{
			$response = array
			(
				"success" => false
			);

			$query = "call deleteMovie(:movieID);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":movieID", $movieID);

			if($statement->execute())
			{
				$statement->closeCursor();

				$response = array
				(
					"success" => true
				);
			}

			return $response;
		}

		public function getGenres()
		{
			$query = "call getGenres();";

			return $this->getResponse($query);
		}

		private function getResponse($query)
		{
			$response = "";

			$statement = $this->connect->prepare($query);

			if($statement->execute())
			{
				$response = $statement->fetchAll();
			}

			return $response;
		}
	}

	header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json, charset=utf-8');

	$apiObject = new API();

	if(strcasecmp($_SERVER['REQUEST_METHOD'], "POST") == 0)
	{
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";

		if(strcasecmp($contentType, "application/json") == 0)
		{
			$content = trim(file_get_contents("php://input"));
			$decoded = json_decode($content, true);

			if($decoded["action"] == "getMovies")
			{
				echo(json_encode($apiObject->getMovies()));
			}
			else if($decoded["action"] == "getMovie")
			{
				echo(json_encode($apiObject->getMovie($decoded['movieID'])));
			}

			else if($decoded["action"] == "setMovie")
			{
				echo(json_encode($apiObject->setMovie($decoded)));
			}
			else if($decoded["action"] == "updateMovie")
			{
				echo(json_encode($apiObject->updateMovie($decoded)));
			}
			else if($decoded["action"] == "deleteMovie")
			{
				echo(json_encode($apiObject->deleteMovie($decoded["movieID"])));
			}
			else if($decoded["action"] == "getGenres")
			{
				echo(json_encode($apiObject->getGenres()));
			}
		}
	}
?>