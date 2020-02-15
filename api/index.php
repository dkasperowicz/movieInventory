<?php
	class API
	{
		const HOST = "localhost:3306";
		const DATABASE_NAME = "dawid_movieinventory";
		const USERNAME = "dawid_movieinventory";
		const PASSWORD = "abc123";
		
		function __construct()
		{
			$this->database_connection();
		}

		function database_connection()
		{
			//$this->connect = new PDO("mysql:host=$host;dbname=$databaseName", "$username", "$password");
			$this->connect = new PDO('mysql:host=' . API::HOST . ';dbname=' . API::DATABASE_NAME, API::USERNAME, API::PASSWORD);
		}

		function getMovies()
		{
			$response = "";

			$query = "call getMovies();";

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

	/*if($_POST["action"] == "getMovies")
	{
		echo json_encode($apiObject->getMovies());
	}*/

	if(strcasecmp($_SERVER['REQUEST_METHOD'], "POST") == 0)
	{
		$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : "";

		if(strcasecmp($contentType, "application/json") == 0)
		{
			$content = trim(file_get_contents("php://input"));
			$decoded = json_decode($content, true);

			if($decoded["action"] == "getMovies")
			{
				echo (json_encode($apiObject->getMovies()));
			}
		}
	}
?>