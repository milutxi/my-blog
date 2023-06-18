import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { addPost, cacheKey } from "../../api-routes/posts";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

export default function CreatePost() {
  const router = useRouter();
  const user = useUser();
  
  const {trigger : addTrigger} = useSWRMutation(cacheKey, addPost);

  const handleOnSubmit = async({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    const newPost = {
      body: editorContent,
      title: titleInput,
      slug,
      fk_user_id: user.id,
      image,
    };
    const { error } = await addTrigger(newPost);

    if (!error) {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
