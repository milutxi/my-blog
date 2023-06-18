import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";
import { cacheKey, editPost, getPost } from "../../../../api-routes/posts";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";


export default function EditBlogPost() {
  const router = useRouter();
  const user = useUser();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;
  const { 
    data: {data: post ={} } = {},
    error,
    isLoading,
  } = useSWR(slug ? `${cacheKey}${slug}` : null, ()=> getPost({slug}));

  const {trigger : editTrigger} = useSWRMutation(`${cacheKey}${slug}`, editPost);

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {

    const editedPost = {
      body: editorContent,
      title: titleInput,
      slug,
      fk_user_id: user.id,
      image,     
      id: post.id 
     }

    const {error} = await editTrigger(editedPost);

    if (!error) {
      router.push(`/blog/${slug}`)
    }
}
  if(isLoading){
    return "...loading"
  }
  
  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}


export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx)
  const {slug} = ctx.params;

  const { 
    data: {session},
  } = await supabase.auth.getSession()

  const {data} = await supabase
  .from("tb_post")
  .select("fk_user_id")
  .single()
  .eq("slug", slug);

  const isAuthor = data.fk_user_id === session.user.id;

  if(!isAuthor) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      }
    }
  }

  return {
    props: {},
  };
};
