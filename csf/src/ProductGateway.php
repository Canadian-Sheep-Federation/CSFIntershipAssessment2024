<?php

class ProductGateway {

    private PDO $conn;
    public function __construct(Database $database) {
        $this->conn = $database->getConnection();

    }

    public function getAll(): array {
        $sql = "SELECT * FROM product";

        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $row["random"] = (bool) $row["random"];
            $data[] = $row;
        }
        return $data;

    }

    public function create(array $data): string {
        $sql = "INSERT INTO product (name, text, random) VALUES (:name, :text, :random)";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindValue(":text", $data["text"], PDO::PARAM_STR);
        $stmt->bindValue(":random", (bool) ($data["random"] ?? false), PDO::PARAM_BOOL);

        $stmt->execute();

        return $this->conn->lastInsertId();

    }

    public function get(string $id):array | false{

        $sql = "SELECT * FROM product where id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if($data !== false) {
            $data["random"] = (bool) $data["random"];
        }

        return $data;
    }
    public function update(array $current, array $new): int {
        $sql = "UPDATE product SET name = :name, text = :text, random = :random WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":name", $new["name"] ?? $current["name"], PDO::PARAM_STR);
        $stmt->bindValue(":text", $new["text"] ?? $current["text"], PDO::PARAM_STR);
        $stmt->bindValue(":random", $new["random"] ?? $current["random"], PDO::PARAM_BOOL);

        $stmt->bindValue(":id", $current["id"], PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function delete(string $id): int {
        $sql = "DELETE FROM product WHERE id = :id";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(":id", $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}