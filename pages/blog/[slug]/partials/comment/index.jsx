import Button from "@components/button";
import styles from "./comment.module.css";
import { commentsCacheKey } from "../comments";
import useSWRMutation from "swr/mutation";
import { removeComment } from "../../../../../api-routes/comments";
import useSWR from "swr";

export default function Comment({ comment, createdAt, author, id }) {
  // const { data: {data=[]} = {}} = useSWR(
  //   postId ? commentsCacheKey : null, 
  //   ()=> comment ({postId})
    
  // );
  const {trigger : deleteCommentTrigger} = useSWRMutation(commentsCacheKey, removeComment);
  
  const handleDelete = async () => {
    await deleteCommentTrigger (id);
  
    console.log(id );
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}
