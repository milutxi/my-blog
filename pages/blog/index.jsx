import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";

import { 
  cacheKey,
  getPosts,
} from "../../api-routes/posts";

import useSWR from "swr";

export default function Blog() {

  const { data: {data = []} = {}, error, isLoading } = useSWR(cacheKey, getPosts,)
   
  //const {trigger: addTrigger, isMutating } = useSWRMutation ( cacheKey, addPost,)
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <section>
      <Heading>Blog by me</Heading>
      {data?.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.createdAt}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}
