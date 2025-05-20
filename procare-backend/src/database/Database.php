<?php

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $connection;

    public function __construct() {
        $config = require(__DIR__ . '/../../config/config.php');
        $this->host = $config['db_host'];
        $this->db_name = $config['db_name'];
        $this->username = $config['db_user'];
        $this->password = $config['db_pass'];
        $this->connect();
    }

    private function connect() {
        $this->connection = null;
        try {
            $this->connection = new PDO("mysql:host={$this->host};dbname={$this->db_name}", $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $exception) {
            throw new Exception("Connection error: " . $exception->getMessage());
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function executeQuery($query, $params = []) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt;
    }

    public function beginTransaction() {
        $this->connection->beginTransaction();
    }

    public function commit() {
        $this->connection->commit();
    }

    public function rollBack() {
        $this->connection->rollBack();
    }
}