import styles from "./comments.module.css";
import Comment from "../comment";
import { getComments } from "../../../../../api-routes/comments";
import useSWR from "swr";

const commentsCacheKey = "userComments"

export default function Comments({ postId }) {

  const { data: {data=[]}={}, error, isLoading } = useSWR(
    postId ? commentsCacheKey : null,
    () => getComments({postId})
    );
  console.log (data);

  if (error) return <div> failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data?.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
