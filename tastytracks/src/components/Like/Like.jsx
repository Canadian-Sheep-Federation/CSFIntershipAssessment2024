import { useState } from "react";
import styles from "./Like.module.css";
import { useAuth } from "../../AuthContext ";

const LikeIcon = ({ initialLikes }) => {
  const { user, isLoggedIn } = useAuth();
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <div className={styles.likeIcon} onClick={handleLike}>
      👍 {likes}
    </div>
  );
};

export default LikeIcon;
