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

				$query = "select LAST_INSERT_ID()";

				$lastMovieID = $this->getResponse($query);

				$response = array
				(
					"success" => true,
					"movieID" => $lastMovieID
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

		public function getActors()
		{
			$query = "call getActors();";

			return $this->getResponse($query);
		}

		public function setActor($actor)
		{
			$response = array
			(
				"success" => false
			);

			$givenName = $actor["givenName"];
			$surname = $actor["surname"];			

			$query = "call setActor(:givenName, :surname);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":givenName", $givenName);
			$statement->bindParam(":surname", $surname);

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

		public function deleteActor($actorID)
		{
			$response = array
			(
				"success" => false
			);

			$query = "call deleteActor(:actorID);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":actorID", $actorID);

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

		public function getActor($actorID)
		{
			$query = "call getActor($actorID)";

			return $this->getResponse($query);
		}

		public function updateActor($actor)
		{
			$response = array
			(
				"success" => false
			);

			$actorID = $actor["actorID"];
			$givenName = $actor["givenName"];
			$surname = $actor["surname"];

			$query = "call updateActor(:actorID, :givenName, :surname)";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":actorID", $actorID);
			$statement->bindParam(":givenName", $givenName);
			$statement->bindParam(":surname", $surname);

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

		public function addActorToMovie($actorAndMovie)
		{
			$response = array
			(
				"success" => false
			);

			$actorID = $actorAndMovie["actorID"];
			$movieID = $actorAndMovie["movieID"];			

			$query = "call addActorToMovie(:actorID, :movieID);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":actorID", $actorID);
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

		public function deleteActorToMovie($actorAndMovie)
		{
			$response = array
			(
				"success" => false
			);

			$actorID = $actorAndMovie["actorID"];
			$movieID = $actorAndMovie["movieID"];

			$query = "call deleteActorToMovie(:actorID, :movieID);";

			$statement = $this->connect->prepare($query);

			$statement->bindParam(":actorID", $actorID);
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

		public function deleteAllActorsToMovie($movieID)
		{
			$response = array
			(
				"success" => false
			);

			$query = "call deleteAllActorsToMovie(:movieID);";

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

		public function getActorsInMovie($movieID)
		{
			$query = "call getActorsInMovie($movieID)";

			return $this->getResponse($query);
		}

		public function getMoviesWithActor($actorID)
		{
			$query = "call getMoviesWithActor($actorID);";

			return $this->getResponse($query);
		}

		private function getResponse($query)
		{
			$response = array
			(
				"success" => false
			);

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
			else if($decoded["action"] == "getActors")
			{
				echo(json_encode($apiObject->getActors()));
			}
			else if($decoded["action"] == "deleteActor")
			{
				echo(json_encode($apiObject->deleteActor($decoded["actorID"])));
			}
			else if($decoded["action"] == "getActor")
			{
				echo(json_encode($apiObject->getActor($decoded["actorID"])));
			}
			else if($decoded["action"] == "setActor")
			{
				echo(json_encode($apiObject->setActor($decoded)));
			}
			else if($decoded["action"] == "updateActor")
			{
				echo(json_encode($apiObject->updateActor($decoded)));
			}
			else if($decoded["action"] == "addActorToMovie")
			{
				echo(json_encode($apiObject->addActorToMovie($decoded)));
			}
			else if($decoded["action"] == "deleteActorToMovie")
			{
				echo(json_encode($apiObject->deleteActorToMovie($decoded)));
			}
			else if($decoded["action"] == "deleteAllActorsToMovie")
			{
				echo(json_encode($apiObject->deleteAllActorsToMovie($decoded["movieID"])));
			}
			else if($decoded["action"] == "getActorsInMovie")
			{
				echo(json_encode($apiObject->getActorsInMovie($decoded["movieID"])));
			}
			else if($decoded["action"] == "getMoviesWithActor")
			{
				echo(json_encode($apiObject->getMoviesWithActor($decoded["actorID"])));
			}
		}
	}
?>